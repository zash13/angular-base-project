export interface NavbarLogo {
  text: string;
  url: string;
  icon?: string;
  image?: string;
  iconType?: 'string' | 'mat-icon' | 'image';
  collapsedIcon?: string;
  collapsedImage?: string;
}

export interface ToggleButtonIcons {
  expand?: string;
  collapse?: string;
}
