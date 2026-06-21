export const colors = {
  primary: {
    purple: '#6C4EF5',
    deepPurple: '#5B38F6',
    blue: '#4D88FF',
    green: '#21C168',
  },
  semantic: {
    success: '#21C168',
    warning: '#FFCB00',
    streak: '#FF8A00',
    error: '#FF4D4F',
    info: '#4D88FF',
  },
  neutral: {
    textPrimary: '#001328',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    surface: '#F6F7FB',
    background: '#FFFFFF',
  },
} as const;

export const fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const fontSizes = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 13,
  caption: 11,
} as const;

export const lineHeights = {
  h1: 32 * 1.2,     // 38.4
  h2: 24 * 1.3,     // 31.2
  h3: 20 * 1.3,     // 26
  h4: 16 * 1.4,     // 22.4
  bodyLg: 16 * 1.6, // 25.6
  bodyMd: 14 * 1.6, // 22.4
  bodySm: 13 * 1.6, // 20.8
  caption: 11 * 1.4, // 15.4
} as const;
