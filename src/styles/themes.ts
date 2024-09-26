import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      text: string;
      accent: string;
    };
    fonts: {
      main: string;
      code: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

export const defaultTheme: DefaultTheme = {
  colors: {
    background: '#1a1a2e',
    primary: '#16213e',
    secondary: '#0f3460',
    text: '#e94560',
    accent: '#ff9800',
  },
  fonts: {
    main: "'Roboto', sans-serif",
    code: "'Roboto Mono', monospace",
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export default defaultTheme;