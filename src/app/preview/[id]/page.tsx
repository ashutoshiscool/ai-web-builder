import { getProject } from "@/lib/storage/project-store";
import { notFound } from "next/navigation";

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#08090d] text-slate-100 flex items-center justify-center p-6 font-mono text-xs">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
          <p className="text-rose-400 font-bold">Project Not Found</p>
          <p className="text-slate-500">ID: {id}</p>
        </div>
      </div>
    );
  }

  const appCode = project.files["src/App.tsx"] || project.files["src/app/page.tsx"] || project.files["src/index.tsx"] || "";
  const customCss = project.files["src/index.css"] || project.files["src/app/globals.css"] || "";

  // HTML sandbox page with Babel, React, Lucide, Tailwind, and PostMessage bridges
  const htmlContent = `
<!DOCTYPE html>
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
    body {
      background-color: #08090d;
      color: #f1f5f9;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    ${customCss}
  </style>

  <!-- React 18/19 & Babel Standalone -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root">
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #08090d; color: #64748b; font-family: monospace; font-size: 12px;">
      Compiling and launching preview...
    </div>
  </div>

  <div id="error-boundary" style="display: none; position: fixed; inset: 0; background: rgba(8, 9, 13, 0.95); z-index: 9999; padding: 24px; font-family: monospace; overflow: auto;">
    <div style="max-width: 600px; margin: 40px auto; background: #181119; border: 1px solid #f43f5e; border-radius: 12px; padding: 20px;">
      <div style="color: #f43f5e; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Runtime Diagnostic Error</div>
      <div id="error-message" style="color: #fda4af; font-size: 12px; white-space: pre-wrap; line-height: 1.5;"></div>
      <button onclick="parent.postMessage({ type: 'FIX_ERROR', error: document.getElementById('error-message').innerText }, '*')" style="margin-top: 16px; background: #e11d48; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; cursor: pointer;">
        Ask Agent to Fix
      </button>
    </div>
  </div>

  <script>
    // Intercept console logs and postMessage to parent
    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;

    function sendToParent(type, message) {
      try {
        window.parent.postMessage({ type: 'CONSOLE_LOG', level: type, message: String(message), timestamp: new Date().toLocaleTimeString() }, '*');
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

  <!-- Lucide Icon Polyfill -->
  <script>
    // Polyfill common Lucide icons as SVG components
    const iconNames = [
      'Sparkles', 'ArrowRight', 'ArrowUpRight', 'Check', 'CheckCircle2', 'X', 'Search',
      'Settings', 'Bell', 'User', 'Users', 'Database', 'CreditCard', 'ShieldCheck', 'Shield',
      'TrendingUp', 'Activity', 'Zap', 'BarChart3', 'Code2', 'Terminal', 'Bot', 'Send',
      'RefreshCw', 'Trash2', 'Sliders', 'ChevronDown', 'ChevronRight', 'ShoppingBag', 'Star',
      'Heart', 'Github', 'Twitter', 'Linkedin', 'ExternalLink', 'Briefcase', 'Mail', 'Plus',
      'MoreHorizontal', 'Clock', 'AlertCircle', 'Cpu', 'Layers', 'Folder', 'FileCode', 'Eye'
    ];

    window.lucideIcons = {};
    iconNames.forEach(name => {
      window.lucideIcons[name] = function(props) {
        const cls = (props && props.className) || "w-4 h-4";
        const style = (props && props.style) || {};
        return React.createElement('svg', {
          className: cls,
          style: style,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }, [
          React.createElement('circle', { key: '1', cx: 12, cy: 12, r: 9 }),
          React.createElement('path', { key: '2', d: 'M12 8v4l3 3' })
        ]);
      };
    });
  </script>

  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;
    const Lucide = window.lucideIcons;
    
    // Create local variables for all icons so "import { Zap } from 'lucide-react'" behaves transparently
    const { 
      Sparkles, ArrowRight, ArrowUpRight, Check, CheckCircle2, X, Search,
      Settings, Bell, User, Users, Database, CreditCard, ShieldCheck, Shield,
      TrendingUp, Activity, Zap, BarChart3, Code2, Terminal, Bot, Send,
      RefreshCw, Trash2, Sliders, ChevronDown, ChevronRight, ShoppingBag, Star,
      Heart, Github, Twitter, Linkedin, ExternalLink, Briefcase, Mail, Plus,
      MoreHorizontal, Clock, AlertCircle, Cpu, Layers, Folder, FileCode, Eye
    } = Lucide;

    try {
      // Clean import statements from raw code so Babel can evaluate it in the browser
      let rawCode = ${JSON.stringify(appCode)};
      rawCode = rawCode
        .replace(/import\\s+[^;]+from\\s+['"][^'"]+['"];?/g, '')
        .replace(/export\\s+default\\s+function/, 'function App')
        .replace(/export\\s+default\\s+const/, 'const App =')
        .replace(/export\\s+default/, 'const Exported =');

      // Evaluate the App code
      const transformed = Babel.transform(rawCode, { presets: ['react'] }).code;
      eval(transformed);

      // Render root
      const rootElement = document.getElementById('root');
      const root = ReactDOM.createRoot(rootElement);
      const ComponentToRender = typeof App !== 'undefined' ? App : (typeof Exported !== 'undefined' ? Exported : () => React.createElement('div', null, 'No App component found'));
      root.render(React.createElement(ComponentToRender));

      console.log('NOVAFORGE Sandbox: Application initialized successfully.');
      window.parent.postMessage({ type: 'PREVIEW_LOADED' }, '*');
    } catch (err) {
      console.error('Compilation Error:', err);
      document.getElementById('error-boundary').style.display = 'block';
      document.getElementById('error-message').innerText = err.message + '\\n\\n' + (err.stack || '');
    }
  </script>
</body>
</html>
  `;

  return (
    <div className="w-full h-full m-0 p-0 overflow-hidden bg-[#08090d]">
      <iframe
        srcDoc={htmlContent}
        title={project.name}
        className="w-full h-full border-0 min-h-screen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
      />
    </div>
  );
}
