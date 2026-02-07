import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { LogoConfig, SidebarConfig } from '../../models/sidebar-models';
@Component({
  selector: 'lib-sidebar-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  @Input() config: Partial<SidebarConfig> = {};
  @Input() logo: LogoConfig = { text: 'Pro Sidebar', url: '/', icon: 'menu' };
  @Output() toggleSidebar = new EventEmitter<void>();
}
