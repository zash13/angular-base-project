import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HeaderComponent } from './internals/header/header';
import { ProfileComponent } from './internals/profile/profile';
import { SearchComponent } from './internals/search/search';
import { MenuComponent as SidebarMenuComponent } from './internals/menu/menu';
import { FooterComponent } from './internals/footer/footer';

import { SidebarState } from './state/sidebar-state';
import { SidebarThemeService } from './theme/sidebar-theme.service';
import { SidebarConfigModel } from './models/sidebar-input-model';
import { SidebarFacade } from './fecade/sidebar-facade.service';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    HeaderComponent,
    ProfileComponent,
    SearchComponent,
    SidebarMenuComponent,
    FooterComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  // Only keep state local
  providers: [SidebarState],
})
export class SidebarComponent implements OnChanges {
  @Input() overrides?: Partial<SidebarConfigModel>;

  @Output() menuItemClicked = new EventEmitter<any>();
  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() logoutClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() notificationClicked = new EventEmitter<any>();
  @Output() messageClicked = new EventEmitter<any>();
  @Output() sidebarToggleRequested = new EventEmitter<void>();

  constructor(
    public state: SidebarState,
    public facade: SidebarFacade,
    public themeService: SidebarThemeService,
  ) {}

  ngOnChanges() {
    this.facade.setOverrides(this.overrides ?? {});
    this.state.setCollapsed(this.facade.config().layout?.collapsed ?? false);
  }

  // =========================
  // config
  // =========================

  get config() {
    return this.facade.config();
  }

  get layout() {
    return this.config.layout;
  }

  get features() {
    return this.config.features;
  }

  get user() {
    return this.config.user;
  }

  // =========================
  // data (from datasource)
  // =========================

  get menus() {
    return this.facade.data().menus;
  }

  get notifications() {
    return this.facade.data().notifications;
  }

  get messages() {
    return this.facade.data().messages;
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter((n: any) => !n.read).length;
  }

  get unreadMessagesCount(): number {
    return this.messages.filter((m: any) => !m.read).length;
  }

  // =========================
  // theme
  // =========================

  get currentTheme() {
    return this.themeService.theme();
  }

  getThemeCssVariables() {
    return this.themeService.cssVariables();
  }

  // =========================
  // state
  // =========================

  toggleSidebar() {
    this.state.toggle();
    this.sidebarToggled.emit(this.state.collapsed());
  }

  requestToggle() {
    this.sidebarToggleRequested.emit();
  }

  onSearch(value: string) {
    this.state.setSearch(value);
    this.searchChanged.emit(value);
  }

  onLogout() {
    this.logoutClicked.emit();
  }

  get isMobile() {
    return this.state.isMobile();
  }

  get searchText() {
    return this.state.searchText();
  }

  get showProfile(): boolean {
    return this.features?.profile ?? true;
  }

  get showSearch(): boolean {
    return this.features?.search ?? true;
  }

  getFooterConfig() {
    return {
      collapsed: this.state.collapsed(),
      footerCollapsedMode: this.features?.footerMode ?? 'all',
      collapsedFooterButton: this.features?.collapsedFooterButton ?? 'logout',
      rtl: this.layout?.rtl ?? false,
      position: this.layout?.position ?? 'left',
    };
  }
}
