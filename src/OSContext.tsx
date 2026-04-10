import React, { createContext, useContext, useState, useCallback } from 'react';
import { OSState } from './types';
import { DEFAULT_WALLPAPER } from './lib/utils';

interface OSContextType extends OSState {
  openApp: (id: string) => void;
  closeApp: () => void;
  setWallpaper: (url: string) => void;
  toggleLock: () => void;
  showToast: (message: string) => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
  toggleRecents: () => void;
  isRecentsOpen: boolean;
  toast: string | null;
  confirmDialog: { message: string, onConfirm: () => void } | null;
  setConfirmDialog: (val: any) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OSState>({
    activeAppId: null,
    recentApps: [],
    wallpaper: DEFAULT_WALLPAPER,
    isLocked: false,
  });

  const [toast, setToast] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, onConfirm: () => void } | null>(null);
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    setConfirmDialog({ message, onConfirm });
  }, []);

  const toggleRecents = useCallback(() => {
    setIsRecentsOpen(prev => !prev);
  }, []);

  const openApp = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      activeAppId: id,
      recentApps: [id, ...prev.recentApps.filter(a => a !== id)].slice(0, 5),
    }));
    setIsRecentsOpen(false);
  }, []);

  const closeApp = useCallback(() => {
    setState(prev => ({ ...prev, activeAppId: null }));
    setIsRecentsOpen(false);
  }, []);

  const setWallpaper = useCallback((url: string) => {
    setState(prev => ({ ...prev, wallpaper: url }));
  }, []);

  const toggleLock = useCallback(() => {
    setState(prev => ({ ...prev, isLocked: !prev.isLocked }));
  }, []);

  return (
    <OSContext.Provider value={{ 
      ...state, 
      openApp, 
      closeApp, 
      setWallpaper, 
      toggleLock, 
      showToast, 
      showConfirm, 
      toast, 
      confirmDialog, 
      setConfirmDialog,
      toggleRecents,
      isRecentsOpen
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within OSProvider');
  return context;
}
