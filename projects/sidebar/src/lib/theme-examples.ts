import { Component } from '@angular/core';
import { 
  SidebarTheme, 
  SidebarThemeConfig, 
  DEFAULT_DARK_THEME, 
  DEFAULT_LIGHT_THEME 
} from './models/sidebar-theme';

@Component({
  selector: 'app-theme-examples',
  template: `
    <div class="theme-controls">
      <h3>Theme Controls</h3>
      
      <!-- Simple Boolean Control -->
      <div>
        <label>Dark Mode (Boolean):</label>
        <input type="checkbox" [(ngModel)]="darkMode" (change)="onDarkModeChange()">
      </div>
      
      <!-- Preset Theme Control -->
      <div>
        <label>Preset Theme:</label>
        <select [(ngModel)]="currentPreset" (change)="onPresetChange()">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
      
      <!-- Primary Color Picker -->
      <div>
        <label>Primary Color:</label>
        <input type="color" [(ngModel)]="primaryColor" (change)="onPrimaryColorChange()">
      </div>
      
      <!-- Background Color Picker -->
      <div>
        <label>Background Color:</label>
        <input type="color" [(ngModel)]="backgroundColor" (change)="onBackgroundChange()">
      </div>
      
      <button (click)="resetToDefaults()">Reset to Defaults</button>
      <button (click)="applyRandomTheme()">Random Theme</button>
    </div>

    <!-- Sidebar with Dynamic Theme -->
    <lib-sidebar 
      [menus]="sampleMenus"
      [user]="sampleUser"
      [logo]="sampleLogo"
      [darkMode]="darkMode"
      [themeConfig]="themeConfig"
      [customTheme]="customTheme">
    </lib-sidebar>
  `,
  styles: [`
    .theme-controls {
      position: fixed;
      right: 20px;
      top: 20px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1001;
      max-width: 300px;
    }
    
    .theme-controls > div {
      margin-bottom: 10px;
    }
    
    .theme-controls label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .theme-controls input, 
    .theme-controls select {
      width: 100%;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .theme-controls button {
      background: #6366f1;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
      margin-top: 10px;
    }
    
    .theme-controls button:hover {
      background: #5558e3;
    }
  `]
})
export class ThemeExamplesComponent {
  // Sample data
  sampleMenus = [
    {
      id: '1',
      title: 'Dashboard',
      icon: 'dashboard',
      type: 'link' as const,
      routerLink: ['/dashboard'],
      active: true
    },
    {
      id: '2',
      title: 'Users',
      icon: 'people',
      type: 'link' as const,
      routerLink: ['/users'],
      badge: { text: '5', class: 'badge-primary' as const }
    },
    {
      id: '3',
      title: 'Settings',
      icon: 'settings',
      type: 'dropdown' as const,
      submenus: [
        { id: '3.1', title: 'Profile', icon: 'person', type: 'link' as const, routerLink: ['/profile'] },
        { id: '3.2', title: 'Security', icon: 'security', type: 'link' as const, routerLink: ['/security'] }
      ]
    }
  ];

  sampleUser = {
    name: 'John Doe',
    role: 'Administrator',
    status: 'online' as const,
    avatar: 'https://via.placeholder.com/60'
  };

  sampleLogo = {
    text: 'MyApp',
    url: '/',
    icon: 'apps'
  };

  // Theme controls
  darkMode = false;
  currentPreset: 'dark' | 'light' = 'light';
  primaryColor = '#6366f1';
  backgroundColor = '#ffffff';

  // Theme configurations
  themeConfig: SidebarThemeConfig = {
    preset: 'light'
  };

  customTheme: Partial<SidebarTheme> = {};

  // Methods
  onDarkModeChange() {
    console.log('Dark mode changed:', this.darkMode);
  }

  onPresetChange() {
    this.themeConfig = {
      ...this.themeConfig,
      preset: this.currentPreset
    };
    console.log('Preset changed:', this.currentPreset);
  }

  onPrimaryColorChange() {
    this.customTheme = {
      ...this.customTheme,
      primary: this.primaryColor
    };
    console.log('Primary color changed:', this.primaryColor);
  }

  onBackgroundChange() {
    this.customTheme = {
      ...this.customTheme,
      background: this.backgroundColor
    };
    console.log('Background color changed:', this.backgroundColor);
  }

  resetToDefaults() {
    this.darkMode = false;
    this.currentPreset = 'light';
    this.primaryColor = '#6366f1';
    this.backgroundColor = '#ffffff';
    this.themeConfig = { preset: 'light' };
    this.customTheme = {};
  }

  applyRandomTheme() {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
    
    this.customTheme = {
      primary: randomColor(),
      background: this.darkMode ? '#1a1a1a' : randomColor(),
      surface: randomColor(),
      text: this.darkMode ? '#ffffff' : '#000000'
    };
    
    console.log('Random theme applied:', this.customTheme);
  }

  // Example of creating completely custom themes
  get blueTheme(): Partial<SidebarTheme> {
    return {
      primary: '#2196f3',
      background: '#0d47a1',
      surface: '#1565c0',
      text: '#ffffff',
      textSecondary: '#bbdefb',
      border: '#1976d2',
      hover: 'rgba(33, 150, 243, 0.2)',
      active: 'rgba(33, 150, 243, 0.3)'
    };
  }

  get greenTheme(): Partial<SidebarTheme> {
    return {
      primary: '#4caf50',
      background: '#1b5e20',
      surface: '#2e7d32',
      text: '#ffffff',
      textSecondary: '#c8e6c9',
      border: '#388e3c',
      hover: 'rgba(76, 175, 80, 0.2)',
      active: 'rgba(76, 175, 80, 0.3)'
    };
  }

  get purpleTheme(): Partial<SidebarTheme> {
    return {
      primary: '#9c27b0',
      background: '#4a148c',
      surface: '#6a1b9a',
      text: '#ffffff',
      textSecondary: '#e1bee7',
      border: '#7b1fa2',
      hover: 'rgba(156, 39, 176, 0.2)',
      active: 'rgba(156, 39, 176, 0.3)'
    };
  }

  applyThemePreset(themeName: 'blue' | 'green' | 'purple') {
    switch(themeName) {
      case 'blue':
        this.customTheme = this.blueTheme;
        break;
      case 'green':
        this.customTheme = this.greenTheme;
        break;
      case 'purple':
        this.customTheme = this.purpleTheme;
        break;
    }
    this.darkMode = true; // These themes work best with dark mode
  }
}