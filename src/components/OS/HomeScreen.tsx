import React from 'react';
import { motion } from 'motion/react';
import { Folder, FileText, Bot, Settings, Globe } from 'lucide-react';
import { useOS } from '../../OSContext';
import { AppConfig } from '../../types';
import { APP_COLORS } from '../../lib/utils';

// App definitions
import FilesApp from '../../apps/FilesApp';
import NotesApp from '../../apps/NotesApp';
import AssistantApp from '../../apps/AssistantApp';
import SettingsApp from '../../apps/SettingsApp';
import BrowserApp from '../../apps/BrowserApp';

export const APPS: AppConfig[] = [
  { id: 'files', name: 'Files', icon: Folder, color: APP_COLORS.files, component: FilesApp },
  { id: 'notes', name: 'Note', icon: FileText, color: APP_COLORS.notes, component: NotesApp },
  { id: 'assistant', name: 'Assistant', icon: Bot, color: APP_COLORS.assistant, component: AssistantApp },
  { 
    id: 'settings', 
    name: 'Impostazioni', 
    icon: Settings, 
    color: APP_COLORS.settings, 
    component: SettingsApp 
  },
  // --- AGGIUNGI QUI LE TUE NUOVE APP ---
  // Esempio per un file locale:
  // { id: 'agenda', name: 'Agenda', icon: Globe, color: 'bg-orange-500', externalUrl: '/agenda.html' },
  { 
    id: 'wikipedia', 
    name: 'Wikipedia', 
    icon: Globe, 
    color: 'bg-slate-700', 
    externalUrl: 'https://it.m.wikipedia.org' 
  },
  { 
    id: 'google', 
    name: 'Google', 
    icon: Globe, 
    color: 'bg-blue-600', 
    externalUrl: 'https://www.google.com/search?igu=1' 
  },
];

export default function HomeScreen() {
  const { openApp } = useOS();

  return (
    <div className="flex-1 p-8 grid grid-cols-4 content-start gap-y-8">
      {APPS.map((app, i) => (
        <motion.button
          key={app.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => openApp(app.id)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-active:scale-90 transition-transform`}>
            <app.icon size={30} />
          </div>
          <span className="text-[11px] font-semibold text-white text-shadow-sm truncate w-full text-center">
            {app.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
