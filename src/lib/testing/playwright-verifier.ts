import { chromium } from "playwright";
import { addProjectLog } from "../storage/project-store";

export interface PlaywrightVerificationResult {
  healthy: boolean;
  isFixed: boolean;
  title: string;
  consoleErrors: string[];
  consoleLogs: { level: string; text: string }[];
  pageErrors: string[];
  diagnosticError: string | null;
  renderedElementsCount: number;
  durationMs: number;
  url: string;
}

/**
 * Headless Playwright verification for sandboxed preview of a project.
 * Inspects real browser runtime exceptions, console errors, Babel compilation failures,
 * and DOM mounting to guarantee the application works without errors.
 */
export async function verifyPreviewWithPlaywright(
  projectId: string,
  baseUrl: string = "http://localhost:3000"
): Promise<PlaywrightVerificationResult> {
  const startTime = Date.now();
  const consoleErrors: string[] = [];
  const consoleLogs: { level: string; text: string }[] = [];
  const pageErrors: string[] = [];
  let diagnosticError: string | null = null;
  let title = "";
  let renderedElementsCount = 0;
  const targetUrl = `${baseUrl}/preview/${projectId}?t=${Date.now()}`;

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Listen to all console events
    page.on("console", (msg) => {
      const type = msg.type();
      const text = msg.text();
      consoleLogs.push({ level: type, text });

      // Save to project log buffer
      try {
        addProjectLog(projectId, {
          level: type === "error" ? "error" : type === "warning" ? "warn" : "info",
          message: text,
          source: "browser",
        });
      } catch {
        // ignore
      }

      if (type === "error") {
        consoleErrors.push(text);
      }
    });

    // Listen to uncaught page exceptions
    page.on("pageerror", (err) => {
      const errMsg = err.message || String(err);
      pageErrors.push(errMsg);
      try {
        addProjectLog(projectId, {
          level: "error",
          message: `[Page Uncaught Exception] ${errMsg}`,
          source: "playwright",
        });
      } catch {
        // ignore
      }
    });

    await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });

    title = await page.title();

    // Wait for the sandbox iframe to exist
    const iframeEl = await page.waitForSelector("#sandbox-iframe", { timeout: 8000 }).catch(() => null);
    let frame = iframeEl ? await iframeEl.contentFrame() : null;

    if (!frame) {
      // Fallback: check frames list or use main page frame directly
      const frames = page.frames();
      frame = frames.find((f) => f !== page.mainFrame()) || page.mainFrame();
    }

    // Give Babel Standalone and React 2.5 seconds to compile and mount
    await page.waitForTimeout(2500);

    let errorBoundaryVisible = false;

    if (frame) {
      // Check if sandbox error boundary is displayed
      try {
        const errorBoundary = await frame.$("#error-boundary");
        if (errorBoundary) {
          const displayStyle = await errorBoundary.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.display;
          });
          if (displayStyle !== "none") {
            errorBoundaryVisible = true;
            diagnosticError = await frame.$eval("#error-message", (el) => (el as HTMLElement).innerText || el.textContent || "").catch(() => null);
          }
        }
      } catch {
        // ignore
      }

      // Check rendered elements inside root
      try {
        renderedElementsCount = await frame.evaluate(() => {
          const root = document.getElementById("root");
          if (!root) return 0;
          // Check if still loading
          if (root.innerText && root.innerText.includes("Compiling and launching preview...")) {
            return 0;
          }
          return root.getElementsByTagName("*").length;
        });
      } catch {
        renderedElementsCount = 0;
      }

      // If still 0 elements and no error boundary, give an extra 1.5s in case heavy compilation
      if (renderedElementsCount === 0 && !errorBoundaryVisible) {
        await page.waitForTimeout(1500);
        try {
          renderedElementsCount = await frame.evaluate(() => {
            const root = document.getElementById("root");
            return root ? root.getElementsByTagName("*").length : 0;
          });
        } catch {
          renderedElementsCount = 0;
        }
      }
    } else {
      // Check top-level page for error boundary
      try {
        const topError = await page.$("#error-boundary");
        if (topError) {
          const isVis = await topError.isVisible().catch(() => false);
          if (isVis) {
            errorBoundaryVisible = true;
            diagnosticError = await page.$eval("#error-message", (el) => (el as HTMLElement).innerText || el.textContent || "").catch(() => null);
          }
        }
      } catch {
        // ignore
      }
    }

    // Filter non-fatal asset warnings (favicon, react devtools, chrome-extension)
    const criticalConsoleErrors = consoleErrors.filter(
      (err) =>
        !err.includes("favicon.ico") &&
        !err.includes("Failed to load resource: the server responded with a status of 404") &&
        !err.includes("Download the React DevTools") &&
        !err.includes("chrome-extension://")
    );

    const isHealthy =
      !errorBoundaryVisible &&
      pageErrors.length === 0 &&
      criticalConsoleErrors.length === 0 &&
      !diagnosticError &&
      renderedElementsCount > 0;

    return {
      healthy: isHealthy,
      isFixed: isHealthy,
      title,
      consoleErrors: criticalConsoleErrors,
      consoleLogs,
      pageErrors,
      diagnosticError,
      renderedElementsCount,
      durationMs: Date.now() - startTime,
      url: targetUrl,
    };
  } catch (err: any) {
    return {
      healthy: false,
      isFixed: false,
      title: title || "Error Loading Preview",
      consoleErrors: [...consoleErrors, err.message],
      consoleLogs,
      pageErrors: [...pageErrors, err.message],
      diagnosticError: err.message,
      renderedElementsCount,
      durationMs: Date.now() - startTime,
      url: targetUrl,
    };
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}
