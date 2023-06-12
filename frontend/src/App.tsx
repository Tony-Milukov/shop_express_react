import React from 'react';
import './index.css';
import Router from './Router';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
      <SnackbarProvider  maxSnack={3}>
        <Router/>
      </SnackbarProvider>
  );
}

export default App;
