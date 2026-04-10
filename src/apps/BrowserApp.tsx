import React from 'react';
import { Globe, Loader2 } from 'lucide-react';

interface BrowserAppProps {
  url: string;
}

export default function BrowserApp({ url }: BrowserAppProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="bg-slate-800 p-2 flex items-center gap-3 border-b border-slate-700">
        <div className="bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 flex-1 max-w-md mx-auto">
          <Globe size={14} className="text-slate-400" />
          <span className="text-xs text-slate-300 truncate font-medium">{url}</span>
        </div>
      </div>
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={32} className="animate-spin text-blue-500" />
              <p className="text-sm text-slate-400 font-medium">Caricamento applicazione...</p>
            </div>
          </div>
        )}
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
