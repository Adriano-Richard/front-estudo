import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import { DrawerProvider, AppThemeProvider } from './shared/contexts';
import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';

const router = createBrowserRouter([
  {
    path: "/pagina-inicial",
    element: <Root />,
  },
  {
    path: "/s",
    element: <><p>oi</p></>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
          <MenuLateral>
            <RouterProvider router={router} />
          </MenuLateral>   
      </DrawerProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)


  