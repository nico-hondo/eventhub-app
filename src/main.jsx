import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import Router from './Router.jsx';
import {ToastContainer} from 'react-toastify';
import ThemeProvider from './context/theme/ThemeProvider.jsx';
import reduxStore, {persistor} from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <Router/>
            <ToastContainer
              toastStyle={{ fontSize: "13px"}}
            />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
