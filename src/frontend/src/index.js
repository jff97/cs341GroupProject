//Author: Creed Zagrzebski
//Date Created: September 8  2023
//Date Modified: October 7, November 7 
//Class & Methods Explained: This class is used to apply a custom theme to the progame 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2a313d"
    },
    background: {
      default: "#1D222A"
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </StyledEngineProvider>
);


