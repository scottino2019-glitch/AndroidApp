import React from 'react';
import { ChevronLeft, Home, Square } from 'lucide-react';
import { useOS } from '../../OSContext';

export default function NavigationBar() {
  const { closeApp, activeAppId } = useOS();

  return (
    <div className="h-14 flex items-center justify-around px-4 bg-black/20 backdrop-blur-md border-t border-white/10 z-50">
      <button 
        onClick={() => activeAppId && closeApp()}
        className="p-3 text-white/80 hover:text-white active:scale-90 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={closeApp}
        className="p-3 text-white/80 hover:text-white active:scale-90 transition-all"
      >
        <Home size={24} />
      </button>
      <button 
        className="p-3 text-white/80 hover:text-white active:scale-90 transition-all"
      >
        <Square size={20} />
      </button>
    </div>
  );
}
