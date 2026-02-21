module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--sidebar-font-family)', 'system-ui', 'sans-serif'],
        sidebar: ['var(--sidebar-font-family)', 'sans-serif'],
      },
      colors: {
        // Add your sidebar color variables for Tailwind use
        sidebar: {
          bg: 'var(--sidebar-background)',
          surface: 'var(--sidebar-surface)',
          text: 'var(--sidebar-text)',
          'text-secondary': 'var(--sidebar-text-secondary)',
          border: 'var(--sidebar-border)',
          hover: 'var(--sidebar-hover)',
          active: 'var(--sidebar-active)',
        },
      },
      width: {
        sidebar: 'var(--sidebar-width, 260px)',
        'sidebar-collapsed': 'var(--sidebar-collapsed-width, 80px)',
      },
      transitionProperty: {
        sidebar: 'width',
      },
      transitionDuration: {
        sidebar: 'var(--sidebar-transition-duration, 0.3s)',
      },
    },
  },
  plugins: [],
};
