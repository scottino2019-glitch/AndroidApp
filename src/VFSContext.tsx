import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { VFSFile } from './types';

interface VFSContextType {
  files: Record<string, VFSFile>;
  writeFile: (name: string, content: string, type?: VFSFile['type']) => void;
  deleteFile: (name: string) => void;
  clearStorage: () => void;
}

const VFSContext = createContext<VFSContextType | undefined>(undefined);
const STORAGE_KEY = 'droidweb_vfs';

export function VFSProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<Record<string, VFSFile>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFiles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse VFS', e);
      }
    }
  }, []);

  const saveFiles = useCallback((newFiles: Record<string, VFSFile>) => {
    setFiles(newFiles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
  }, []);

  const writeFile = useCallback((name: string, content: string, type: VFSFile['type'] = 'text') => {
    const now = Date.now();
    setFiles(prev => {
      const newFiles = {
        ...prev,
        [name]: {
          name,
          content,
          type,
          createdAt: prev[name]?.createdAt || now,
          updatedAt: now,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
      return newFiles;
    });
  }, []);

  const deleteFile = useCallback((name: string) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[name];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
      return newFiles;
    });
  }, []);

  const clearStorage = useCallback(() => {
    setFiles({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <VFSContext.Provider value={{ files, writeFile, deleteFile, clearStorage }}>
      {children}
    </VFSContext.Provider>
  );
}

export function useVFS() {
  const context = useContext(VFSContext);
  if (!context) throw new Error('useVFS must be used within VFSProvider');
  return context;
}
