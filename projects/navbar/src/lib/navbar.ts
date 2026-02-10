// top-navbar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLogo } from './models/navbar-models';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  @Input() sidebarCollapsed = false;
  @Input() logo?: NavbarLogo;
  @Input() sidebarPosition: 'left' | 'right' = 'left'; // New input

  @Output() toggleSidebar = new EventEmitter<void>();
  toggle() {
    console.log('sometihg toggled ');
    this.toggleSidebar.emit();
  }
  navItemsToggleMargin: number = 20;
  navItemsLogoMargin: number = 100;

  logoMargin(): string {
    return this.sidebarPosition === 'left'
      ? `margin-inline-end: ${this.navItemsLogoMargin}px`
      : `margin-inline-start: ${this.navItemsLogoMargin}px`;
  }

  toggleMargin(): string {
    return this.sidebarPosition === 'left'
      ? `margin-inline-start: ${this.navItemsToggleMargin}px`
      : `margin-inline-end: ${this.navItemsToggleMargin}px`;
  }
}
