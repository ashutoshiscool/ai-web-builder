export interface ModelDefinition {
  id: string;
  name: string;
  provider: "local-proxy" | "openai" | "anthropic" | "gemini" | "openrouter" | "ollama" | "custom";
  tier: "fast" | "reasoning" | "balanced" | "specialist";
  category: "Google Gemini" | "Anthropic Claude" | "OpenAI" | "DeepSeek" | "xAI Grok" | "Moonshot Kimi" | "Qwen & Open Weights";
  contextWindow: number;
  description: string;
  supportsTools: boolean;
}

export const ALL_MODELS: ModelDefinition[] = [
  // --- Google Gemini (Complete Fleet from endpoint) ---
  { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash (Flagship Speed)", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Ultra-fast low-latency code generation with 1M context.", supportsTools: true },
  { id: "gemini-3.8-flash-high", name: "Gemini 3.8 Flash High Throughput", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Maximum QPS tier for instant streaming.", supportsTools: true },
  { id: "gemini-3.8-high", name: "Gemini 3.8 High Reasoning", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 1048576, description: "Deep reasoning engine for complex architectures.", supportsTools: true },
  { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Balanced fast development tier.", supportsTools: true },
  { id: "gemini-3.7-flash-high", name: "Gemini 3.7 Flash High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "High-throughput 3.7 flash engine.", supportsTools: true },
  { id: "gemini-3.7-high", name: "Gemini 3.7 High", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 1048576, description: "Advanced reasoning and deep logic analysis.", supportsTools: true },
  { id: "gemini-3.6-flash", name: "Gemini 3.6 Flash", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Fast responsive code builder.", supportsTools: true },
  { id: "gemini-3.6-flash-high", name: "Gemini 3.6 Flash High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "High-priority 3.6 flash queue.", supportsTools: true },
  { id: "gemini-3.6-high", name: "Gemini 3.6 High", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 1048576, description: "Deep code analysis and synthesis.", supportsTools: true },
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Production flash tier.", supportsTools: true },
  { id: "gemini-3.5-flash-high", name: "Gemini 3.5 Flash High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "High-throughput 3.5 tier.", supportsTools: true },
  { id: "gemini-3.5-high", name: "Gemini 3.5 High", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 1048576, description: "Deep reasoning 3.5 variant.", supportsTools: true },
  { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash Lite", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "Sub-second lightweight generation.", supportsTools: true },
  { id: "gemini-3.5-flash-lite-high", name: "Gemini 3.5 Flash Lite High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "High QPS sub-second generation.", supportsTools: true },
  { id: "gemini-flash-latest", name: "Gemini Flash Latest", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Auto-updating latest Gemini Flash release.", supportsTools: true },
  { id: "gemini-flash-latest-high", name: "Gemini Flash Latest High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Latest Flash with high quota.", supportsTools: true },
  { id: "gemini-flash-lite-latest", name: "Gemini Flash Lite Latest", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "Latest ultra-lightweight Flash model.", supportsTools: true },
  { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "Low memory 3.1 flash model.", supportsTools: true },
  { id: "gemini-3.1-flash-lite-high", name: "Gemini 3.1 Flash Lite High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "High-throughput 3.1 flash lite.", supportsTools: true },
  { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite Preview", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "Experimental 3.1 flash lite preview.", supportsTools: true },
  { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Gemini 3.0 preview architecture.", supportsTools: true },
  { id: "gemini-3-flash-preview-high", name: "Gemini 3 Flash Preview High", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "High throughput preview variant.", supportsTools: true },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash Production", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Stable 2.5 flash generation engine.", supportsTools: true },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "Lightweight 2.5 flash tier.", supportsTools: true },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro Multimodal", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 2097152, description: "2 Million token context reasoning powerhouse.", supportsTools: true },
  { id: "gemini-pro-latest", name: "Gemini Pro Latest", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 2097152, description: "Auto-updating latest Gemini Pro release.", supportsTools: true },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 2097152, description: "Next-generation 3.1 Pro architecture preview.", supportsTools: true },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Ultra-fast generation engine.", supportsTools: true },
  { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 524288, description: "Lightweight Gemini 2.0 engine.", supportsTools: true },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "local-proxy", tier: "reasoning", category: "Google Gemini", contextWindow: 2097152, description: "Classic 2M context flagship.", supportsTools: true },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 1048576, description: "Classic 1.5 flash model.", supportsTools: true },
  { id: "gemini-robotics-er-2-preview", name: "Gemini Robotics ER-2 Preview", provider: "local-proxy", tier: "specialist", category: "Google Gemini", contextWindow: 1048576, description: "Spatial & layout reasoning specialist.", supportsTools: true },
  { id: "gemma-4-31b-it", name: "Gemma 4 31B Instruct", provider: "local-proxy", tier: "balanced", category: "Google Gemini", contextWindow: 65536, description: "Google open-weights 31B instruction-tuned model.", supportsTools: true },
  { id: "gemma-4-31b-it-high", name: "Gemma 4 31B Instruct High", provider: "local-proxy", tier: "balanced", category: "Google Gemini", contextWindow: 65536, description: "High-priority Gemma 4 31B queue.", supportsTools: true },
  { id: "gemma-4-26b-a4b-it", name: "Gemma 4 26B-A4B MoE Instruct", provider: "local-proxy", tier: "balanced", category: "Google Gemini", contextWindow: 65536, description: "Active 4B parameter MoE architecture.", supportsTools: true },
  { id: "gemma-3-27b-it", name: "Gemma 3 27B Instruct", provider: "local-proxy", tier: "balanced", category: "Google Gemini", contextWindow: 65536, description: "Google open-weights 27B model.", supportsTools: true },
  { id: "gemma-3-12b-it", name: "Gemma 3 12B Instruct", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 65536, description: "Compact 12B instruct model.", supportsTools: true },
  { id: "gemma-3-4b-it", name: "Gemma 3 4B Instruct", provider: "local-proxy", tier: "fast", category: "Google Gemini", contextWindow: 65536, description: "Ultra-compact 4B instruct model.", supportsTools: true },

  // --- Anthropic Claude ---
  { id: "claude-sonnet-5", name: "Claude Sonnet 5 / 3.7", provider: "local-proxy", tier: "reasoning", category: "Anthropic Claude", contextWindow: 200000, description: "Supreme coding intelligence and complex refactoring.", supportsTools: true },
  { id: "claude-opus-5-5", name: "Claude Opus 5.5 Ultra", provider: "local-proxy", tier: "reasoning", category: "Anthropic Claude", contextWindow: 200000, description: "Deep architectural synthesis.", supportsTools: true },
  { id: "claude-opus-5", name: "Claude Opus 5", provider: "local-proxy", tier: "reasoning", category: "Anthropic Claude", contextWindow: 200000, description: "High reasoning capacity frontier model.", supportsTools: true },
  { id: "claude-opus-4-8", name: "Claude Opus 4.8", provider: "local-proxy", tier: "reasoning", category: "Anthropic Claude", contextWindow: 200000, description: "Advanced Opus release.", supportsTools: true },
  { id: "claude-fable-5-1", name: "Claude Fable 5.1", provider: "local-proxy", tier: "reasoning", category: "Anthropic Claude", contextWindow: 200000, description: "UI design-focused reasoning model.", supportsTools: true },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "local-proxy", tier: "fast", category: "Anthropic Claude", contextWindow: 200000, description: "Fast lightweight Claude model.", supportsTools: true },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet Classic", provider: "local-proxy", tier: "balanced", category: "Anthropic Claude", contextWindow: 200000, description: "Classic 3.5 Sonnet benchmark.", supportsTools: true },
  { id: "claude-3-opus", name: "Claude 3 Opus Classic", provider: "local-proxy", tier: "reasoning", category: "Anthropic Claude", contextWindow: 200000, description: "Classic 3 Opus model.", supportsTools: true },

  // --- OpenAI ---
  { id: "gpt-6-astra", name: "GPT-6 Astra Flagship", provider: "local-proxy", tier: "balanced", category: "OpenAI", contextWindow: 128000, description: "Astra engine with high tool fidelity.", supportsTools: true },
  { id: "gpt-6.0-astra", name: "GPT-6.0 Astra Extended", provider: "local-proxy", tier: "balanced", category: "OpenAI", contextWindow: 128000, description: "Extended context Astra engine.", supportsTools: true },
  { id: "gpt-5-6-sol", name: "GPT-5.6 Sol System", provider: "local-proxy", tier: "reasoning", category: "OpenAI", contextWindow: 128000, description: "Proof and verification engine.", supportsTools: true },
  { id: "gpt-5-6-luna", name: "GPT-5.6 Luna Logic", provider: "local-proxy", tier: "balanced", category: "OpenAI", contextWindow: 128000, description: "Structured tool-calling optimization.", supportsTools: true },
  { id: "gpt-4o", name: "GPT-4o Omnimodal", provider: "local-proxy", tier: "balanced", category: "OpenAI", contextWindow: 128000, description: "Flagship balanced GPT model.", supportsTools: true },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "local-proxy", tier: "fast", category: "OpenAI", contextWindow: 128000, description: "Fast low-latency GPT model.", supportsTools: true },
  { id: "gpt-4o-mini-high", name: "GPT-4o Mini High Throughput", provider: "local-proxy", tier: "fast", category: "OpenAI", contextWindow: 128000, description: "High throughput mini variant.", supportsTools: true },
  { id: "o3", name: "OpenAI o3 Reasoning", provider: "local-proxy", tier: "reasoning", category: "OpenAI", contextWindow: 128000, description: "High-computation thinking engine.", supportsTools: true },
  { id: "codex", name: "OpenAI Codex", provider: "local-proxy", tier: "specialist", category: "OpenAI", contextWindow: 32768, description: "Dedicated coding model.", supportsTools: true },
  { id: "gpt-oss-120b", name: "GPT-OSS 120B Open Weights", provider: "local-proxy", tier: "balanced", category: "OpenAI", contextWindow: 128000, description: "Open weights 120B model.", supportsTools: true },

  // --- DeepSeek ---
  { id: "deepseek-r1", name: "DeepSeek R1 Reasoning", provider: "local-proxy", tier: "reasoning", category: "DeepSeek", contextWindow: 128000, description: "Open reasoning trace logic.", supportsTools: true },
  { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", provider: "local-proxy", tier: "fast", category: "DeepSeek", contextWindow: 128000, description: "Ultra-fast MoE coding model.", supportsTools: true },
  { id: "deepseek-v4-flash-high", name: "DeepSeek V4 Flash High", provider: "local-proxy", tier: "fast", category: "DeepSeek", contextWindow: 128000, description: "High throughput V4 flash.", supportsTools: true },
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", provider: "local-proxy", tier: "reasoning", category: "DeepSeek", contextWindow: 128000, description: "High benchmark coding model.", supportsTools: true },
  { id: "deepseek-v3.2", name: "DeepSeek V3.2", provider: "local-proxy", tier: "balanced", category: "DeepSeek", contextWindow: 128000, description: "MoE workhorse.", supportsTools: true },

  // --- xAI Grok ---
  { id: "grok-4.6", name: "Grok 4.6 Frontier", provider: "local-proxy", tier: "reasoning", category: "xAI Grok", contextWindow: 128000, description: "Frontier reasoning model.", supportsTools: true },
  { id: "grok-4.5", name: "Grok 4.5", provider: "local-proxy", tier: "reasoning", category: "xAI Grok", contextWindow: 128000, description: "Grok 4.5 reasoning tier.", supportsTools: true },
  { id: "grok-4.20", name: "Grok 4.20 Multi-Agent", provider: "local-proxy", tier: "reasoning", category: "xAI Grok", contextWindow: 128000, description: "Multi-agent orchestration variant.", supportsTools: true },
  { id: "grok-code-fast-1", name: "Grok Code Fast 1", provider: "local-proxy", tier: "specialist", category: "xAI Grok", contextWindow: 128000, description: "Specialized coding synthesis.", supportsTools: true },
  { id: "grok-build-0.1", name: "Grok Build 0.1", provider: "local-proxy", tier: "specialist", category: "xAI Grok", contextWindow: 128000, description: "App scaffolding specialist.", supportsTools: true },

  // --- Moonshot Kimi ---
  { id: "kimi-k3", name: "Kimi K3 Long-Horizon", provider: "local-proxy", tier: "reasoning", category: "Moonshot Kimi", contextWindow: 200000, description: "Autonomous long-horizon planning.", supportsTools: true },
  { id: "kimi-k2.7-code", name: "Kimi K2.7 Code", provider: "local-proxy", tier: "specialist", category: "Moonshot Kimi", contextWindow: 200000, description: "Full-stack code specialist.", supportsTools: true },
  { id: "kimi-k2-thinking", name: "Kimi K2 Thinking", provider: "local-proxy", tier: "reasoning", category: "Moonshot Kimi", contextWindow: 200000, description: "Self-correcting reasoning.", supportsTools: true },
  { id: "kimi-k2.6", name: "Kimi K2.6", provider: "local-proxy", tier: "balanced", category: "Moonshot Kimi", contextWindow: 200000, description: "Balanced Kimi model.", supportsTools: true },

  // --- Qwen, GLM & Open Weights ---
  { id: "qwen3.8-27b", name: "Qwen 3.8 27B Coder", provider: "local-proxy", tier: "specialist", category: "Qwen & Open Weights", contextWindow: 128000, description: "Top open-weights coding model.", supportsTools: true },
  { id: "qwen3.8-flash", name: "Qwen 3.8 Flash", provider: "local-proxy", tier: "fast", category: "Qwen & Open Weights", contextWindow: 128000, description: "Ultra-fast open weights coder.", supportsTools: true },
  { id: "glm-5.3", name: "GLM 5.3 Frontier", provider: "local-proxy", tier: "reasoning", category: "Qwen & Open Weights", contextWindow: 128000, description: "High reasoning capacity GLM.", supportsTools: true },
  { id: "glm-5.3-flash", name: "GLM 5.3 Flash", provider: "local-proxy", tier: "fast", category: "Qwen & Open Weights", contextWindow: 128000, description: "Fast GLM 5.3 variant.", supportsTools: true },
  { id: "nemotron-3-ultra-550b-a55b", name: "Nemotron 3 Ultra 550B", provider: "local-proxy", tier: "reasoning", category: "Qwen & Open Weights", contextWindow: 128000, description: "Enterprise 550B powerhouse.", supportsTools: true },
  { id: "ollama-qwen", name: "Ollama / Qwen Local (Offline)", provider: "ollama", tier: "fast", category: "Qwen & Open Weights", contextWindow: 32768, description: "Offline local model on workstation.", supportsTools: true },
];

export const AVAILABLE_MODELS = ALL_MODELS;

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
