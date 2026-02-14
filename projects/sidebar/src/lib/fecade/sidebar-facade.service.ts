import { Injectable, inject, signal, computed } from '@angular/core';
import { merge } from 'lodash-es';
import { MenuItem, SidebarNotification, SidebarMessage } from '../models/sidebar-models';
import { SidebarConfigModel } from '../models/sidebar-input-model';
import { SIDEBAR_DEFAULT_CONFIG } from '../models/sidebar-defaults';
import { SIDEBAR_CONFIG, SIDEBAR_DATA_SOURCE } from '../tokens/sidebar-options.token';

@Injectable({ providedIn: 'root' })
export class SidebarFacade {
  private globalConfig = inject(SIDEBAR_CONFIG, { optional: true });
  private dataSource = inject(SIDEBAR_DATA_SOURCE, { optional: true });

  private overrides = signal<Partial<SidebarConfigModel>>({});

  private menus = signal<MenuItem[]>([]);
  private notifications = signal<SidebarNotification[]>([]);
  private messages = signal<SidebarMessage[]>([]);

  constructor() {
    if (this.dataSource) {
      this.dataSource.menus().subscribe((m) => this.menus.set(m ?? []));
      this.dataSource.notifications().subscribe((n) => this.notifications.set(n ?? []));
      this.dataSource.messages().subscribe((msg) => this.messages.set(msg ?? []));
    }
  }

  setOverrides(config: Partial<SidebarConfigModel>) {
    this.overrides.set(config ?? {});
  }

  readonly config = computed<SidebarConfigModel>(() => {
    return merge({}, SIDEBAR_DEFAULT_CONFIG, this.globalConfig ?? {}, this.overrides());
  });

  readonly data = computed(() => ({
    menus: this.menus(),
    notifications: this.notifications(),
    messages: this.messages(),
  }));
}
