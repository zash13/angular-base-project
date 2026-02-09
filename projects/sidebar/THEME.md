# Sidebar Theme System Documentation

The sidebar library now supports a comprehensive theming system with multiple ways to customize the appearance.

## Usage Options

### 1. Boolean Dark Mode (Simple)

```html
<lib-sidebar [darkMode]="true">...</lib-sidebar>
<lib-sidebar [darkMode]="false">...</lib-sidebar>
```

### 2. Preset Themes

```html
<lib-sidebar [themeConfig]="{ preset: 'dark' }">...</lib-sidebar>
<lib-sidebar [themeConfig]="{ preset: 'light' }">...</lib-sidebar>
```

### 3. Custom Theme Configuration

```html
<lib-sidebar [themeConfig]="{
  preset: 'dark',
  customTheme: {
    primary: '#ff6b6b',
    background: '#1a1a2e',
    text: '#eee'
  }
}">...</lib-sidebar>
```

### 4. Full Custom Theme Override

```typescript
import { Component } from '@angular/core';
import { SidebarTheme } from 'sidebar';

@Component({
  selector: 'app-example',
  template: `
    <lib-sidebar 
      [customTheme]="myCustomTheme"
      [darkMode]="false">
      ...
    </lib-sidebar>
  `
})
export class ExampleComponent {
  myCustomTheme: SidebarTheme = {
    background: '#2c3e50',
    surface: '#34495e',
    primary: '#3498db',
    text: '#ecf0f1',
    textSecondary: '#bdc3c7',
    border: '#7f8c8d',
    hover: 'rgba(52, 152, 219, 0.1)',
    active: 'rgba(52, 152, 219, 0.15)',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    transitionDuration: '0.3s'
  };
}
```

## Theme Properties

### Core Colors
- `background`: Main sidebar background
- `surface`: Secondary surface color (cards, panels)
- `primary`: Primary accent color
- `text`: Primary text color
- `textSecondary`: Secondary/muted text color
- `border`: Border and divider colors
- `hover`: Hover state background
- `active`: Active/selected state background

### Component-Specific Colors
- `headerBackground`: Header section background
- `headerText`: Header text color
- `profileBackground`: Profile section background
- `searchBackground`: Search field background
- `searchBorder`: Search field border color

### Status Colors
- `success`: Success state color
- `warning`: Warning state color
- `error`: Error state color
- `info`: Info state color

### Other Properties
- `shadowColor`: Box shadow color
- `transitionDuration`: Animation transition duration

## Dynamic Theme Updates

You can update the theme dynamically:

```typescript
import { Component } from '@angular/core';
import { SidebarComponent, SidebarThemeConfig } from 'sidebar';

@Component({...})
export class ThemeControllerComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  switchToDarkMode() {
    this.sidebar.updateTheme({ preset: 'dark' });
  }

  switchToLightMode() {
    this.sidebar.updateTheme({ preset: 'light' });
  }

  applyCustomTheme() {
    this.sidebar.updateTheme({
      customTheme: {
        primary: '#9b59b6',
        background: '#2c3e50'
      }
    });
  }
}
```

## CSS Custom Properties

The theme system uses CSS custom properties that you can override directly:

```css
lib-sidebar {
  --sidebar-background: #1a1a2e;
  --sidebar-primary: #ff6b6b;
  --sidebar-text: #eee;
  --sidebar-border: #444;
}
```

## Default Themes

### Dark Theme
- Background: `#1d1d1d`
- Surface: `#2b2b2b`
- Primary: `#6366f1`
- Text: `#bdbdbd`
- Text Secondary: `#6c7b88`

### Light Theme
- Background: `#ffffff`
- Surface: `#f8f9fa`
- Primary: `#6366f1`
- Text: `#1f2937`
- Text Secondary: `#6b7280`

## Migration Guide

If you were using the old theme system:

```typescript
// Old way
@Input() theme: 'dark' | 'light' | 'auto';

// New way
@Input() darkMode?: boolean;
@Input() themeConfig?: SidebarThemeConfig;
@Input() customTheme?: Partial<SidebarTheme>;
```

The new system is backward compatible and provides much more flexibility for customization.