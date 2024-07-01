import { Outlet, createBrowserRouter } from "react-router-dom";
import { Dashboard, DetalheDeAvaliacoes, ListagemDeAvaliacoes } from "../shared/pages";
import { MenuLateral } from "../shared/components";
import { UseDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/pagina-inicial",
        element:  <Dashboard />,
      },
      {
        path: "/avaliacoes",
        element: <ListagemDeAvaliacoes />,
      },
      {
        path: "/avaliacoes/detalhe/:id",
        element: <DetalheDeAvaliacoes />,
      },
    ],
  }
]);


function Layout() {
  const { setDrawerOptions } = UseDrawerContext();

    useEffect(() => {
      setDrawerOptions([
        {
          icon: 'home',
          path: '/pagina-inicial',
          label: 'Página Inicial',
        },
        {
          icon: 'star',
          path: '/avaliacoes',
          label: 'Avaliações',
        }
      ]);
    }, []);
  return (
    <MenuLateral>
      <Outlet />
    </MenuLateral>
  );
}