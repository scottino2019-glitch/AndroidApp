import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_WALLPAPER = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

export const APP_COLORS = {
  files: 'bg-blue-500',
  notes: 'bg-yellow-500',
  assistant: 'bg-purple-500',
  settings: 'bg-gray-500',
  gallery: 'bg-green-500',
};
