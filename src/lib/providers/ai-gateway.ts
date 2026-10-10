export interface ModelDefinition {
  id: string;
  name: string;
  provider: "local-proxy" | "openai" | "anthropic" | "gemini" | "openrouter" | "ollama" | "custom";
  tier: "fast" | "reasoning" | "balanced";
  contextWindow: number;
  description: string;
  supportsTools: boolean;
}

export const AVAILABLE_MODELS: ModelDefinition[] = [
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash (High Speed)",
    provider: "local-proxy",
    tier: "fast",
    contextWindow: 1048576,
    description: "Ultra-low latency streaming model with 1M context, best for rapid coding iterations.",
    supportsTools: true,
  },
  {
    id: "claude-sonnet-5",
    name: "Claude 3.7 Sonnet / Fable",
    provider: "local-proxy",
    tier: "reasoning",
    contextWindow: 200000,
    description: "Supreme coding intelligence and complex architectural decomposition.",
    supportsTools: true,
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 Reasoning",
    provider: "local-proxy",
    tier: "reasoning",
    contextWindow: 128000,
    description: "Deep mathematical reasoning and self-verifying coding trace logic.",
    supportsTools: true,
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra / 4o",
    provider: "local-proxy",
    tier: "balanced",
    contextWindow: 128000,
    description: "Balanced multi-task flagship model with high tool fidelity.",
    supportsTools: true,
  },
  {
    id: "ollama-qwen",
    name: "Ollama / Qwen Local",
    provider: "ollama",
    tier: "fast",
    contextWindow: 32768,
    description: "Locally hosted offline model running on workstation.",
    supportsTools: true,
  },
];

export interface ChatCompletionMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
  tool_call_id?: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ProviderConfig {
  provider: string;
  apiKey?: string;
  baseUrl?: string;
  modelId?: string;
}

export class AIGateway {
  private defaultBaseUrl: string;
  private defaultApiKey: string;

  constructor() {
    this.defaultBaseUrl = process.env.AI_GATEWAY_URL || process.env.LOCAL_AI_PROXY_URL || "http://ai.buissnessminded.space/v1";
    this.defaultApiKey = process.env.AI_GATEWAY_KEY || "sk-std-687608798ed76a60175be31be15d1259";
  }

  async testConnection(provider: string, apiKey?: string, baseUrl?: string): Promise<{ success: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      const url = baseUrl || (provider === "local-proxy" ? this.defaultBaseUrl : "https://api.openai.com/v1");
      const key = apiKey || this.defaultApiKey;
      const res = await fetch(`${url}/models`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) {
        return { success: false, latencyMs: Date.now() - start, error: `HTTP ${res.status}: ${res.statusText}` };
      }
      return { success: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { success: false, latencyMs: Date.now() - start, error: err.message || "Failed to reach provider" };
    }
  }

  async chatCompletionStream({
    model,
    messages,
    tools,
    providerConfig,
    onChunk,
  }: {
    model: string;
    messages: ChatCompletionMessage[];
    tools?: ToolDefinition[];
    providerConfig?: ProviderConfig;
    onChunk: (chunk: string) => void;
  }): Promise<{ fullText: string; tokensEstimated: number }> {
    const url = providerConfig?.baseUrl || this.defaultBaseUrl;
    const apiKey = providerConfig?.apiKey || this.defaultApiKey;

    const payload: any = {
      model,
      messages,
      stream: true,
    };

    if (tools && tools.length > 0) {
      payload.tools = tools.map((t) => ({
        type: "function",
        function: {
          name: t.name,
          description: t.description,
          parameters: t.parameters,
        },
      }));
    }

    try {
      const response = await fetch(`${url}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(60000),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI Gateway error [${response.status}]: ${errorText}`);
      }

      if (!response.body) {
        throw new Error("Response body is null from AI provider");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;
          if (trimmed === "data: [DONE]") continue;

          try {
            const json = JSON.parse(trimmed.replace(/^data:\s*/, ""));
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              onChunk(content);
            }
          } catch {
            // Ignore partial SSE parsing errors
          }
        }
      }

      const words = fullText.split(/\s+/).length;
      const tokensEstimated = Math.round(words * 1.3);

      return { fullText, tokensEstimated };
    } catch (err: any) {
      console.warn("AI Gateway streaming failed or timed out:", err.message);
      throw err;
    }
  }

  async chatCompletionSync({
    model,
    messages,
    providerConfig,
  }: {
    model: string;
    messages: ChatCompletionMessage[];
    providerConfig?: ProviderConfig;
  }): Promise<string> {
    const url = providerConfig?.baseUrl || this.defaultBaseUrl;
    const apiKey = providerConfig?.apiKey || this.defaultApiKey;

    const response = await fetch(`${url}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
      signal: AbortSignal.timeout(45000),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gateway returned ${response.status}: ${err}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }
}

export const aiGateway = new AIGateway();
