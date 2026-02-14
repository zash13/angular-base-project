import { InjectionToken } from '@angular/core';
import { SidebarModel } from '../models/sidebar-input-model';

export const SIDEBAR_GLOBAL_OPTIONS = new InjectionToken<SidebarModel>('SIDEBAR_GLOBAL_OPTIONS');

export const SIDEBAR_DEFAULT_OPTIONS: SidebarModel = {
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
  },
  theme: {
    mode: 'light',
  },
};
