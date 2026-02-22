import { LogoConfig, UserProfile, FooterItem, ToggleButtonIcons } from './sidebar-models';
import { SidebarTheme } from './sidebar-theme';

export interface SidebarConfigModel {
  layout?: SidebarLayoutOptions;
  features?: SidebarFeatureOptions;
  branding?: SidebarBranding;
  user?: UserProfile;
  theme?: SidebarThemeOptions;
}

export interface SidebarThemeOptions {
  mode?: 'light' | 'dark' | 'auto';
  custom?: Partial<SidebarTheme>;
}
export interface SidebarBranding {
  logo?: LogoConfig;
}
export interface SidebarFeatureOptions {
  search?: boolean;
  profile?: boolean;
  notifications?: boolean;
  messages?: boolean;
  footerItems?: FooterItem[];
  footerMode?: 'all' | 'single' | 'none';
  collapsedFooterButton?: 'notifications' | 'messages' | 'settings' | 'logout';
  toggleButton?: boolean;
  toggleButtonIcons?: ToggleButtonIcons;
}
export interface SidebarLayoutOptions {
  width?: number;
  collapsedWidth?: number;
  position?: 'left' | 'right';
  collapsed?: boolean;
  rtl?: boolean;
  backdrop?: boolean;
}
