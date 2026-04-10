import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, FileText, ChevronLeft } from 'lucide-react';
import { useVFS } from '../hooks/useVFS';
import { cn } from '../lib/utils';
import { VFSFile } from '../types';

export default function NotesApp() {
  const { files, writeFile, deleteFile } = useVFS();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingFileName, setEditingFileName] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const noteFiles = (Object.values(files) as VFSFile[]).filter(f => f.type === 'text');

  const startNew = () => {
    setEditingFileName(null);
    setTitle('');
    setContent('');
    setIsEditorOpen(true);
  };

  const openFile = (name: string) => {
    const file = files[name];
    if (file) {
      setEditingFileName(name);
      setTitle(file.name.replace('.txt', ''));
      setContent(file.content);
      setIsEditorOpen(true);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Inserisci un titolo');
      return;
    }
    const fileName = title.endsWith('.txt') ? title : `${title}.txt`;
    
    // Se stiamo rinominando un file esistente, cancelliamo il vecchio
    if (editingFileName && editingFileName !== fileName) {
      deleteFile(editingFileName);
    }

    writeFile(fileName, content);
    setEditingFileName(fileName);
    alert('Salvato!');
  };

  if (isEditorOpen) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft size={20} />
          </button>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo della nota..."
            className="flex-1 mx-4 font-bold text-lg border-none focus:ring-0 outline-none"
          />
          <button onClick={handleSave} className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600 transition-colors">
            <Save size={18} />
            <span className="hidden sm:inline">Salva</span>
          </button>
        </div>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Inizia a scrivere..."
          className="flex-1 p-6 resize-none border-none focus:ring-0 outline-none text-slate-700 leading-relaxed text-lg"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Le mie Note</h1>
        <button onClick={startNew} className="bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-transform active:scale-95">
          <Plus size={24} />
        </button>
      </div>

      {noteFiles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
          <FileText size={64} strokeWidth={1} />
          <p>Nessuna nota salvata. Crea la tua prima nota!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pb-20">
          {noteFiles.map(file => (
            <div 
              key={file.name}
              onClick={() => openFile(file.name)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-yellow-400 cursor-pointer transition-all group relative"
            >
              <h3 className="font-bold text-slate-800 mb-2 truncate pr-8">{file.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{file.content || 'Nessun contenuto'}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  {new Date(file.updatedAt).toLocaleDateString()}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteFile(file.name); }}
                  className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
