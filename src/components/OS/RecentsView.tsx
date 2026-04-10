import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useOS } from '../../OSContext';
import { APPS } from './HomeScreen';

export default function RecentsView() {
  const { isRecentsOpen, recentApps, openApp, toggleRecents } = useOS();

  return (
    <AnimatePresence>
      {isRecentsOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex flex-col p-6"
          onClick={toggleRecents}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">App Recenti</h2>
            <button onClick={toggleRecents} className="p-2 text-white/60 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-20">
            {recentApps.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-white/40 italic">
                Nessuna app recente
              </div>
            ) : (
              recentApps.map((appId) => {
                const app = APPS.find(a => a.id === appId);
                if (!app) return null;

                return (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openApp(app.id);
                    }}
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-3xl flex items-center gap-4 text-left transition-colors border border-white/10"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${app.color} flex items-center justify-center text-white shadow-lg`}>
                      <app.icon size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold">{app.name}</p>
                      <p className="text-white/40 text-xs">Tocca per riaprire</p>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
