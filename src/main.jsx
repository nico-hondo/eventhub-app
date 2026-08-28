import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import Router from './Router.jsx';
import ThemeProvider from './context/theme/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
