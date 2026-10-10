export interface ModelDefinition {
  id: string;
  name: string;
  provider: "local-proxy" | "openai" | "anthropic" | "gemini" | "openrouter" | "ollama" | "custom";
  tier: "fast" | "reasoning" | "balanced" | "specialist";
  category: "Google" | "Anthropic" | "OpenAI" | "DeepSeek" | "xAI / Grok" | "Moonshot / Kimi" | "Open Weights";
  contextWindow: number;
  description: string;
  supportsTools: boolean;
}

export const AVAILABLE_MODELS: ModelDefinition[] = [
  // Google Gemini Flagships
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash (High Speed)",
    provider: "local-proxy",
    tier: "fast",
    category: "Google",
    contextWindow: 1048576,
    description: "Ultra-low latency streaming model with 1M context. Ideal for rapid iterative coding.",
    supportsTools: true,
  },
  {
    id: "gemini-3.5-pro",
    name: "Gemini 3.5 Pro (Deep Multimodal)",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Google",
    contextWindow: 2097152,
    description: "2M context window reasoning model for entire repository comprehension.",
    supportsTools: true,
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash Production",
    provider: "local-proxy",
    tier: "fast",
    category: "Google",
    contextWindow: 1048576,
    description: "Stable, battle-tested flash model for quick code edits.",
    supportsTools: true,
  },

  // Anthropic Claude Flagships
  {
    id: "claude-sonnet-5",
    name: "Claude 3.7 Sonnet / 5",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Anthropic",
    contextWindow: 200000,
    description: "Supreme coding intelligence and complex architectural decomposition.",
    supportsTools: true,
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5 Ultra",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Anthropic",
    contextWindow: 200000,
    description: "Maximum reasoning depth for complex full-stack abstractions and refactoring.",
    supportsTools: true,
  },
  {
    id: "claude-fable-5-1",
    name: "Claude Fable 5.1 Creative Architect",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Anthropic",
    contextWindow: 200000,
    description: "Creative design-system reasoning with polished UI taste.",
    supportsTools: true,
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5 Fast",
    provider: "local-proxy",
    tier: "fast",
    category: "Anthropic",
    contextWindow: 200000,
    description: "Sub-second lightweight completion engine for single-line and patch edits.",
    supportsTools: true,
  },

  // OpenAI Flagships
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra Flagship",
    provider: "local-proxy",
    tier: "balanced",
    category: "OpenAI",
    contextWindow: 128000,
    description: "Next-generation Astra architecture with high-fidelity tool execution.",
    supportsTools: true,
  },
  {
    id: "gpt-6.0-astra",
    name: "GPT-6.0 Astra Extended",
    provider: "local-proxy",
    tier: "balanced",
    category: "OpenAI",
    contextWindow: 128000,
    description: "Extended context Astra engine with balanced speed and logic.",
    supportsTools: true,
  },
  {
    id: "gpt-5-6-sol",
    name: "GPT-5.6 Sol System",
    provider: "local-proxy",
    tier: "reasoning",
    category: "OpenAI",
    contextWindow: 128000,
    description: "Mathematical proofs and distributed system validation.",
    supportsTools: true,
  },
  {
    id: "gpt-5-6-luna",
    name: "GPT-5.6 Luna Logic",
    provider: "local-proxy",
    tier: "balanced",
    category: "OpenAI",
    contextWindow: 128000,
    description: "Structured JSON and tool calling optimization.",
    supportsTools: true,
  },

  // DeepSeek Flagships
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 Reasoning",
    provider: "local-proxy",
    tier: "reasoning",
    category: "DeepSeek",
    contextWindow: 128000,
    description: "Open reasoning trace logic with step-by-step verification.",
    supportsTools: true,
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    provider: "local-proxy",
    tier: "fast",
    category: "DeepSeek",
    contextWindow: 128000,
    description: "Ultra-fast MoE architecture for instantaneous component generation.",
    supportsTools: true,
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "local-proxy",
    tier: "reasoning",
    category: "DeepSeek",
    contextWindow: 128000,
    description: "Dense reasoning model with state-of-the-art coding benchmarks.",
    supportsTools: true,
  },
  {
    id: "deepseek-v3.2",
    name: "DeepSeek V3.2",
    provider: "local-proxy",
    tier: "balanced",
    category: "DeepSeek",
    contextWindow: 128000,
    description: "Production MoE workhorse for general-purpose application building.",
    supportsTools: true,
  },

  // xAI / Grok Flagships
  {
    id: "grok-4.6",
    name: "Grok 4.6 Frontier",
    provider: "local-proxy",
    tier: "reasoning",
    category: "xAI / Grok",
    contextWindow: 128000,
    description: "High compute frontier reasoning with deep programming insights.",
    supportsTools: true,
  },
  {
    id: "grok-code-fast-1",
    name: "Grok Code Fast 1",
    provider: "local-proxy",
    tier: "specialist",
    category: "xAI / Grok",
    contextWindow: 128000,
    description: "Specialized code synthesis and refactoring model.",
    supportsTools: true,
  },
  {
    id: "grok-build-0.1",
    name: "Grok Build Architect",
    provider: "local-proxy",
    tier: "specialist",
    category: "xAI / Grok",
    contextWindow: 128000,
    description: "Purpose-built for software building and scaffolding.",
    supportsTools: true,
  },

  // Moonshot / Kimi Flagships
  {
    id: "kimi-k3",
    name: "Kimi K3 Long-Horizon",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Moonshot / Kimi",
    contextWindow: 200000,
    description: "Autonomous reasoning across long horizons and complex dependencies.",
    supportsTools: true,
  },
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code Specialist",
    provider: "local-proxy",
    tier: "specialist",
    category: "Moonshot / Kimi",
    contextWindow: 200000,
    description: "Trained on hundreds of thousands of full-stack repositories.",
    supportsTools: true,
  },
  {
    id: "kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Moonshot / Kimi",
    contextWindow: 200000,
    description: "Thinking trace reasoning with automated error back-propagation.",
    supportsTools: true,
  },

  // Qwen & Open Weights
  {
    id: "qwen3.8-27b",
    name: "Qwen 3.8 27B Coder",
    provider: "local-proxy",
    tier: "specialist",
    category: "Open Weights",
    contextWindow: 128000,
    description: "Top-tier open-weights coding model with exceptional syntax fidelity.",
    supportsTools: true,
  },
  {
    id: "nemotron-3-ultra-550b-a55b",
    name: "Nvidia Nemotron 3 Ultra 550B",
    provider: "local-proxy",
    tier: "reasoning",
    category: "Open Weights",
    contextWindow: 128000,
    description: "Enterprise 550B parameter powerhouse for large-scale system architecture.",
    supportsTools: true,
  },
  {
    id: "ollama-qwen",
    name: "Ollama / Qwen Local (Offline)",
    provider: "ollama",
    tier: "fast",
    category: "Open Weights",
    contextWindow: 32768,
    description: "Locally hosted offline model running on your workstation.",
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
