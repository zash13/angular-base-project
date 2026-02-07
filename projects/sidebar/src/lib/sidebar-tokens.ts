export interface SidebarTokens {}

import { InjectionToken } from '@angular/core';
import { SidebarDataSource } from './contracts/sidebar-data-source';

export const SIDEBAR_DATA_SOURCE = new InjectionToken<SidebarDataSource>('SIDEBAR_DATA_SOURCE');
