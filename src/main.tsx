import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import { DrawerProvider, AppThemeProvider } from './shared/contexts';
import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';
import { ListagemDeAvaliacoes } from './shared/pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/pagina-inicial",
        element: <Root />,
      },
      {
        path: "/avaliacoes",
        element: <ListagemDeAvaliacoes />,
      },
    ],
  }
]);

function Layout() {
  return (
    <MenuLateral>
      <Outlet />
    </MenuLateral>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
          <RouterProvider router={router} /> 
      </DrawerProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)


  