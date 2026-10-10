import { NextResponse } from "next/server";
import { getProject, saveProject, ChatMessage, addProjectLog } from "@/lib/storage/project-store";
import { CodingAgent, validateCode } from "@/lib/agent/coding-agent";
import { verifyPreviewWithPlaywright } from "@/lib/testing/playwright-verifier";
import { runAutonomousPlaywrightRepair } from "@/lib/agent/auto-repair";
import { v4 as uuidv4 } from "uuid";
import * as diff from "diff";

export const dynamic = "force-dynamic";

export interface FileEditSummary {
  path: string;
  action: "created" | "modified" | "deleted" | "unchanged";
  linesAdded: number;
  linesRemoved: number;
  previousSizeBytes: number;
  newSizeBytes: number;
  diffSnippet: string;
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const project = getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await req.json();
    const { prompt, agentMode, model, autoRepair = true, maxRepairIterations = 5 } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt string is required" }, { status: 400 });
    }

    // Capture initial file snapshot
    const initialFiles = { ...project.files };

    // Record user message
    const userMsg: ChatMessage = {
      id: uuidv4().slice(0, 8),
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    };
    project.conversations.push(userMsg);
    if (agentMode) project.settings.agentMode = agentMode;
    if (model) project.settings.model = model;
    saveProject(project);

    addProjectLog(id, {
      level: "info",
      message: `API Prompt received: "${prompt.slice(0, 80)}..."`,
      source: "agent",
    });

    const codingAgent = new CodingAgent(project);
    let agentSummary = "";
    let isAgentHealthy = true;

    const agentReply = await codingAgent.runAgentLoop(
      prompt,
      (event) => {
        if (event.type === "complete") {
          agentSummary = event.payload.summary || "";
          isAgentHealthy = event.payload.isHealthy !== false;
        }
      },
      agentMode
    );

    // Save assistant message
    const assistantMsg: ChatMessage = {
      id: uuidv4().slice(0, 8),
      role: "assistant",
      content: agentReply,
      timestamp: new Date().toISOString(),
      status: "completed",
    };
    project.conversations.push(assistantMsg);
    saveProject(project);

    // Calculate files modified/created/deleted
    const filesEdited: FileEditSummary[] = [];
    const allPaths = new Set([...Object.keys(initialFiles), ...Object.keys(project.files)]);

    for (const p of allPaths) {
      const prevContent = initialFiles[p];
      const newContent = project.files[p];

      if (prevContent === undefined && newContent !== undefined) {
        const addedLines = newContent.split("\n").length;
        filesEdited.push({
          path: p,
          action: "created",
          linesAdded: addedLines,
          linesRemoved: 0,
          previousSizeBytes: 0,
          newSizeBytes: Buffer.byteLength(newContent, "utf8"),
          diffSnippet: `+ Added new file (${addedLines} lines)`,
        });
      } else if (prevContent !== undefined && newContent === undefined) {
        filesEdited.push({
          path: p,
          action: "deleted",
          linesAdded: 0,
          linesRemoved: prevContent.split("\n").length,
          previousSizeBytes: Buffer.byteLength(prevContent, "utf8"),
          newSizeBytes: 0,
          diffSnippet: `- Deleted file`,
        });
      } else if (prevContent !== newContent) {
        const patch = diff.structuredPatch(p, p, prevContent, newContent);
        let added = 0;
        let removed = 0;
        for (const hunk of patch.hunks) {
          for (const line of hunk.lines) {
            if (line.startsWith("+")) added++;
            else if (line.startsWith("-")) removed++;
          }
        }
        const patchStr = diff.createPatch(p, prevContent, newContent, "", "");
        const previewPatch = patchStr.split("\n").slice(0, 15).join("\n");

        filesEdited.push({
          path: p,
          action: "modified",
          linesAdded: added,
          linesRemoved: removed,
          previousSizeBytes: Buffer.byteLength(prevContent, "utf8"),
          newSizeBytes: Buffer.byteLength(newContent, "utf8"),
          diffSnippet: previewPatch,
        });
      }
    }

    // Step: Verify & Auto-repair if requested
    let playwrightVerification = await verifyPreviewWithPlaywright(id);
    let didAutoRepair = false;
    let repairIterationsCount = 0;
    let autoRepairReport: any = null;

    if (autoRepair && (!playwrightVerification.healthy || !isAgentHealthy)) {
      addProjectLog(id, {
        level: "warn",
        message: `Initial verification found issues (${playwrightVerification.diagnosticError || "unresolved errors"}). Launching Playwright autonomous repair loop...`,
        source: "playwright",
      });

      const repairResult = await runAutonomousPlaywrightRepair({
        projectId: id,
        maxIterations: maxRepairIterations,
      });

      didAutoRepair = true;
      repairIterationsCount = repairResult.totalIterations;
      autoRepairReport = repairResult;
      playwrightVerification = repairResult.finalVerification || (await verifyPreviewWithPlaywright(id));

      // Re-check files edited after auto-repair
      for (const p of Object.keys(project.files)) {
        const prevContent = initialFiles[p];
        const newContent = project.files[p];
        const existingIdx = filesEdited.findIndex((f) => f.path === p);

        if (prevContent !== newContent) {
          const patch = diff.structuredPatch(p, p, prevContent || "", newContent);
          let added = 0;
          let removed = 0;
          for (const hunk of patch.hunks) {
            for (const line of hunk.lines) {
              if (line.startsWith("+")) added++;
              else if (line.startsWith("-")) removed++;
            }
          }
          const item: FileEditSummary = {
            path: p,
            action: prevContent === undefined ? "created" : "modified",
            linesAdded: added,
            linesRemoved: removed,
            previousSizeBytes: prevContent ? Buffer.byteLength(prevContent, "utf8") : 0,
            newSizeBytes: Buffer.byteLength(newContent, "utf8"),
            diffSnippet: `Auto-repaired file (${newContent.split("\n").length} lines)`,
          };
          if (existingIdx >= 0) {
            filesEdited[existingIdx] = item;
          } else {
            filesEdited.push(item);
          }
        }
      }
    }

    const isFixed = playwrightVerification.healthy && playwrightVerification.isFixed;

    return NextResponse.json({
      success: true,
      projectId: id,
      prompt,
      summary: agentSummary || `Updated ${filesEdited.length} file(s)`,
      agentResponse: agentReply,
      filesEdited,
      filesEditedCount: filesEdited.length,
      isHealthy: isFixed,
      isFixed,
      autoRepaired: didAutoRepair,
      repairIterations: repairIterationsCount,
      autoRepairReport,
      playwrightVerification: {
        healthy: playwrightVerification.healthy,
        isFixed: playwrightVerification.isFixed,
        title: playwrightVerification.title,
        consoleErrors: playwrightVerification.consoleErrors,
        pageErrors: playwrightVerification.pageErrors,
        diagnosticError: playwrightVerification.diagnosticError,
        renderedElementsCount: playwrightVerification.renderedElementsCount,
        durationMs: playwrightVerification.durationMs,
      },
    });
  } catch (err: any) {
    console.error("POST /api/projects/[id]/prompt error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
