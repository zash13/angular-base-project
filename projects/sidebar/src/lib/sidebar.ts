import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// import child components
import { HeaderComponent } from './internals/header/header';
import { ProfileComponent } from './internals/profile/profile';
import { SearchComponent } from './internals/search/search';
import { MenuComponent as SidebarMenuComponent } from './internals/menu/menu';
import { FooterComponent } from './internals/footer/footer';

import { SIDEBAR_DATA_SOURCE } from './sidebar-tokens';
import { SidebarDataSource } from './contracts/sidebar-data-source';
import { SidebarMaterialModule } from './sidebar-material.module';
// import interfaces and services
import {
  MenuItem,
  SidebarConfig,
  UserProfile,
  LogoConfig,
  SidebarMessage,
  SidebarNotification,
} from './models/sidebar-models';
import {
  SidebarTheme,
  SidebarThemeConfig,
  SidebarThemePreset,
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME
} from './models/sidebar-theme';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarMaterialModule,
    HeaderComponent,
    ProfileComponent,
    SearchComponent,
    SidebarMenuComponent,
    FooterComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions = new Subscription();
  private dataSource: SidebarDataSource;

  @Input() menus: MenuItem[] = [];
  @Input() config: Partial<SidebarConfig> = {
    width: 260,
    collapsedWidth: 80,
    collapsed: false,
    animate: true,
    footerCollapsedMode: 'single',
    collapsedFooterButton: 'logout',
  };

  @Input() themeConfig: SidebarThemeConfig = { preset: 'light' };
  @Input() darkMode?: boolean; // Legacy boolean support
  @Input() customTheme?: Partial<SidebarTheme>;

  @Input() user!: UserProfile;
  @Input() logo!: LogoConfig;

  @Input() showSearch = true;
  @Input() showProfile = true;
  @Input() showNotifications = true;
  @Input() showMessages = true;

  @Output() menuItemClicked = new EventEmitter<MenuItem>();
  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() logoutClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() notificationClicked = new EventEmitter<SidebarNotification>();
  @Output() messageClicked = new EventEmitter<SidebarMessage>();
  @Output() sidebarToggleRequested = new EventEmitter<void>();

  requestToggle() {
    this.sidebarToggleRequested.emit();
  }
  searchText: string = '';

  isMobile = false;
  notifications: SidebarNotification[] = [];
  messages: SidebarMessage[] = [];

  unreadNotificationsCount = 0;
  unreadMessagesCount = 0;
  constructor(
    @Inject(SIDEBAR_DATA_SOURCE) private _dataSource: SidebarDataSource,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = _dataSource;
  }

  // ---------------- lifecycle ----------------

  ngOnInit() {
    this.checkMobile();
    this.loadData();
    this.config = {
      footerCollapsedMode: 'all',
      collapsedFooterButton: 'logout',
      ...this.config,
    };
    this.applyTheme();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // ---------------- data ----------------

  private loadData() {
    // menus are OPTIONAL input
    if (!this.menus.length) {
      this.subscriptions.add(this.dataSource.menus().subscribe((menus) => (this.menus = menus)));
    }

    this.subscriptions.add(
      this.dataSource.notifications().subscribe((n) => {
        this.notifications = n;
        this.updateUnreadCounts();
      }),
    );

    this.subscriptions.add(
      this.dataSource.messages().subscribe((m) => {
        this.messages = m;
        this.updateUnreadCounts();
      }),
    );
  }

  // ---------------- UI actions ----------------

  toggleSidebar() {
    console.log('sidebarToggled');
    this.config.collapsed = !this.config.collapsed;
    this.sidebarToggled.emit(this.config.collapsed);
  }

  onNotificationClick(notification: SidebarNotification) {
    this.notificationClicked.emit(notification);
    this.dataSource.markNotificationAsRead(notification.id.toString());
  }

  onMessageClick(message: SidebarMessage) {
    this.messageClicked.emit(message);
    this.dataSource.markMessageAsRead(message.id.toString());
  }

  onSearch(value: string) {
    this.searchChanged.emit(value);
  }

  onLogout() {
    this.logoutClicked.emit();
  }

  // ---------------- helpers ----------------

  private updateUnreadCounts() {
    this.unreadNotificationsCount = this.notifications.filter((n) => !n.read).length;
    this.unreadMessagesCount = this.messages.filter((m) => !m.read).length;
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.config.collapsed = true;
    }
  }

  get sidebarWidth() {
    return this.config.collapsed
      ? `${this.config.collapsedWidth ?? 80}px`
      : `${this.config.width ?? 260}px`;
  }

  getFooterConfig() {
    return {
      collapsed: this.config?.collapsed ?? false,
      footerCollapsedMode: this.config?.footerCollapsedMode ?? 'all',
      collapsedFooterButton: this.config?.collapsedFooterButton ?? 'logout',
    };
  }

  // ---------------- Theme Management ----------------

  private _currentTheme: SidebarTheme = DEFAULT_LIGHT_THEME;

  get currentTheme(): SidebarTheme {
    return this._currentTheme;
  }

  private applyTheme() {
    // Determine which theme to use
    if (this.darkMode !== undefined) {
      // Legacy boolean support
      this._currentTheme = this.darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    } else if (this.themeConfig?.darkMode !== undefined) {
      // Config-based boolean support
      this._currentTheme = this.themeConfig.darkMode ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
    } else if (this.themeConfig?.preset) {
      // Preset-based support
      this._currentTheme = this.themeConfig.preset === 'light' ? DEFAULT_LIGHT_THEME : DEFAULT_DARK_THEME;
    } else {
      // Default to light theme
      this._currentTheme = DEFAULT_LIGHT_THEME;
    }

    // Apply custom theme overrides if provided
    if (this.themeConfig?.customTheme || this.customTheme) {
      this._currentTheme = {
        ...this._currentTheme,
        ...this.themeConfig?.customTheme,
        ...this.customTheme
      };
    }
  }

  getThemeCssVariables(): { [key: string]: string } {
    return {
      '--sidebar-background': this._currentTheme.background,
      '--sidebar-surface': this._currentTheme.surface,
      '--sidebar-primary': this._currentTheme.primary,
      '--sidebar-text': this._currentTheme.text,
      '--sidebar-text-secondary': this._currentTheme.textSecondary,
      '--sidebar-border': this._currentTheme.border,
      '--sidebar-hover': this._currentTheme.hover,
      '--sidebar-active': this._currentTheme.active,
      '--sidebar-header-background': this._currentTheme.headerBackground || this._currentTheme.background,
      '--sidebar-header-text': this._currentTheme.headerText || this._currentTheme.textSecondary,
      '--sidebar-profile-background': this._currentTheme.profileBackground || this._currentTheme.surface,
      '--sidebar-search-background': this._currentTheme.searchBackground || 'transparent',
      '--sidebar-search-border': this._currentTheme.searchBorder || this._currentTheme.border,
      '--sidebar-success': this._currentTheme.success,
      '--sidebar-warning': this._currentTheme.warning,
      '--sidebar-error': this._currentTheme.error,
      '--sidebar-info': this._currentTheme.info,
      '--sidebar-shadow-color': this._currentTheme.shadowColor,
      '--sidebar-transition-duration': this._currentTheme.transitionDuration
    };
  }

  // Update theme dynamically
  updateTheme(themeConfig: Partial<SidebarThemeConfig>) {
    this.themeConfig = { ...this.themeConfig, ...themeConfig };
    this.applyTheme();
    this.cdr.markForCheck();
  }

  // Trigger change detection when theme inputs change
  ngOnChanges() {
    this.applyTheme();
    this.cdr.markForCheck();
  }
}
