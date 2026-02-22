import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarNotification, SidebarMessage, SidebarConfig, FooterItem } from '../../models/sidebar-models';
@Component({
  selector: 'lib-sidebar-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  @Input() unreadNotificationsCount = 0;
  @Input() unreadMessagesCount = 0;
  @Input() notifications: SidebarNotification[] = [];
  @Input() messages: SidebarMessage[] = [];
  @Input() config: Partial<SidebarConfig> = {};
  @Output() logoutClicked = new EventEmitter<void>();

  showNotifications = false;
  showMessages = false;
  showSettings = false;

  get isCollapsed(): boolean {
    return this.config.collapsed ?? false;
  }

  get showSingleButton(): boolean {
    return this.config.footerCollapsedMode === 'single' && this.isCollapsed;
  }

  get showButton(): 'notifications' | 'messages' | 'settings' | 'logout' {
    return this.config.collapsedFooterButton || 'logout';
  }

  get visibleFooterItems(): FooterItem[] {
    const defaultItems: FooterItem[] = ['notifications', 'messages', 'settings', 'logout'];
    const configured = this.config.footerItems;
    if (!configured || configured.length === 0) {
      return defaultItems;
    }
    return configured;
  }

  isFooterItemVisible(item: FooterItem): boolean {
    return this.visibleFooterItems.includes(item);
  }

  shouldShowButton(buttonType: string): boolean {
    if (!this.isCollapsed) return true;
    if (this.config.footerCollapsedMode === 'all') return true;
    if (this.config.footerCollapsedMode === 'none') return false;
    return this.showButton === buttonType;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showMessages = false;
      this.showSettings = false;
    }
  }

  toggleMessages() {
    this.showMessages = !this.showMessages;
    if (this.showMessages) {
      this.showNotifications = false;
      this.showSettings = false;
    }
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
    if (this.showSettings) {
      this.showNotifications = false;
      this.showMessages = false;
    }
  }

  closeAllDropdowns() {
    this.showNotifications = false;
    this.showMessages = false;
    this.showSettings = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-btn') && !target.closest('.notifications-dropdown')) {
      this.showNotifications = false;
    }
    if (!target.closest('.messages-btn') && !target.closest('.messages-dropdown')) {
      this.showMessages = false;
    }
    if (!target.closest('.settings-btn') && !target.closest('.settings-dropdown')) {
      this.showSettings = false;
    }
  }

  onNotificationClick(notification: SidebarNotification) {
    console.log('Notification clicked:', notification);
    // Mark as read, navigate, etc.
    this.closeAllDropdowns();
  }

  onMessageClick(message: SidebarMessage) {
    console.log('Message clicked:', message);
    // Mark as read, navigate, etc.
    this.closeAllDropdowns();
  }

  viewAllNotifications() {
    console.log('View all notifications');
    // Navigate to notifications page
    this.closeAllDropdowns();
  }

  viewAllMessages() {
    console.log('View all messages');
    // Navigate to messages page
    this.closeAllDropdowns();
  }

  navigateToProfile() {
    console.log('Navigate to profile');
    // Navigate to profile page
    this.closeAllDropdowns();
  }

  openHelp() {
    console.log('Open help');
    // Open help modal or navigate
    this.closeAllDropdowns();
  }

  openSettings() {
    console.log('Open settings');
    // Open settings modal or navigate
    this.closeAllDropdowns();
  }

  onLogout() {
    console.log('Logout');
    // Implement logout logic
  }
}
