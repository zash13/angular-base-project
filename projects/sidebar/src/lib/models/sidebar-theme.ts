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
  background: '#1d1d1d',
  surface: '#2b2b2b',
  primary: '#6366f1',
  text: '#bdbdbd',
  textSecondary: '#6c7b88',
  border: '#2b2b2b',
  hover: 'rgba(255, 255, 255, 0.1)',
  active: 'rgba(255, 255, 255, 0.15)',
  headerBackground: '#1d1d1d',
  headerText: '#6c7b88',
  profileBackground: '#2b2b2b',
  searchBackground: 'transparent',
  searchBorder: '#2b2b2b',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  transitionDuration: '0.3s',
};

export const DEFAULT_LIGHT_THEME: SidebarTheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#6366f1',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  hover: 'rgba(99, 102, 241, 0.1)',
  active: 'rgba(99, 102, 241, 0.15)',
  headerBackground: '#ffffff',
  headerText: '#6b7280',
  profileBackground: '#f8f9fa',
  searchBackground: 'transparent',
  searchBorder: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  transitionDuration: '0.3s',
};

export type SidebarThemePreset = 'dark' | 'light' | 'custom';

export interface SidebarThemeConfig {
  preset?: SidebarThemePreset;
  customTheme?: Partial<SidebarTheme>;
  darkMode?: boolean; // Legacy boolean support
}
