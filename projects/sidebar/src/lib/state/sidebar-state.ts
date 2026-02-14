import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class SidebarState {
  readonly collapsed = signal(false);
  readonly isMobile = signal(false);
  readonly searchText = signal('');

  toggle() {
    this.collapsed.update((v) => !v);
  }

  setCollapsed(value: boolean) {
    this.collapsed.set(value);
  }

  setMobile(value: boolean) {
    this.isMobile.set(value);
  }

  setSearch(value: string) {
    this.searchText.set(value);
  }
}
