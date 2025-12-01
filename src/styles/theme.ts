export const colors = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  muted: 'hsl(var(--muted))',
  mutedForeground: 'hsl(var(--muted-foreground))',
  border: 'hsl(var(--border))',
  accent: 'hsl(var(--accent))',
  accentForeground: 'hsl(var(--accent-foreground))',
}

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
}

export const shadows = {
  soft: '0 8px 24px rgba(0,0,0,0.06)',
  card: '0 4px 14px rgba(0,0,0,0.06)',
  hover: '0 10px 30px rgba(0,0,0,0.10)',
}

export const spacing = {
  container: 'max-w-7xl',
}

export const theme = { colors, radii, shadows, spacing }
