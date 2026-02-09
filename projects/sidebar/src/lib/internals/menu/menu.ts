import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuItem, SidebarConfig } from '../../models/sidebar-models';
@Component({
  selector: 'lib-sidebar-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class MenuComponent {
  @Input() menus: MenuItem[] = [];
  @Input() config: Partial<SidebarConfig> = {};
  @Output() menuItemClicked = new EventEmitter<MenuItem>();

  expandedMenuIds = new Set<string>();

  toggleMenu(menu: MenuItem) {
    if (this.config.collapsed) return; // Don't expand when collapsed

    if (menu.type === 'dropdown') {
      if (this.expandedMenuIds.has(menu.id)) {
        this.expandedMenuIds.delete(menu.id);
      } else {
        this.expandedMenuIds.add(menu.id);
      }
    }
  }

  onMenuItemClick(menu: MenuItem) {
    this.menuItemClicked.emit(menu);
  }

  isMenuExpanded(menu: MenuItem): boolean {
    return menu.type === 'dropdown' ? this.expandedMenuIds.has(menu.id) : false;
  }
}
