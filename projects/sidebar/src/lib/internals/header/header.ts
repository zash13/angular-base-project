import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoConfig, SidebarConfig } from '../../models/sidebar-models';

interface HeaderConfig extends Partial<SidebarConfig> {
  toggleButton?: boolean;
  isRtl?: boolean;
}

@Component({
  selector: 'lib-sidebar-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  @Input() config: HeaderConfig = {};
  @Input() logo: LogoConfig | null = { text: 'Pro Sidebar', url: '/', icon: 'menu' };
  @Output() toggleSidebar = new EventEmitter<void>();

  get isCollapsed(): boolean {
    return this.config.collapsed ?? false;
  }

  get isRtl(): boolean {
    return !!(this.config.rtl || this.config.position === 'right' || this.config.isRtl);
  }

  get showToggleButton(): boolean {
    return this.config.toggleButton ?? true;
  }
}
