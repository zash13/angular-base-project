import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoConfig, SidebarConfig } from '../../models/sidebar-models';

@Component({
  selector: 'lib-sidebar-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  @Input() config: Partial<SidebarConfig> = {};
  @Input() logo: LogoConfig | null = { text: 'Pro Sidebar', url: '/', icon: 'menu' };
  @Output() toggleSidebar = new EventEmitter<void>();

  get isCollapsed(): boolean {
    return this.config.collapsed ?? false;
  }
}
