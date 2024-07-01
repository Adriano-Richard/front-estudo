import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  // createBrowserRouter,
  RouterProvider,
  // Outlet
} from "react-router-dom";
import './index.css'
import { DrawerProvider, AppThemeProvider } from './shared/contexts';
import { router } from './routes/root';
// import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';
// import { Dashboard, DetalheDeAvaliacoes, ListagemDeAvaliacoes } from './shared/pages';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/pagina-inicial",
//         element:  <Dashboard />,
//       },
//       {
//         path: "/avaliacoes",
//         element: <ListagemDeAvaliacoes />,
//       },
//       {
//         path: "/avaliacoes/detalhe/:id",
//         element: <DetalheDeAvaliacoes />,
//       },
//     ],
//   }
// ]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
          <RouterProvider router={router} /> 
      </DrawerProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)


  