import { Outlet, createBrowserRouter } from "react-router-dom";
import { Dashboard, DetalheDeAvaliacoes, DetalheDeQuestoes, ListagemDeAvaliacoes, Login, UserProfile } from "../shared/pages";
import { MenuLateral } from "../shared/components";
import { CompactProvider, UseDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import Cadastro from "../shared/pages/login/cadastro/Cadastro";
import { ListagemDeUniversidades } from "../shared/pages/universities/ListagemDeUniversidades";

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
      {
        path: "/questoes/detalhe",
        element: <DetalheDeQuestoes />,
      },
      {
        path: "/universidades",
        element: <ListagemDeUniversidades />
      }
    ],
  },
  {
    path: "/login",
    element: <Login children={undefined} />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />, // Adicionando rota de cadastro
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
          icon: 'article',
          path: '/avaliacoes',
          label: 'Avaliações',
        },
        {
          icon: 'bookmark',
          path: '/questoes/detalhe',
          label: 'Questões',
        },
        {
          icon: 'book',
          path: '/universidades',
          label: 'Universades',
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