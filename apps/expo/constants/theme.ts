export const colors = {
  // Light theme
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    card: '#ffffff',
    cardForeground: '#0a0a0a',
    popover: '#ffffff',
    popoverForeground: '#0a0a0a',
    primary: '#ea580c', // oklch(0.646 0.222 41.116)
    primaryForeground: '#fef3f2',
    secondary: '#f5f5f5',
    secondaryForeground: '#171717',
    muted: '#f5f5f5',
    mutedForeground: '#737373',
    accent: '#f5f5f5',
    accentForeground: '#171717',
    destructive: '#dc2626',
    border: '#e5e5e5',
    input: '#e5e5e5',
    ring: '#a3a3a3',
  },
  // Dark theme
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    card: '#171717',
    cardForeground: '#fafafa',
    popover: '#171717',
    popoverForeground: '#fafafa',
    primary: '#f97316',
    primaryForeground: '#fef3f2',
    secondary: '#262626',
    secondaryForeground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    accent: '#404040',
    accentForeground: '#fafafa',
    destructive: '#ef4444',
    border: 'rgba(255, 255, 255, 0.1)',
    input: 'rgba(255, 255, 255, 0.15)',
    ring: '#737373',
  },
};

export const paperTheme = {
  colors: {
    primary: colors.light.primary,
    secondary: colors.light.secondary,
    background: colors.light.background,
    surface: colors.light.card,
    error: colors.light.destructive,
    onSurface: colors.light.foreground,
    onBackground: colors.light.foreground,
  },
};