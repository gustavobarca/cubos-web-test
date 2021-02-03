import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Global from 'styles/global';
import Routes from './routes';
import 'styles/fonts.css';
import 'styles/metrics.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
