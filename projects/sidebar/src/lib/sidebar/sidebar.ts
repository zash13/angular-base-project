import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

// import child components
import { HeaderComponent } from '../internals/header/header';
import { ProfileComponent } from '../internals/profile/profile';
import { SearchComponent } from '../internals/search/search';
import { MenuComponent as SidebarMenuComponent } from '../internals/menu/menu';
import { FooterComponent } from '../internals/footer/footer';

// import interfaces and services
import {
  MenuItem,
  SidebarConfig,
  UserProfile,
  LogoConfig,
  SidebarMessage,
  SidebarNotification,
} from '../models/sidebar-models';
import { MatExpansionPanelTitle, MatExpansionPanelHeader } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { SIDEBAR_DATA_SOURCE } from '../sidebar-tokens';
import { SidebarDataSource } from '../contracts/sidebar-data-source';
@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    MatChipsModule,
    RouterModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule,
    HeaderComponent,
    ProfileComponent,
    SearchComponent,
    SidebarMenuComponent,
    FooterComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  animations: [
    trigger('sidebarToggle', [
      state(
        'collapsed',
        style({
          transform: 'translateX(-100%)',
          width: '0',
          minWidth: '0',
          opacity: 0,
          visibility: 'hidden',
        }),
      ),
      state(
        'expanded',
        style({
          transform: 'translateX(0)',
          width: '{{width}}',
          minWidth: '{{width}}',
          opacity: 1,
          visibility: 'visible',
        }),
        { params: { width: '260px' } },
      ),
      transition('collapsed <=> expanded', [animate('{{duration}}ms {{easing}}')], {
        params: { duration: 300, easing: 'ease-in-out' },
      }),
    ]),
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private dataSource: SidebarDataSource = inject(SIDEBAR_DATA_SOURCE);
  private subscriptions = new Subscription();

  @Input() menus: MenuItem[] = [];
  @Input() config: Partial<SidebarConfig> = {
    width: 260,
    collapsedWidth: 80,
    collapsed: false,
    animate: true,
    animationDuration: 300,
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
