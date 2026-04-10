import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface AppConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  component?: React.ComponentType<any>;
  externalUrl?: string;
}

export interface VFSFile {
  name: string;
  content: string;
  type: 'text' | 'image' | 'json';
  createdAt: number;
  updatedAt: number;
}

export interface OSState {
  activeAppId: string | null;
  recentApps: string[];
  wallpaper: string;
  isLocked: boolean;
}
