import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import {darkTheme} from './theme'
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from 'recoil';
import {GlobalStyle} from './GlovalStyle';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle/>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

