import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
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

  providers: [SidebarState],
})
export class SidebarComponent implements OnChanges {
  @Input() overrides?: Partial<SidebarConfigModel>;
  @Input() collapsed?: boolean;

  @Output() menuItemClicked = new EventEmitter<any>();
  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() logoutClicked = new EventEmitter<void>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() notificationClicked = new EventEmitter<any>();
  @Output() messageClicked = new EventEmitter<any>();
  @Output() sidebarToggleRequested = new EventEmitter<void>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  private _previousCollapsed: boolean | undefined;

  constructor(
    public state: SidebarState,
    public facade: SidebarFacade,
    public themeService: SidebarThemeService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['overrides']) {
      this.facade.setOverrides(this.overrides ?? {});
    }
    
    const configCollapsed = this.facade.config().layout?.collapsed;
    const inputCollapsed = changes['collapsed']?.currentValue;
    
    if (changes['collapsed'] && inputCollapsed !== undefined) {
      if (inputCollapsed !== this._previousCollapsed) {
        this.state.setCollapsed(inputCollapsed);
        this._previousCollapsed = inputCollapsed;
      }
    } else if (changes['overrides'] && configCollapsed !== undefined) {
      if (configCollapsed !== this._previousCollapsed) {
        this.state.setCollapsed(configCollapsed);
        this._previousCollapsed = configCollapsed;
      }
    }
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
    const newCollapsed = !this.state.collapsed();
    this.setCollapsedState(newCollapsed);
  }

  setCollapsedState(value: boolean) {
    this.state.setCollapsed(value);
    this._previousCollapsed = value;
    this.sidebarToggled.emit(value);
    this.collapsedChange.emit(value);
  }

  onSidebarContentClick() {
    if (this.state.collapsed()) {
      this.setCollapsedState(false);
    }
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

  get showToggleButton(): boolean {
    return this.features?.toggleButton ?? true;
  }

  get isRtl(): boolean {
    return this.layout?.rtl ?? this.layout?.position === 'right';
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
