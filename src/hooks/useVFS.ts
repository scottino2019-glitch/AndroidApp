import { useState, useEffect, useCallback } from 'react';
import { VFSFile } from '../types';

const STORAGE_KEY = 'droidweb_vfs';

export function useVFS() {
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
    const newFiles = {
      ...files,
      [name]: {
        name,
        content,
        type,
        createdAt: files[name]?.createdAt || now,
        updatedAt: now,
      },
    };
    saveFiles(newFiles);
  }, [files, saveFiles]);

  const deleteFile = useCallback((name: string) => {
    const newFiles = { ...files };
    delete newFiles[name];
    saveFiles(newFiles);
  }, [files, saveFiles]);

  const clearStorage = useCallback(() => {
    saveFiles({});
  }, [saveFiles]);

  return { files, writeFile, deleteFile, clearStorage };
}
