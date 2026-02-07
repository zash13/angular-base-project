import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    RouterModule,
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
export class MenuComponent implements OnInit {
  @Input() menus: MenuItem[] = [];
  @Input() config: Partial<SidebarConfig> = {};
  @Output() menuItemClicked = new EventEmitter<MenuItem>();

  expandedMenuIds = new Set<string>();

  ngOnInit() {
    // Initialize expanded menus
    this.menus.forEach((menu) => {
      if (menu.active && menu.type === 'dropdown') {
        this.expandedMenuIds.add(menu.id);
      }
    });
  }

  toggleMenu(menu: MenuItem) {
    if (menu.type === 'dropdown') {
      if (this.expandedMenuIds.has(menu.id)) {
        this.expandedMenuIds.delete(menu.id);
      } else {
        this.expandedMenuIds.add(menu.id);
      }
      menu.active = !menu.active;
    }

    if (menu.type === 'link') {
      this.menuItemClicked.emit(menu);
    }
  }

  isMenuExpanded(menu: MenuItem): boolean {
    return menu.type === 'dropdown' ? this.expandedMenuIds.has(menu.id) : false;
  }

  trackByMenuItemId(index: number, item: MenuItem): string {
    return item.id;
  }
}
