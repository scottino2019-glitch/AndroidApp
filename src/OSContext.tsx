import React, { createContext, useContext, useState, useCallback } from 'react';
import { OSState } from './types';
import { DEFAULT_WALLPAPER } from './lib/utils';

interface OSContextType extends OSState {
  openApp: (id: string) => void;
  closeApp: () => void;
  setWallpaper: (url: string) => void;
  toggleLock: () => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OSState>({
    activeAppId: null,
    recentApps: [],
    wallpaper: DEFAULT_WALLPAPER,
    isLocked: false,
  });

  const openApp = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      activeAppId: id,
      recentApps: [id, ...prev.recentApps.filter(a => a !== id)].slice(0, 5),
    }));
  }, []);

  const closeApp = useCallback(() => {
    setState(prev => ({ ...prev, activeAppId: null }));
  }, []);

  const setWallpaper = useCallback((url: string) => {
    setState(prev => ({ ...prev, wallpaper: url }));
  }, []);

  const toggleLock = useCallback(() => {
    setState(prev => ({ ...prev, isLocked: !prev.isLocked }));
  }, []);

  return (
    <OSContext.Provider value={{ ...state, openApp, closeApp, setWallpaper, toggleLock }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within OSProvider');
  return context;
}
