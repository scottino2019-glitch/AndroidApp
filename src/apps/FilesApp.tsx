import React, { useState } from 'react';
import { Folder, FileText, Image, FileJson, Trash2, Search, MoreVertical, ChevronRight } from 'lucide-react';
import { useVFS } from '../VFSContext';
import { useOS } from '../OSContext';
import { cn } from '../lib/utils';
import { VFSFile } from '../types';

export default function FilesApp() {
  const { files, deleteFile } = useVFS();
  const { openApp, showConfirm, showToast } = useOS();
  const [search, setSearch] = useState('');

  const filteredFiles = (Object.values(files) as VFSFile[]).filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image size={24} className="text-green-500" />;
      case 'json': return <FileJson size={24} className="text-purple-500" />;
      default: return <FileText size={24} className="text-blue-500" />;
    }
  };

  const handleFileClick = (name: string) => {
    const file = files[name];
    if (file.type === 'text') {
      openApp('notes');
      // In a real app, we'd pass the file to open, but for now we just switch app
      // and the user can find it there.
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca file..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex items-center gap-2 mb-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <Folder size={14} />
          <span>Memoria Interna</span>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300">
            <Folder size={80} strokeWidth={1} />
            <p className="mt-4 font-medium">Nessun file trovato</p>
          </div>
        ) : (
          filteredFiles.map(file => (
            <div 
              key={file.name}
              onClick={() => handleFileClick(file.name)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
            >
              <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-white transition-colors">
                {getIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">{file.name}</h3>
                <p className="text-xs text-slate-400 font-medium">
                  {new Date(file.updatedAt).toLocaleString()} • {file.type.toUpperCase()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    showConfirm(`Vuoi davvero eliminare "${file.name}"?`, () => {
                      deleteFile(file.name);
                      showToast('File eliminato');
                    });
                  }}
                  className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
                <ChevronRight size={18} className="text-slate-300" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
