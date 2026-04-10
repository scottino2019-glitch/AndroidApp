import React from 'react';
import { OSProvider, useOS } from './OSContext';
import { VFSProvider } from './VFSContext';
import StatusBar from './components/OS/StatusBar';
import NavigationBar from './components/OS/NavigationBar';
import HomeScreen from './components/OS/HomeScreen';
import AppContainer from './components/OS/AppContainer';
import RecentsView from './components/OS/RecentsView';

function OSShell() {
  const { wallpaper, toast, confirmDialog, setConfirmDialog } = useOS();

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Overlay to make icons readable */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative h-full flex flex-col">
        <StatusBar />
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          <HomeScreen />
          <AppContainer />
        </main>

        <NavigationBar />
      </div>

      <RecentsView />

      {/* Toast Notification */}
      <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 text-white text-sm rounded-full transition-all duration-300 z-[100] ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {toast}
      </div>

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[110] p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Conferma</h3>
            <p className="text-slate-600 mb-6">{confirmDialog.message}</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 text-slate-500 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
              >
                Annulla
              </button>
              <button 
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog(null);
                }}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles */}
      <style>{`
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        * {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        input, textarea {
          user-select: text;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <VFSProvider>
      <OSProvider>
        <OSShell />
      </OSProvider>
    </VFSProvider>
  );
}
