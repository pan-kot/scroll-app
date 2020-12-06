import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Theme } from 'styled-system';

type TProviderProps = {
  children: React.ReactElement;
};

export default function Provider({ children }: TProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const theme: Theme = {
  colors: {
    background: '#FFFFFF',
    font: '#424242',
    'font-secondary': '#818181',
    brand: '#3664AE',
  },
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};
