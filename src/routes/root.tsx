import { UseDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard } from "../shared/pages";

export default function Root() {
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
      <>
        <Dashboard />
      </>
    );
  }
  