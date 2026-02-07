import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarNotification, SidebarMessage } from '../../models/sidebar-models';
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
  @Input() notifications: SidebarNotification[] = [];
  @Input() messages: SidebarMessage[] = [];
  @Input() unreadNotificationsCount = 0;
  @Input() unreadMessagesCount = 0;
  @Output() notificationClicked = new EventEmitter<any>();
  @Output() messageClicked = new EventEmitter<any>();
  @Output() logoutClicked = new EventEmitter<void>();

  onNotificationClick(notification: any) {
    this.notificationClicked.emit(notification);
  }

  onMessageClick(message: any) {
    this.messageClicked.emit(message);
  }

  onLogout() {
    this.logoutClicked.emit();
  }
}
