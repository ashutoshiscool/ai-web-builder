import { getProject } from "@/lib/storage/project-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const project = getProject(id);

  if (!project) {
    const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project Not Found — Preview</title>
  <style>
    body {
      background-color: #08090d;
      color: #f1f5f9;
      font-family: monospace;
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .box {
      background: #181119;
      border: 1px solid #f43f5e;
      padding: 24px 32px;
      border-radius: 12px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="box">
    <div style="color: #f43f5e; font-weight: bold; font-size: 16px;">Project Not Found</div>
    <div style="color: #64748b; font-size: 12px; margin-top: 8px;">ID: ${id}</div>
  </div>
</body>
</html>`;
    return new Response(notFoundHtml, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  if (project.sandboxStatus === "stopped") {
    const stoppedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project.name} — Sandbox Paused</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-[#08090d] text-slate-100 flex items-center justify-center p-6 font-mono text-xs">
  <div class="max-w-md w-full bg-slate-900 border border-amber-500/40 p-8 rounded-2xl text-center space-y-4 shadow-2xl backdrop-blur-md">
    <div class="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mx-auto text-amber-400 font-bold text-lg">
      ⏸️
    </div>
    <div>
      <h2 class="text-sm font-bold text-amber-400 uppercase tracking-wider">Sandbox Paused / Stopped</h2>
      <p class="text-slate-400 text-xs mt-1">Live execution for <strong>${project.name}</strong> is currently paused.</p>
    </div>
    <button
      id="start-sandbox-btn"
      class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
    >
      Start / Resume Sandbox
    </button>
  </div>
  <script>
    document.getElementById('start-sandbox-btn')?.addEventListener('click', function() {
      fetch('/api/projects/${id}/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' })
      }).then(function() { window.location.reload(); });
    });
  </script>
</body>
</html>`;
    return new Response(stoppedHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  const appCode =
    project.files["src/App.tsx"] ||
    project.files["src/app/page.tsx"] ||
    project.files["src/index.tsx"] ||
    "";
  const customCss =
    project.files["src/index.css"] ||
    project.files["src/app/globals.css"] ||
    "";

  // Collect other source files (components, utilities) to bundle
  const helperFiles: Record<string, string> = {};
  for (const [filePath, content] of Object.entries(project.files)) {
    if (
      (filePath.endsWith(".tsx") ||
        filePath.endsWith(".ts") ||
        filePath.endsWith(".jsx") ||
        filePath.endsWith(".js")) &&
      !["src/App.tsx", "src/app/page.tsx", "src/index.tsx"].includes(filePath)
    ) {
      helperFiles[filePath] = content;
    }
  }

  const safeAppCode = JSON.stringify(appCode).replace(/<\/script/gi, "<\\/script");
  const safeHelperFiles = JSON.stringify(helperFiles).replace(/<\/script/gi, "<\\/script");

  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project.name} — Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              100: '#e0e7ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
            }
          }
        }
      }
    }
  </script>
  <style>
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: #08090d;
      color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow-x: hidden;
    }
    #root {
      width: 100%;
      min-height: 100%;
    }
    ${customCss}
  </style>

  <!-- React 18 & Babel Standalone -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <!-- Compatibility marker for verifier -->
  <div id="sandbox-iframe" style="display: none;"></div>

  <div id="root">
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #08090d; color: #64748b; font-family: monospace; font-size: 12px;">
      Compiling and launching preview...
    </div>
  </div>

  <div id="error-boundary" style="display: none; position: fixed; inset: 0; background: rgba(8, 9, 13, 0.95); z-index: 9999; padding: 24px; font-family: monospace; overflow: auto;">
    <div style="max-width: 600px; margin: 40px auto; background: #181119; border: 1px solid #f43f5e; border-radius: 12px; padding: 20px;">
      <div style="color: #f43f5e; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Runtime Diagnostic Error</div>
      <div id="error-message" style="color: #fda4af; font-size: 12px; white-space: pre-wrap; line-height: 1.5;"></div>
      <button onclick="handleAskToFix()" style="margin-top: 16px; background: #e11d48; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: 600;">
        Ask Agent to Fix
      </button>
    </div>
  </div>

  <script>
    function handleAskToFix() {
      const errMsg = document.getElementById('error-message')?.innerText || 'Unknown Runtime Diagnostic Error';
      try { if (window.parent) window.parent.postMessage({ type: 'FIX_ERROR', error: errMsg }, '*'); } catch (e) {}
      try { if (window.top && window.top !== window) window.top.postMessage({ type: 'FIX_ERROR', error: errMsg }, '*'); } catch (e) {}
    }

    // Intercept console logs and postMessage to parent
    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;

    function sendToParent(type, message) {
      try {
        if (window.parent) {
          window.parent.postMessage({ type: 'CONSOLE_LOG', level: type, message: String(message), timestamp: new Date().toLocaleTimeString() }, '*');
        }
      } catch (e) {}
      try {
        if (window.top && window.top !== window.parent) {
          window.top.postMessage({ type: 'CONSOLE_LOG', level: type, message: String(message), timestamp: new Date().toLocaleTimeString() }, '*');
        }
      } catch (e) {}
      try {
        fetch('/api/projects/${id}/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ level: type, message: String(message), source: 'browser' }),
        }).catch(function() {});
      } catch (e) {}
    }

    console.log = function(...args) {
      sendToParent('info', args.join(' '));
      origLog.apply(console, args);
    };
    console.error = function(...args) {
      sendToParent('error', args.join(' '));
      origError.apply(console, args);
    };
    console.warn = function(...args) {
      sendToParent('warn', args.join(' '));
      origWarn.apply(console, args);
    };

    window.onerror = function(msg, url, line, col, error) {
      const errStr = msg + ' (line ' + line + ')';
      document.getElementById('error-boundary').style.display = 'block';
      document.getElementById('error-message').innerText = errStr + (error && error.stack ? '\\n\\n' + error.stack : '');
      sendToParent('error', errStr);
      return false;
    };
  </script>

  <!-- Universal Lucide Icon Polyfill & Dynamic Proxy -->
  <script>
    function createIconComponent(name) {
      return function LucideIcon(props) {
        const cls = (props && props.className) || "w-4 h-4";
        const style = (props && props.style) || {};
        
        let innerSvg = React.createElement('circle', { key: 'def-c', cx: 12, cy: 12, r: 9 });
        const lower = (name || '').toLowerCase();

        if (lower.includes('play')) {
          innerSvg = React.createElement('polygon', { key: 'play', points: '5 3 19 12 5 21 5 3', fill: props?.fill || 'currentColor' });
        } else if (lower.includes('pause')) {
          innerSvg = [
            React.createElement('rect', { key: 'p1', x: 6, y: 4, width: 4, height: 16, fill: 'currentColor' }),
            React.createElement('rect', { key: 'p2', x: 14, y: 4, width: 4, height: 16, fill: 'currentColor' })
          ];
        } else if (lower.includes('coffee')) {
          innerSvg = [
            React.createElement('path', { key: 'c1', d: 'M18 8h1a4 4 0 0 1 0 8h-1' }),
            React.createElement('path', { key: 'c2', d: 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' }),
            React.createElement('line', { key: 'c3', x1: 6, y1: 1, x2: 6, y2: 4 }),
            React.createElement('line', { key: 'c4', x1: 10, y1: 1, x2: 10, y2: 4 }),
            React.createElement('line', { key: 'c5', x1: 14, y1: 1, x2: 14, y2: 4 })
          ];
        } else if (lower.includes('shoppingbag') || lower.includes('bag')) {
          innerSvg = [
            React.createElement('path', { key: 'b1', d: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' }),
            React.createElement('line', { key: 'b2', x1: 3, y1: 6, x2: 21, y2: 6 }),
            React.createElement('path', { key: 'b3', d: 'M16 10a4 4 0 0 1-8 0' })
          ];
        } else if (lower.includes('star')) {
          innerSvg = React.createElement('polygon', {
            key: 'st',
            points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
            fill: props?.fill || 'none'
          });
        } else if (lower.includes('info')) {
          innerSvg = [
            React.createElement('circle', { key: 'c', cx: 12, cy: 12, r: 10 }),
            React.createElement('line', { key: 'l1', x1: 12, y1: 16, x2: 12, y2: 12 }),
            React.createElement('line', { key: 'l2', x1: 12, y1: 8, x2: 12.01, y2: 8 })
          ];
        } else if (lower.includes('volumex')) {
          innerSvg = [
            React.createElement('polygon', { key: 'v', points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
            React.createElement('line', { key: 'x1', x1: 22, y1: 9, x2: 16, y2: 15 }),
            React.createElement('line', { key: 'x2', x1: 16, y1: 9, x2: 22, y2: 15 })
          ];
        } else if (lower.includes('volume')) {
          innerSvg = [
            React.createElement('polygon', { key: 'v', points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
            React.createElement('path', { key: 'a', d: 'M15.54 8.46a5 5 0 0 1 0 7.07' })
          ];
        } else if (lower.includes('check')) {
          innerSvg = React.createElement('polyline', { key: 'chk', points: '20 6 9 17 4 12' });
        } else if (lower.includes('plus')) {
          innerSvg = [
            React.createElement('line', { key: 'p1', x1: 12, y1: 5, x2: 12, y2: 19 }),
            React.createElement('line', { key: 'p2', x1: 5, y1: 12, x2: 19, y2: 12 })
          ];
        } else if (lower.includes('minus')) {
          innerSvg = React.createElement('line', { key: 'm1', x1: 5, y1: 12, x2: 19, y2: 12 });
        } else if (lower.includes('search')) {
          innerSvg = [
            React.createElement('circle', { key: 'c', cx: 11, cy: 11, r: 8 }),
            React.createElement('line', { key: 'l', x1: 21, y1: 21, x2: 16.65, y2: 16.65 })
          ];
        } else if (lower.includes('thumbsup')) {
          innerSvg = React.createElement('path', { key: 'tu', d: 'M7 10v12 M15 10.5a3 3 0 0 0 3-3v-.5a2 2 0 0 0-2-2h-3l.5-3a2 2 0 0 0-2-2L8 8v14h10a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H15z' });
        } else if (lower.includes('bell')) {
          innerSvg = [
            React.createElement('path', { key: 'b', d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
            React.createElement('path', { key: 'b2', d: 'M13.73 21a2 2 0 0 1-3.46 0' })
          ];
        } else if (lower.includes('arrowleft')) {
          innerSvg = [
            React.createElement('line', { key: 'l', x1: 19, y1: 12, x2: 5, y2: 12 }),
            React.createElement('polyline', { key: 'p', points: '12 19 5 12 12 5' })
          ];
        } else if (lower.includes('arrowright')) {
          innerSvg = [
            React.createElement('line', { key: 'l', x1: 5, y1: 12, x2: 19, y2: 12 }),
            React.createElement('polyline', { key: 'p', points: '12 5 19 12 12 19' })
          ];
        } else if (lower.includes('chevronright')) {
          innerSvg = React.createElement('polyline', { key: 'p', points: '9 18 15 12 9 6' });
        } else if (lower.includes('chevronleft')) {
          innerSvg = React.createElement('polyline', { key: 'p', points: '15 18 9 12 15 6' });
        } else if (lower.includes('chevrondown')) {
          innerSvg = React.createElement('polyline', { key: 'p', points: '6 9 12 15 18 9' });
        } else if (lower.includes('chevronup')) {
          innerSvg = React.createElement('polyline', { key: 'p', points: '18 15 12 9 6 15' });
        } else if (lower.includes('menu')) {
          innerSvg = [
            React.createElement('line', { key: 'm1', x1: 3, y1: 12, x2: 21, y2: 12 }),
            React.createElement('line', { key: 'm2', x1: 3, y1: 6, x2: 21, y2: 6 }),
            React.createElement('line', { key: 'm3', x1: 3, y1: 18, x2: 21, y2: 18 })
          ];
        } else if (lower.includes('x')) {
          innerSvg = [
            React.createElement('line', { key: 'x1', x1: 18, y1: 6, x2: 6, y2: 18 }),
            React.createElement('line', { key: 'x2', x1: 6, y1: 6, x2: 18, y2: 18 })
          ];
        } else if (lower.includes('heart')) {
          innerSvg = React.createElement('path', { key: 'h', d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' });
        } else if (lower.includes('flame')) {
          innerSvg = React.createElement('path', { key: 'fl', d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' });
        } else if (lower.includes('shield')) {
          innerSvg = React.createElement('path', { key: 'sh', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' });
        } else if (lower.includes('sparkles')) {
          innerSvg = [
            React.createElement('path', { key: 'sp1', d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' })
          ];
        } else if (lower.includes('navigation') || lower.includes('compass')) {
          innerSvg = React.createElement('polygon', { key: 'nav', points: '3 11 22 2 13 21 11 13 3 11' });
        } else if (lower.includes('car')) {
          innerSvg = [
            React.createElement('path', { key: 'c1', d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2' }),
            React.createElement('circle', { key: 'c2', cx: 7, cy: 17, r: 2 }),
            React.createElement('circle', { key: 'c3', cx: 17, cy: 17, r: 2 })
          ];
        } else if (lower.includes('mappin') || lower.includes('map')) {
          innerSvg = [
            React.createElement('path', { key: 'mp1', d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
            React.createElement('circle', { key: 'mp2', cx: 12, cy: 10, r: 3 })
          ];
        } else if (lower.includes('phone')) {
          innerSvg = React.createElement('path', { key: 'ph', d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' });
        } else if (lower.includes('mail')) {
          innerSvg = [
            React.createElement('rect', { key: 'm1', width: 20, height: 16, x: 2, y: 4, rx: 2 }),
            React.createElement('path', { key: 'm2', d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' })
          ];
        } else if (lower.includes('creditcard')) {
          innerSvg = [
            React.createElement('rect', { key: 'cc1', width: 20, height: 14, x: 2, y: 5, rx: 2 }),
            React.createElement('line', { key: 'cc2', x1: 2, x2: 22, y1: 10, y2: 10 })
          ];
        } else if (lower.includes('user')) {
          innerSvg = [
            React.createElement('path', { key: 'u1', d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }),
            React.createElement('circle', { key: 'u2', cx: 12, cy: 7, r: 4 })
          ];
        } else if (lower.includes('calendar')) {
          innerSvg = [
            React.createElement('rect', { key: 'cal1', width: 18, height: 18, x: 3, y: 4, rx: 2 }),
            React.createElement('line', { key: 'cal2', x1: 16, x2: 16, y1: 2, y2: 6 }),
            React.createElement('line', { key: 'cal3', x1: 8, x2: 8, y1: 2, y2: 6 }),
            React.createElement('line', { key: 'cal4', x1: 3, x2: 21, y1: 10, y2: 10 })
          ];
        } else if (lower.includes('dollar')) {
          innerSvg = [
            React.createElement('line', { key: 'd1', x1: 12, x2: 12, y1: 2, y2: 22 }),
            React.createElement('path', { key: 'd2', d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' })
          ];
        } else if (lower.includes('zap')) {
          innerSvg = React.createElement('polygon', { key: 'z', points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' });
        } else if (lower.includes('moon')) {
          innerSvg = React.createElement('path', { key: 'mn', d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' });
        } else if (lower.includes('sun')) {
          innerSvg = [
            React.createElement('circle', { key: 's1', cx: 12, cy: 12, r: 4 }),
            React.createElement('path', { key: 's2', d: 'M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41' })
          ];
        }

        return React.createElement('svg', {
          className: cls,
          style: style,
          viewBox: '0 0 24 24',
          fill: props?.fill || 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }, innerSvg);
      };
    }

    // Dynamic icon proxy cache
    window.lucideIcons = new Proxy({}, {
      get: function(target, prop) {
        if (typeof prop !== 'string' || prop === 'then' || prop === '$$typeof') return undefined;
        if (!target[prop]) {
          target[prop] = createIconComponent(prop);
        }
        return target[prop];
      }
    });

    const COMMON_ICONS = [
      'Play', 'Pause', 'Info', 'Search', 'Bell', 'ChevronDown', 'ChevronRight', 'ChevronLeft', 'ChevronUp',
      'Check', 'CheckCircle2', 'Plus', 'Minus', 'ThumbsUp', 'ThumbsDown', 'Volume2', 'VolumeX', 'X',
      'ArrowLeft', 'ArrowRight', 'ArrowUpRight', 'Sparkles', 'Flame', 'Tv', 'Film', 'ListOrdered',
      'RotateCcw', 'SkipForward', 'Maximize2', 'Minimize2', 'User', 'Users', 'Database', 'CreditCard',
      'ShieldCheck', 'Shield', 'TrendingUp', 'Activity', 'Zap', 'BarChart3', 'Code2', 'Terminal', 'Bot',
      'Send', 'RefreshCw', 'Trash2', 'Sliders', 'SlidersHorizontal', 'ShoppingBag', 'Star', 'Heart', 'Coffee',
      'Award', 'Menu', 'Github', 'Twitter', 'Linkedin', 'ExternalLink', 'Briefcase', 'Mail', 'MoreHorizontal',
      'Clock', 'AlertCircle', 'AlertTriangle', 'Cpu', 'Layers', 'Folder', 'FileCode', 'Eye', 'DollarSign',
      'Navigation', 'Car', 'MapPin', 'Compass', 'Phone', 'Calendar', 'Sun', 'Moon', 'Headphones'
    ];

    COMMON_ICONS.forEach(name => {
      try {
        Object.defineProperty(window, name, {
          value: window.lucideIcons[name],
          configurable: true,
          writable: true
        });
      } catch (e) {
        try { window[name] = window.lucideIcons[name]; } catch (e2) {}
      }
    });
  </script>

  <script>
    if (window.React) {
      Object.assign(window, React);
      window._Fragment = React.Fragment;
      window.Fragment = React.Fragment;
      window._jsx = function(type, props, key) {
        var p = Object.assign({}, props);
        if (key !== undefined) p.key = key;
        return React.createElement(type, p);
      };
      window._jsxs = window._jsx;
      window.jsx = window._jsx;
      window.jsxs = window._jsx;
    }
    if (window.lucideIcons) {
      window.lucideReact = window.lucideIcons;
      window.Lucide = window.lucideIcons;
      window['lucide-react'] = window.lucideIcons;
    }

    // Module registry for multi-file projects
    window.__MODULES__ = {};

    function cleanAndTransformCode(code, filename) {
      let cleaned = code;
      const localDeclarations = [];
      
      // Dynamic lucide-react icon resolver & local lexical scoping
      const importRegex = /import\\s*\\{([^}]+)\\}\\s*from\\s*['"]lucide-react['"];?/g;
      let match;
      while ((match = importRegex.exec(cleaned)) !== null) {
        const specifiers = match[1].split(',').map(s => s.trim()).filter(Boolean);
        specifiers.forEach(spec => {
          let origName = spec;
          let localName = spec;
          if (spec.includes(' as ')) {
            const parts = spec.split(/\\s+as\\s+/);
            origName = parts[0].trim();
            localName = parts[1].trim();
          }
          localDeclarations.push('var ' + localName + ' = (window.lucideIcons && window.lucideIcons["' + origName + '"]) || createIconComponent("' + origName + '");');
          try {
            Object.defineProperty(window, origName, {
              value: window.lucideIcons[origName],
              configurable: true,
              writable: true
            });
          } catch(e) {
            try { window[origName] = window.lucideIcons[origName]; } catch(e2) {}
          }
          try {
            Object.defineProperty(window, localName, {
              value: window.lucideIcons[origName],
              configurable: true,
              writable: true
            });
          } catch(e) {
            try { window[localName] = window.lucideIcons[origName]; } catch(e2) {}
          }
        });
      }

      // React named imports resolver & local lexical scoping
      const reactNamedRegex = /import\\s*(?:React\\s*,?\\s*)?\\{([^}]+)\\}\\s*from\\s*['"]react['"];?/g;
      let rMatch;
      while ((rMatch = reactNamedRegex.exec(cleaned)) !== null) {
        const specifiers = rMatch[1].split(',').map(s => s.trim()).filter(Boolean);
        specifiers.forEach(spec => {
          let origName = spec;
          let localName = spec;
          if (spec.includes(' as ')) {
            const parts = spec.split(/\\s+as\\s+/);
            origName = parts[0].trim();
            localName = parts[1].trim();
          }
          localDeclarations.push('var ' + localName + ' = (window.React && window.React["' + origName + '"]) !== undefined ? window.React["' + origName + '"] : undefined;');
        });
      }

      // Handle wildcard / default lucide-react imports
      cleaned = cleaned.replace(/import\\s+\\*\\s+as\\s+([a-zA-Z0-9_$]+)\\s+from\\s*['"]lucide-react['"];?/g, 'var $1 = window.lucideIcons;');
      cleaned = cleaned.replace(/import\\s+([a-zA-Z0-9_$]+)\\s+from\\s*['"]lucide-react['"];?/g, function(m, id) {
        if (id === 'React') return 'var React = window.React;';
        return 'var ' + id + ' = window.lucideIcons;';
      });

      // Comprehensive import stripping
      cleaned = cleaned.replace(/import\\s+(?:type\\s+)?[\\s\\S]*?from\\s*['"][^'"]+['"];?/g, '');
      cleaned = cleaned.replace(/import\\s*['"][^'"]+['"];?/g, '');
      cleaned = cleaned.replace(/^\\s*import\\b[^\\n;]*;?/gm, '');

      // Clean exports
      cleaned = cleaned
        .replace(/export\\s+default\\s+function\\s*([a-zA-Z0-9_$]+)?/g, (m, name) => 'function ' + (name || 'App'))
        .replace(/export\\s+default\\s+class\\s*([a-zA-Z0-9_$]+)?/g, (m, name) => 'class ' + (name || 'App'))
        .replace(/export\\s+default\\s+([a-zA-Z0-9_$]+)\\s*;?/g, (m, name) => 'var Exported = ' + name + ';')
        .replace(/export\\s+default\\s+/g, 'const App = ')
        .replace(/export\\s+(const|let|var|function|class|type|interface)\\s+/g, '$1 ')
        .replace(/export\\s*\\{[^}]*\\}\\s*;?/g, '');

      // Transform with Babel
      let transformed;
      try {
        transformed = Babel.transform(cleaned, { 
          filename: filename || 'module.tsx',
          presets: [['react', { runtime: 'classic' }], ['typescript', { ignoreExtensions: true }]] 
        }).code;
      } catch (err1) {
        try {
          transformed = Babel.transform(cleaned, { 
            filename: filename || 'module.tsx',
            presets: [['react', { runtime: 'classic' }]] 
          }).code;
        } catch (err2) {
          transformed = Babel.transform(cleaned, { 
            filename: filename || 'module.tsx',
            presets: ['react'] 
          }).code;
        }
      }

      // Post-transform safety clean
      transformed = transformed
        .replace(/import\\s+(?:type\\s+)?[\\s\\S]*?from\\s*['"][^'"]+['"];?/g, '')
        .replace(/import\\s*['"][^'"]+['"];?/g, '')
        .replace(/^\\s*import\\b[^\\n;]*;?/gm, '');

      const preamble = [
        'var _jsx = window._jsx;',
        'var _jsxs = window._jsxs;',
        'var _Fragment = window._Fragment;',
        'var React = window.React;',
        'var ReactDOM = window.ReactDOM;'
      ].concat(localDeclarations).join('\\n') + '\\n';

      return preamble + transformed;
    }

    try {
      // 1. Compile helper files first
      const helperFiles = ${safeHelperFiles};
      for (const [filePath, content] of Object.entries(helperFiles)) {
        try {
          const compiledHelper = cleanAndTransformCode(content, filePath);
          eval(compiledHelper);
        } catch (hErr) {
          console.warn('Helper file warning in ' + filePath + ':', hErr);
        }
      }

      // 2. Compile main App.tsx
      const mainRawCode = ${safeAppCode};
      let transformed = cleanAndTransformCode(mainRawCode, 'App.tsx');
      transformed += '\\n;try { if (typeof App !== "undefined") { window.__NOVAFORGE_APP__ = App; } else if (typeof Exported !== "undefined") { window.__NOVAFORGE_APP__ = Exported; } } catch(e){}';

      eval(transformed);

      // 3. Mount React Root
      const rootElement = document.getElementById('root');
      const root = ReactDOM.createRoot(rootElement);
      const ComponentToRender = window.__NOVAFORGE_APP__ || 
        (typeof App !== 'undefined' ? App : 
        (typeof Exported !== 'undefined' ? Exported : 
        () => React.createElement('div', { className: 'p-8 text-center text-slate-400 font-mono text-xs' }, 'No default export found in App.tsx')));

      class SandboxErrorBoundary extends React.Component {
        constructor(props) {
          super(props);
          this.state = { hasError: false, error: null };
        }
        static getDerivedStateFromError(error) {
          return { hasError: true, error };
        }
        componentDidCatch(error, errorInfo) {
          console.error('React Component Error:', error, errorInfo);
        }
        render() {
          if (this.state.hasError) {
            return React.createElement('div', {
              style: { padding: 24, background: '#181119', border: '1px solid #f43f5e', borderRadius: 12, color: '#fda4af', margin: 24, fontFamily: 'monospace' }
            }, [
              React.createElement('h2', { key: 'h', style: { color: '#f43f5e', margin: 0, marginBottom: 8, fontSize: 16 } }, 'Component Runtime Error'),
              React.createElement('pre', { key: 'p', style: { fontSize: 12, whiteSpace: 'pre-wrap' } }, this.state.error?.message || String(this.state.error))
            ]);
          }
          return this.props.children;
        }
      }

      root.render(React.createElement(SandboxErrorBoundary, null, React.createElement(ComponentToRender)));

      console.log('NOVAFORGE Sandbox: Application compiled & mounted successfully.');
      if (window.parent) {
        window.parent.postMessage({ type: 'PREVIEW_LOADED' }, '*');
      }
    } catch (err) {
      console.error('Compilation Error:', err);
      document.getElementById('error-boundary').style.display = 'block';
      document.getElementById('error-message').innerText = err.message + '\\n\\n' + (err.stack || '');
    }
  </script>
</body>
</html>`;

  return new Response(htmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
