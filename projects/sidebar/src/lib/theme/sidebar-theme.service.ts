import { Injectable, computed } from '@angular/core';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, SidebarTheme } from '../models/sidebar-theme';
import { SidebarFacade } from '../fecade/sidebar-facade.service';

@Injectable({ providedIn: 'root' })
export class SidebarThemeService {
  constructor(private facade: SidebarFacade) {}

  readonly theme = computed<SidebarTheme>(() => {
    const config = this.facade.config();
    const mode = config.theme?.mode ?? 'light';

    const baseTheme = mode === 'dark' ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;

    // apply optional custom theme overrides
    return {
      ...baseTheme,
      ...(config.theme?.custom ?? {}),
    };
  });

  readonly cssVariables = computed(() => {
    const t = this.theme();
    return {
      '--sidebar-background': t.background,
      '--sidebar-surface': t.surface,
      '--sidebar-primary': t.primary,
      '--sidebar-text': t.text,
      '--sidebar-text-secondary': t.textSecondary,
      '--sidebar-border': t.border,
      '--sidebar-hover': t.hover,
      '--sidebar-active': t.active,
      '--sidebar-header-background': t.headerBackground,
      '--sidebar-header-text': t.headerText,
      '--sidebar-profile-background': t.profileBackground,
      '--sidebar-search-background': t.searchBackground,
      '--sidebar-search-border': t.searchBorder,
      '--sidebar-success': t.success,
      '--sidebar-warning': t.warning,
      '--sidebar-error': t.error,
      '--sidebar-info': t.info,
      '--sidebar-shadow-color': t.shadowColor,
      '--sidebar-transition-duration': t.transitionDuration,
      '--sidebar-font-family': 'var(--app-font-family, "Vazirmatn", Tahoma, sans-serif)',
    };
  });
}
