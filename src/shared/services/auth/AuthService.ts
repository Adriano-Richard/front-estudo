import { Api } from '../axios-config';


export const occupationMap: { [key: string]: number } = {
  "Aluno": 0,
  "Professor": 1,
  "Técnico Administrativo": 2,
  "Coordenador": 3,
  "Egresso": 4,
  "Gestor": 5,
};
export const ageGroupMap: { [key: string]: number } = {
  "Até 25 anos": 0,
  "Entre 25 e 35 anos": 1,
  "Entre 35 e 45 anos": 2,
  "Acima de 45 anos": 3,
};

// Mapeamento para o enum Title
export const titleMap: { [key: string]: number } = {
  "Aluno": 0,
  "Graduado": 1,
  "Especialista": 2,
  "Mestre": 3,
  "Doutor": 4,
};

// Mapeamento para o enum ExperienceLevel
export const experienceLevelMap: { [key: string]: number } = {
  "Não atuo": 0,
  "Até 2 anos": 2,
  "Entre 2 e 5 anos": 3,
  "Entre 5 e 10 anos": 1,
  "Entre 10 e 15 anos": 4,
  "Acima de 15 anos": 5,
};

export interface ICreateUserRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  universityId: string;
  cargo: number;
  CPF: string;
  idade: number;
  titulo: number;
  tempoDeTrabalho: number;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    userName: string;
    cargo: string;
  };
}

const auth = async (UserName: string, Password: string): Promise<IAuthResponse | Error> => {
  try {
    const response = await Api.post('/User/login', { UserName, Password } );

    if (response.status === 200) {
      return {
        token: response.data.token,
        user: response.data.user,
      }
    }

    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

async function createUser(userData: ICreateUserRequest): Promise<void> {
  try {
      const request = userData;
      const response = await Api.post('/User/register', request );

      if (response.status >= 200 && response.status < 300) {
        alert("Usuário criado com sucesso!");
      } else {
          // Trata o caso de respostas fora da faixa 2xx
          const errorMessage = response.data?.message || 'Erro desconhecido ao criar o usuário';
          throw new Error(errorMessage);
      }
  } catch (error) {
      console.error("Erro ao criar o usuário:", error);
      alert(`Erro ao criar o usuário: ${error}`);
  }
}

export async function validateToken(): Promise<boolean> {
  const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');
  if (!accessToken) {
      return false;
  }

  try {
      const response = await Api.get('/User/validate-token', { headers: { Authorization: `Bearer ${accessToken}` } });
      return response.status === 200;
  } catch (error) {
      console.error('Token inválido ou expirado');
      localStorage.removeItem('APP_ACCESS_TOKEN');
      return false;
  }
}

export const AuthService = {
  auth,
  createUser,
  validateToken,
};