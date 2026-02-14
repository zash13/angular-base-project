import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuItem, SidebarConfig } from '../../models/sidebar-models';
import { OverlayModule } from '@angular/cdk/overlay';
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
    OverlayModule,
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class MenuComponent {
  @Input() menus: MenuItem[] = [];
  @Input() config: { collapsed: boolean; rtl?: boolean } = { collapsed: false, rtl: false };
  @Input() direction: 'left' | 'right' = 'left';

  @Output() menuItemClicked = new EventEmitter<MenuItem>();

  expandedMenuIds = new Set<string>();
  openDropdownId: string | null = null;

  get isRtl(): boolean {
    return this.direction === 'right' || !!this.config.rtl;
  }

  toggleMenu(menu: MenuItem, event: Event) {
    event.stopPropagation();
    
    if (menu.type === 'dropdown') {
      if (this.expandedMenuIds.has(menu.id)) {
        this.expandedMenuIds.delete(menu.id);
        this.openDropdownId = null;
      } else {
        this.expandedMenuIds.add(menu.id);
        this.openDropdownId = menu.id;
      }
    }
  }

  onMenuItemClick(menu: MenuItem) {
    this.menuItemClicked.emit(menu);
  }

  isMenuExpanded(menu: MenuItem): boolean {
    return menu.type === 'dropdown' ? this.expandedMenuIds.has(menu.id) : false;
  }

  closeDropdown() {
    this.expandedMenuIds.clear();
    this.openDropdownId = null;
  }
}
