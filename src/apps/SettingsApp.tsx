import React from 'react';
import { Palette, Trash2, Info, Shield, ChevronRight, Monitor } from 'lucide-react';
import { useOS } from '../OSContext';
import { useVFS } from '../hooks/useVFS';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2658&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop',
];

export default function SettingsApp() {
  const { wallpaper, setWallpaper } = useOS();
  const { clearStorage } = useVFS();

  const handleReset = () => {
    if (confirm('Sei sicuro di voler cancellare tutti i file? Questa azione è irreversibile.')) {
      clearStorage();
      alert('Sistema ripristinato.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-6 bg-white border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Impostazioni</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        {/* Personalizzazione */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <Palette size={14} />
            <span>Personalizzazione</span>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-3">Sfondo</p>
              <div className="grid grid-cols-3 gap-2">
                {WALLPAPERS.map((url, i) => (
                  <button 
                    key={i}
                    onClick={() => setWallpaper(url)}
                    className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${wallpaper === url ? 'border-blue-500 scale-95' : 'border-transparent'}`}
                  >
                    <img src={url} alt={`Wallpaper ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sistema */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <Monitor size={14} />
            <span>Sistema</span>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm divide-y divide-slate-100">
            <button 
              onClick={handleReset}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 text-red-500 rounded-xl">
                  <Trash2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Ripristina Dati</p>
                  <p className="text-xs text-slate-400">Cancella tutti i file salvati</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Sicurezza</p>
                  <p className="text-xs text-slate-400">Crittografia locale attiva</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <Info size={14} />
            <span>Informazioni</span>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Monitor size={40} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">DroidWeb OS</h2>
            <p className="text-sm text-slate-400 mb-4">Versione 1.0.0 (Beta)</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Un ambiente di lavoro moderno ispirato ad Android, costruito con React e Tailwind CSS.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
