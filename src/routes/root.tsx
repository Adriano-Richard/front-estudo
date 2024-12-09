import { Outlet, createBrowserRouter } from "react-router-dom";
import { Dashboard, DetalheDeAvaliacoes, DetalheDeQuestoes, ListagemDeAvaliacoes, Login, UserProfile } from "../shared/pages";
import { Footer, MenuLateral } from "../shared/components";
import { CompactProvider, UseDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import Cadastro from "../shared/pages/login/cadastro/Cadastro";
import { ListagemDeUniversidades } from "../shared/pages/universities/ListagemDeUniversidades";
import PrivateRoute from "../shared/pages/private-route/PrivateRoute";
import AvaliationResponsePage from "../shared/pages/avaliations/QuestionarioDeAvaliacao";
import { Box } from "@mui/material";
import { PainelAdmin } from "../shared/pages/admin-graphs/PainelAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/pagina-inicial",
        element:  (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/avaliacoes",
        element: (
          <PrivateRoute>
            <ListagemDeAvaliacoes />
          </PrivateRoute>
        ),
      },
      {
        path: "/avaliacoes/detalhe/:id",
        element: (
          <PrivateRoute>
            <DetalheDeAvaliacoes />
          </PrivateRoute>
        ),
      },
      {
        path: "/avaliacoes/responder/:id",
        element: (
          <PrivateRoute>
            <AvaliationResponsePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/usuarios/detalhe",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/questoes/detalhe",
        element: <DetalheDeQuestoes />,
      },
      {
        path: "/universidades",
        element: <ListagemDeUniversidades />
      },
      {
        path: "/painel",
        element: <PainelAdmin />
      }
    ],
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
        },
        {
          icon: 'bar_chart',
          path: '/painel',
          label: 'Painel',
        }
      ]);
    }, []);
  return (
    <Login>
      <CompactProvider>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh" // Garante que o layout ocupa a altura total da tela
        >
          <MenuLateral>
            <Box 
              display="flex"
              flexDirection="column"
              flex="1" // Faz o conteúdo expandir
              minHeight="100%" // Garante que o conteúdo ocupe pelo menos a altura da tela
            >
              <Box 
                flex="1" // Garante que o conteúdo ocupe todo o espaço restante
                padding={2}
                overflow="auto" // Ativa a rolagem no conteúdo principal se necessário
              >
                <Outlet />
              </Box>

              {/* Footer: vai ficar sempre abaixo do conteúdo */}
              <Footer />
            </Box>
          </MenuLateral>
        </Box>
      </CompactProvider>
    </Login>
  );
}