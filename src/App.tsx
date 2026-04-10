import React from 'react';
import { OSProvider, useOS } from './OSContext';
import StatusBar from './components/OS/StatusBar';
import NavigationBar from './components/OS/NavigationBar';
import HomeScreen from './components/OS/HomeScreen';
import AppContainer from './components/OS/AppContainer';

function OSShell() {
  const { wallpaper } = useOS();

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

      {/* Global styles for text shadow and other Android-like effects */}
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
    <OSProvider>
      <OSShell />
    </OSProvider>
  );
}
