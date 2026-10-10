import { Suspense } from "react";
import { WorkspaceClient } from "@/components/workspace/WorkspaceClient";


export default function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div 
          suppressHydrationWarning
          className="min-h-screen bg-[#08090d] flex items-center justify-center font-mono text-xs text-slate-400"
        >
          <div suppressHydrationWarning className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span>Initializing NOVAFORGE isolated workspace...</span>
          </div>
        </div>
      }
    >
      <WorkspaceClient params={params} />
    </Suspense>
  );
}
