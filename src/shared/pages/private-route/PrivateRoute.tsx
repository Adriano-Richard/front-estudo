import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { validateToken } from '../../services/auth/AuthService';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    const checkToken = async () => {
      const tokenIsValid = await validateToken();
      setIsValid(tokenIsValid);
    };

    checkToken();
  }, []);

  if (isValid === null) {
    // Enquanto a validação está em progresso, pode-se mostrar um carregamento ou algo similar
    return <div>Carregando...</div>;
  }

  // Se o token for válido, renderize os filhos (children)
  // Caso contrário, redirecione para a página de login
  return isValid ? children : <Navigate to="/" />;
};

export default PrivateRoute;
