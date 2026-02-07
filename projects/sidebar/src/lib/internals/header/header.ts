import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip'; // Add this import
import { LogoConfig, SidebarConfig } from '../../models/sidebar-models';

@Component({
  selector: 'lib-sidebar-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatRippleModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  @Input() config: Partial<SidebarConfig> = {};
  @Input() logo: LogoConfig | null = { text: 'Pro Sidebar', url: '/', icon: 'menu' };
  @Output() toggleSidebar = new EventEmitter<void>();
}
