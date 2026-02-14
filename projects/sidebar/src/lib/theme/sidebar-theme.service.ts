import { Injectable, computed } from '@angular/core';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, SidebarTheme } from '../models/sidebar-theme';
import { SidebarFacade } from '../fecade/sidebar-facade.service';

@Injectable()
export class SidebarThemeService {
  constructor(private facade: SidebarFacade) {}

  readonly theme = computed<SidebarTheme>(() => {
    const mode = this.facade.resolvedModel().theme?.mode ?? 'light';
    return mode === 'dark' ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
  });

  readonly cssVariables = computed(() => {
    const t = this.theme();
    return {
      '--sidebar-background': t.background,
      '--sidebar-surface': t.surface,
      '--sidebar-primary': t.primary,
      '--sidebar-text': t.text,
      '--sidebar-border': t.border,
    };
  });
}
