import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
//?Tema Global
import { GlobalStyle } from './global.js';
//?func para aplicar el tema correspondiente
import applyTheme from './applyTheme';

function ThemeWrapper({ children, theme }) {
  const fullTheme = useMemo(() => applyTheme(theme), [theme]);

  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={fullTheme}>
          <MuiThemeProvider theme={fullTheme}>
            <GlobalStyle />
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

ThemeWrapper.defaultProps = {
  children: null,
  theme: 'light',
};

ThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
};

export default ThemeWrapper;
