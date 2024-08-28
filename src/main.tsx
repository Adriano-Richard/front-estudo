import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  // createBrowserRouter,
  RouterProvider,
  // Outlet
} from "react-router-dom";
import './index.css'
import { DrawerProvider, AppThemeProvider, AuthProvider } from './shared/contexts';
import { router } from './routes/root';
import './shared/forms/TraducoesYup';
import { Login } from '@mui/icons-material';


ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <AuthProvider>
      <AppThemeProvider>
          <DrawerProvider>
              <RouterProvider router={router} /> 
          </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
,
)


  