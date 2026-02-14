export interface SidebarTheme {
  // Core colors
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
  active: string;

  // Component specific colors
  headerBackground?: string;
  headerText?: string;
  profileBackground?: string;
  searchBackground?: string;
  searchBorder?: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Shadow colors
  shadowColor: string;

  // Animation
  transitionDuration: string;
}

export const DEFAULT_DARK_THEME: SidebarTheme = {
  background: '#0f172a', // slate-900 style deep blue-dark
  surface: '#111827', // strong separation from background
  primary: '#818cf8', // slightly brighter indigo for dark bg

  text: '#e5e7eb', // high readability
  textSecondary: '#9ca3af', // still readable but clearly secondary

  border: '#1f2937',

  hover: 'rgba(129, 140, 248, 0.12)',
  active: 'rgba(129, 140, 248, 0.22)',

  headerBackground: '#020617', // darker than body = depth
  headerText: '#cbd5f1',

  profileBackground: '#111827',

  searchBackground: 'rgba(255,255,255,0.03)',
  searchBorder: '#1f2937',

  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',

  shadowColor: 'rgba(0, 0, 0, 0.6)',
  transitionDuration: '0.25s',
};

export const DEFAULT_LIGHT_THEME: SidebarTheme = {
  background: '#f9fafb', // softer than pure white
  surface: '#ffffff',
  primary: '#6366f1',

  text: '#111827',
  textSecondary: '#6b7280',

  border: '#e5e7eb',

  hover: 'rgba(99, 102, 241, 0.08)',
  active: 'rgba(99, 102, 241, 0.16)',

  headerBackground: '#ffffff',
  headerText: '#4b5563',

  profileBackground: '#ffffff',

  searchBackground: '#f3f4f6',
  searchBorder: '#e5e7eb',

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  shadowColor: 'rgba(0, 0, 0, 0.08)',
  transitionDuration: '0.25s',
};

export type SidebarThemePreset = 'dark' | 'light' | 'custom';

export interface SidebarThemeConfig {
  preset?: SidebarThemePreset;
  customTheme?: Partial<SidebarTheme>;
  darkMode?: boolean; // Legacy boolean support
}
