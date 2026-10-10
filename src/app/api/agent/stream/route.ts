import { getProject, saveProject, ChatMessage } from "@/lib/storage/project-store";
import { CodingAgent, AgentEvent } from "@/lib/agent/coding-agent";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { projectId, prompt, agentMode, model } = await req.json();

    const project = getProject(projectId);
    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (agentMode) project.settings.agentMode = agentMode;
    if (model) project.settings.model = model;

    // Record user message
    const userMsg: ChatMessage = {
      id: uuidv4().slice(0, 8),
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    };
    project.conversations.push(userMsg);
    saveProject(project);

    const encoder = new TextEncoder();
    const codingAgent = new CodingAgent(project);

    const stream = new ReadableStream({
      async start(controller) {
        function sendEvent(event: AgentEvent) {
          const payload = `event: ${event.type}\ndata: ${JSON.stringify(event.payload)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        }

        try {
          let assistantText = "";
          const toolCallsRecord: any[] = [];
          let executionPlan: string[] = [];

          assistantText = await codingAgent.runAgentLoop(
            prompt,
            (event) => {
              sendEvent(event);

              if (event.type === "plan") {
                executionPlan = event.payload.steps;
              } else if (event.type === "tool_call") {
                toolCallsRecord.push({
                  id: event.payload.id,
                  name: event.payload.name,
                  args: event.payload.args,
                  status: "running",
                });
              } else if (event.type === "tool_result") {
                const tc = toolCallsRecord.find((t) => t.id === event.payload.id);
                if (tc) {
                  tc.status = "completed";
                  tc.result = typeof event.payload.result === "string" ? event.payload.result : JSON.stringify(event.payload.result);
                }
              }
            },
            agentMode
          );

          // Record assistant message in conversation
          const assistantMsg: ChatMessage = {
            id: uuidv4().slice(0, 8),
            role: "assistant",
            content: assistantText,
            timestamp: new Date().toISOString(),
            toolCalls: toolCallsRecord,
            plan: executionPlan,
            status: "completed",
          };
          project.conversations.push(assistantMsg);
          saveProject(project);

          sendEvent({
            type: "complete",
            payload: {
              summary: assistantText.slice(0, 100),
              finalMessage: assistantText,
              project,
            },
          });
        } catch (err: any) {
          console.error("Agent execution error:", err);
          sendEvent({
            type: "error",
            payload: { message: err.message || "An error occurred during agent generation" },
          });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
