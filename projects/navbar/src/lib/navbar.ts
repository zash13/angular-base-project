// top-navbar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavbarLogo, ToggleButtonIcons } from './models/navbar-models';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  @Input() sidebarCollapsed = false;
  @Input() logo?: NavbarLogo;
  @Input() sidebarPosition: 'left' | 'right' = 'left';
  @Input() showToggleButton = true;
  @Input() rtl = false;
  @Input() mirrorElements = false;
  @Input() toggleButtonIcons?: ToggleButtonIcons;

  @Output() toggleSidebar = new EventEmitter<void>();
  toggle() {
    console.log('sometihg toggled ');
    this.toggleSidebar.emit();
  }
  navItemsToggleMargin: number = 20;
  navItemsLogoMargin: number = 100;

  get isMirrored(): boolean {
    return this.mirrorElements;
  }

  get expandIcon(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return this.toggleButtonIcons?.expand ?? (isRtlLike ? 'chevron_left' : 'chevron_right');
  }

  get collapseIcon(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return this.toggleButtonIcons?.collapse ?? (isRtlLike ? 'chevron_right' : 'chevron_left');
  }

  logoMargin(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return isRtlLike
      ? `margin-inline-start: ${this.navItemsLogoMargin}px`
      : `margin-inline-end: ${this.navItemsLogoMargin}px`;
  }

  toggleMargin(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return isRtlLike
      ? `margin-inline-end: ${this.navItemsToggleMargin}px`
      : `margin-inline-start: ${this.navItemsToggleMargin}px`;
  }

  toggleMarginClass(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return isRtlLike ? 'me-5' : 'ms-5';
  }

  logoMarginClass(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return isRtlLike ? '' : 'ms-5';
  }

  get containerClass(): string {
    const isRtlLike = (this.rtl || this.sidebarPosition === 'right') !== this.mirrorElements;
    return isRtlLike ? 'flex-row-reverse' : '';
  }
}
