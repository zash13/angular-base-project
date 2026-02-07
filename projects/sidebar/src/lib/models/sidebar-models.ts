export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  type: 'link' | 'dropdown' | 'header' | 'divider';
  active?: boolean;
  badge?: {
    text: string;
    class: 'badge-danger' | 'badge-success' | 'badge-warning' | 'badge-info' | 'badge-primary';
  };
  submenus?: MenuItem[];
  routerLink?: string | any[];
  externalLink?: string;
  disabled?: boolean;
  permissions?: string[];
  order?: number;
}

export interface SidebarConfig {
  width: number;
  collapsedWidth: number;
  position: 'left' | 'right';
  collapsed: boolean;
  backdrop: boolean;
  backdropOpacity: number;
  closeOnClickOutside: boolean;
  animate: boolean;
  animationDuration: number;
  theme: 'dark' | 'light' | 'auto';
  rtl: boolean;
  backgroundImage?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  avatar: string;
  email?: string;
}

export interface LogoConfig {
  text: string;
  url: string;
  icon?: string;
  image?: string;
}

export interface SidebarNotification {
  id: string | number;
  title: string;
  message: string;
  icon: string;
  iconColor: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface SidebarMessage {
  id: string | number;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  read: boolean;
}
