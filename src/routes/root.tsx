import { Outlet, createBrowserRouter } from "react-router-dom";
import { Dashboard, DetalheDeAvaliacoes, ListagemDeAvaliacoes, UserProfile } from "../shared/pages";
import { Login, MenuLateral } from "../shared/components";
import { CompactProvider, UseDrawerContext } from "../shared/contexts";
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
      {
        path: "/usuarios/detalhe",
        element: <UserProfile />,
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
    <Login>
      <CompactProvider>

        <MenuLateral>
          <Outlet />
        </MenuLateral>
      </CompactProvider>
    </Login>
  );
}