import { InjectionToken } from '@angular/core';
import { SidebarConfigModel } from '../models/sidebar-input-model';
import { SidebarDataSource } from '../contracts/sidebar-data-source';

export const SIDEBAR_CONFIG = new InjectionToken<Partial<SidebarConfigModel>>('SIDEBAR_CONFIG');

export const SIDEBAR_DATA_SOURCE = new InjectionToken<SidebarDataSource>('SIDEBAR_DATA_SOURCE');
