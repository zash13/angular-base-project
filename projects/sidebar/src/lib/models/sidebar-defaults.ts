import { SidebarConfigModel } from './sidebar-input-model';

export const SIDEBAR_DEFAULT_CONFIG: SidebarConfigModel = {
  layout: {
    width: 260,
    collapsedWidth: 80,
    position: 'left',
  },
  features: {
    search: true,
    profile: true,
    notifications: true,
    messages: true,
    toggleButton: true,
  },
  theme: {
    mode: 'light',
  },
};
