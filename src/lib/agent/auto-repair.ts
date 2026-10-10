import { getProject, saveProject, addProjectLog } from "../storage/project-store";
import { aiGateway } from "../providers/ai-gateway";
import { validateCode, CodingAgent } from "./coding-agent";
import { verifyPreviewWithPlaywright, PlaywrightVerificationResult } from "../testing/playwright-verifier";

export interface RepairIterationRecord {
  iteration: number;
  timestamp: string;
  errorsDetected: {
    syntaxErrors: string[];
    diagnosticError: string | null;
    pageErrors: string[];
    consoleErrors: string[];
    renderedElementsCount: number;
  };
  repairPrompt: string;
  filesModified: string[];
  resolved: boolean;
  notes?: string;
}

export interface AutoRepairResult {
  success: boolean;
  isFixed: boolean;
  healthy: boolean;
  totalIterations: number;
  message: string;
  history: RepairIterationRecord[];
  finalVerification?: PlaywrightVerificationResult;
}

/**
 * Autonomous Playwright Repair Loop.
 * Continuously tests the live website preview in headless Chromium,
 * catches any runtime/console/syntax issues, and feeds them into the AI agent
 * until 0 errors remain and the website renders cleanly.
 */
export async function runAutonomousPlaywrightRepair({
  projectId,
  maxIterations = 5,
  baseUrl = "http://localhost:3000",
  initialErrors,
}: {
  projectId: string;
  maxIterations?: number;
  baseUrl?: string;
  initialErrors?: string[];
}): Promise<AutoRepairResult> {
  const history: RepairIterationRecord[] = [];
  let finalVerification: PlaywrightVerificationResult | undefined;

  const project = getProject(projectId);
  if (!project) {
    return {
      success: false,
      isFixed: false,
      healthy: false,
      totalIterations: 0,
      message: `Project ${projectId} not found.`,
      history: [],
    };
  }

  addProjectLog(projectId, {
    level: "info",
    message: `Starting Playwright autonomous repair loop (max ${maxIterations} iterations)...`,
    source: "playwright",
  });

  const activeFilePath = project.activeFile || "src/App.tsx";

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    // Step 1: AST validation
    const currentCode = project.files[activeFilePath] || "";
    const syntaxErrors: string[] = [];
    const astCheck = validateCode(currentCode, activeFilePath);
    if (!astCheck.valid) {
      syntaxErrors.push(`${activeFilePath}:${astCheck.line || 1}:${astCheck.column || 1} - ${astCheck.error}`);
    }

    // Also check other tsx/jsx files
    for (const [filePath, content] of Object.entries(project.files)) {
      if (filePath !== activeFilePath && (filePath.endsWith(".tsx") || filePath.endsWith(".jsx"))) {
        const otherCheck = validateCode(content, filePath);
        if (!otherCheck.valid) {
          syntaxErrors.push(`${filePath}:${otherCheck.line || 1}:${otherCheck.column || 1} - ${otherCheck.error}`);
        }
      }
    }

    let playwrightResult: PlaywrightVerificationResult;

    // If syntax is already broken, avoid launching browser if unnecessary, but if this is iteration 1 and no initialErrors, or if syntax passed, run Playwright
    if (syntaxErrors.length > 0) {
      playwrightResult = {
        healthy: false,
        isFixed: false,
        title: "Syntax Parse Error",
        consoleErrors: [],
        consoleLogs: [],
        pageErrors: syntaxErrors,
        diagnosticError: `Syntax/Babel AST Parse Error: ${syntaxErrors.join("; ")}`,
        renderedElementsCount: 0,
        durationMs: 0,
        url: `${baseUrl}/preview/${projectId}`,
      };
    } else {
      // Run actual headless Playwright Chromium verification
      playwrightResult = await verifyPreviewWithPlaywright(projectId, baseUrl);
    }

    finalVerification = playwrightResult;

    const hasSyntaxErrors = syntaxErrors.length > 0;
    const hasDiagnosticError = Boolean(playwrightResult.diagnosticError);
    const hasPageErrors = playwrightResult.pageErrors.length > 0;
    const hasCriticalConsoleErrors = playwrightResult.consoleErrors.length > 0;
    const isBlank = playwrightResult.renderedElementsCount === 0;

    const isCompletelyHealthy =
      !hasSyntaxErrors &&
      !hasDiagnosticError &&
      !hasPageErrors &&
      !hasCriticalConsoleErrors &&
      !isBlank;

    if (isCompletelyHealthy) {
      addProjectLog(projectId, {
        level: "info",
        message: `Playwright autonomous verification PASSED with 0 errors on iteration ${iteration}! (Rendered ${playwrightResult.renderedElementsCount} DOM elements)`,
        source: "playwright",
      });

      return {
        success: true,
        isFixed: true,
        healthy: true,
        totalIterations: iteration,
        message: `Website verified and working perfectly with 0 runtime or console errors. ${playwrightResult.renderedElementsCount} interactive elements rendered.`,
        history,
        finalVerification: playwrightResult,
      };
    }

    // Step 2: Formulate diagnostic repair prompt
    const errorDetails: string[] = [];
    if (hasSyntaxErrors) {
      errorDetails.push(`[SYNTAX / PARSER ERRORS]:\n${syntaxErrors.join("\n")}`);
    }
    if (hasDiagnosticError) {
      errorDetails.push(`[PREVIEW RUNTIME DIAGNOSTIC]:\n${playwrightResult.diagnosticError}`);
    }
    if (hasPageErrors) {
      errorDetails.push(`[BROWSER UNCAUGHT EXCEPTIONS]:\n${playwrightResult.pageErrors.join("\n")}`);
    }
    if (hasCriticalConsoleErrors) {
      errorDetails.push(`[CONSOLE ERRORS]:\n${playwrightResult.consoleErrors.join("\n")}`);
    }
    if (isBlank && !hasDiagnosticError) {
      errorDetails.push(`[DOM FAILURE]: Preview root mounted 0 elements (blank canvas). Ensure the default App component returns valid JSX.`);
    }

    const compiledErrorMessage = errorDetails.join("\n\n");

    addProjectLog(projectId, {
      level: "warn",
      message: `Playwright iteration ${iteration}/${maxIterations} detected errors: ${playwrightResult.diagnosticError || syntaxErrors[0] || playwrightResult.pageErrors[0] || playwrightResult.consoleErrors[0] || "Blank render"}`,
      source: "playwright",
    });

    const repairPrompt = `CRITICAL RUNTIME ERROR DETECTED BY PLAYWRIGHT ON http://localhost:3000/preview/${projectId}:

${compiledErrorMessage}

============================================================
CURRENT ACTIVE CODE (${activeFilePath}):
============================================================
\`\`\`tsx:${activeFilePath}
${currentCode}
\`\`\`

DIAGNOSTIC & REPAIR DIRECTIVES:
1. Fix the runtime crash, undefined variables, missing imports, unhandled hooks, or syntax errors immediately.
2. Ensure standard 'lucide-react' icon imports only (e.g. Sparkles, Play, Search, Bell, ChevronDown, Check, Plus, X, ArrowLeft, Star, Heart, etc.).
3. Ensure all JSX quotes are properly escaped and tags are cleanly closed.
4. Output the complete, full, working, 100% bug-free replacement file inside:
\`\`\`tsx:${activeFilePath}
// Full working code here
\`\`\`
5. Preserve 100% of the visual styling, theme, interactive state, and mock data.`;

    const codingAgent = new CodingAgent(project);
    let patchApplied = false;
    let modifiedFiles: string[] = [];

    try {
      const candidateModels = [
        project.settings.model || "gemini-2.5-flash",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
      ].filter((m, i, arr) => m && arr.indexOf(m) === i);

      let repairResponse = "";
      for (const m of candidateModels) {
        try {
          repairResponse = await aiGateway.chatCompletionSync({
            model: m,
            messages: [
              {
                role: "system",
                content:
                  "You are veronica, the elite Frontend Architect and Autonomous Debugger. Diagnose the exact Playwright runtime failure and output the complete, fixed file in ```tsx:filePath``` with zero syntax or runtime errors.",
              },
              { role: "user", content: repairPrompt },
            ],
          });
          if (repairResponse && repairResponse.trim().length > 0) break;
        } catch {
          // try next model
        }
      }

      if (repairResponse) {
        const extracted = codingAgent.extractCodeFiles(repairResponse);
        const matchingFile = extracted.find((f) => f.path === activeFilePath) || extracted[0];

        if (matchingFile && matchingFile.content) {
          const val = validateCode(matchingFile.content, matchingFile.path);
          if (val.valid) {
            project.files[matchingFile.path] = matchingFile.content;
            saveProject(project);
            patchApplied = true;
            modifiedFiles = [matchingFile.path];

            addProjectLog(projectId, {
              level: "info",
              message: `Playwright Auto-Repair iteration ${iteration}: Applied fix to ${matchingFile.path} (${matchingFile.content.length} bytes). Re-verifying with Playwright...`,
              source: "playwright",
            });
          } else {
            addProjectLog(projectId, {
              level: "warn",
              message: `Playwright Auto-Repair iteration ${iteration}: Proposed fix failed AST check: ${val.error}. Retrying next iteration...`,
              source: "playwright",
            });
          }
        }
      }
    } catch (repairErr: any) {
      addProjectLog(projectId, {
        level: "error",
        message: `Playwright Auto-Repair iteration ${iteration} exception: ${repairErr.message}`,
        source: "playwright",
      });
    }

    history.push({
      iteration,
      timestamp: new Date().toISOString(),
      errorsDetected: {
        syntaxErrors,
        diagnosticError: playwrightResult.diagnosticError,
        pageErrors: playwrightResult.pageErrors,
        consoleErrors: playwrightResult.consoleErrors,
        renderedElementsCount: playwrightResult.renderedElementsCount,
      },
      repairPrompt,
      filesModified: modifiedFiles,
      resolved: false,
    });
  }

  // Final check after loop finished
  const finalCheck = await verifyPreviewWithPlaywright(projectId, baseUrl);
  const isFinallyFixed = finalCheck.healthy && finalCheck.isFixed;

  return {
    success: isFinallyFixed,
    isFixed: isFinallyFixed,
    healthy: isFinallyFixed,
    totalIterations: maxIterations,
    message: isFinallyFixed
      ? `Website successfully repaired and verified with Playwright after ${maxIterations} iterations!`
      : `Website could not be 100% repaired after ${maxIterations} iterations. Residual error: ${finalCheck.diagnosticError || finalCheck.consoleErrors[0] || "Unresolved issues"}`,
    history,
    finalVerification: finalCheck,
  };
}
