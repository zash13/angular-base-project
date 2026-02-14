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

import { SidebarModel } from './models/sidebar-input-model';
import { SidebarState } from './state/sidebar-state';
import { SidebarFacade } from './fecade/sidebar-facade.service';
import { SidebarThemeService } from './theme/sidebar-theme.service';

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
  providers: [SidebarState, SidebarFacade, SidebarThemeService],
})
export class SidebarComponent implements OnChanges {
  @Input({ required: true }) model!: SidebarModel;

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
    public theme: SidebarThemeService,
  ) {}

  ngOnChanges() {
    this.facade.setModel(this.model);
    this.state.setCollapsed(this.facade.resolvedModel().layout?.collapsed ?? false);
  }

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

  get resolvedModel() {
    return this.facade.resolvedModel();
  }

  get config() {
    return {
      ...this.resolvedModel.layout,
      collapsed: this.state.collapsed(),
      backdropOpacity: 0.5,
      backgroundImage: undefined,
      backdrop: this.resolvedModel.layout?.backdrop ?? false,
    };
  }

  get currentTheme() {
    return this.theme.theme();
  }

  getThemeCssVariables() {
    return this.theme.cssVariables();
  }

  getFooterConfig() {
    return {
      collapsed: this.state.collapsed(),
      footerCollapsedMode: this.resolvedModel.features?.footerMode ?? 'all',
      collapsedFooterButton: this.resolvedModel.features?.collapsedFooterButton ?? 'logout',
      rtl: this.resolvedModel.layout?.rtl ?? false,
      position: this.resolvedModel.layout?.position ?? 'left',
    };
  }

  get showProfile(): boolean {
    return this.resolvedModel.features?.profile ?? true;
  }

  get showSearch(): boolean {
    return !(this.resolvedModel.features?.search ?? true);
  }

  get user() {
    return this.resolvedModel.user;
  }

  get menus() {
    return this.resolvedModel.data?.menus ?? [];
  }

  get notifications() {
    return this.resolvedModel.data?.notifications ?? [];
  }

  get messages() {
    return this.resolvedModel.data?.messages ?? [];
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter((n: any) => !n.read).length;
  }

  get unreadMessagesCount(): number {
    return this.messages.filter((m: any) => !m.read).length;
  }

  get isMobile() {
    return this.state.isMobile();
  }

  get searchText() {
    return this.state.searchText();
  }
}
