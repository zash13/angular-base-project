import {
  LogoConfig,
  MenuItem,
  SidebarMessage,
  SidebarNotification,
  UserProfile,
} from './sidebar-models';
import { SidebarTheme } from './sidebar-theme';

export interface SidebarModel {
  layout?: SidebarLayoutOptions;
  features?: SidebarFeatureOptions;
  branding?: SidebarBranding;
  user?: UserProfile;
  data?: SidebarData;
  theme?: SidebarThemeOptions;
}

export interface SidebarThemeOptions {
  mode?: 'light' | 'dark' | 'auto';
  custom?: Partial<SidebarTheme>;
}
export interface SidebarData {
  menus: MenuItem[];
  notifications?: SidebarNotification[];
  messages?: SidebarMessage[];
}
export interface SidebarBranding {
  logo?: LogoConfig;
}
export interface SidebarFeatureOptions {
  search?: boolean;
  profile?: boolean;
  notifications?: boolean;
  messages?: boolean;
  footerMode?: 'all' | 'single' | 'none';
  collapsedFooterButton?: 'notifications' | 'messages' | 'settings' | 'logout';
}
export interface SidebarLayoutOptions {
  width?: number;
  collapsedWidth?: number;
  position?: 'left' | 'right';
  collapsed?: boolean;
  rtl?: boolean;
  backdrop?: boolean;
}
