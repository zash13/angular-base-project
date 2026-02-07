import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// import child components
import { HeaderComponent } from './internals/header/header';
import { ProfileComponent } from './internals/profile/profile';
import { SearchComponent } from './internals/search/search';
import { MenuComponent as SidebarMenuComponent } from './internals/menu/menu';
import { FooterComponent } from './internals/footer/footer';

// import interfaces and services
import {
  MenuItem,
  SidebarConfig,
  UserProfile,
  LogoConfig,
  SidebarMessage,
  SidebarNotification,
} from './models/sidebar-models';

import { SIDEBAR_DATA_SOURCE } from './sidebar-tokens';
import { SidebarDataSource } from './contracts/sidebar-data-source';
import { SidebarMaterialModule } from './sidebar-material.module';
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
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private dataSource: SidebarDataSource;

  @Input() menus: MenuItem[] = [];
  @Input() config: Partial<SidebarConfig> = {
    width: 260,
    collapsedWidth: 80,
    collapsed: false,
    animate: true,
  };

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

  searchText: string = '';

  isMobile = false;
  notifications: SidebarNotification[] = [];
  messages: SidebarMessage[] = [];

  unreadNotificationsCount = 0;
  unreadMessagesCount = 0;
  constructor(@Inject(SIDEBAR_DATA_SOURCE) private _dataSource: SidebarDataSource) {
    this.dataSource = _dataSource;
  }

  // ---------------- lifecycle ----------------

  ngOnInit() {
    this.checkMobile();
    this.loadData();
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
}
