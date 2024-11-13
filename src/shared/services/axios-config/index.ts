import axios from 'axios';
import { ResponseInterceptor, errorInterceptor } from './interceptors';
import { Environment } from '../../environment';

const Api = axios.create({
    baseURL: Environment.URL_BASE,
});

// Interceptor de requisição para adicionar o token no cabeçalho
Api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        config.headers['ngrok-skip-browser-warning'] = 'true';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de resposta para tratar respostas e erros
Api.interceptors.response.use(
    (response) => ResponseInterceptor(response),
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.error('Token inválido ou expirado');
            // Redirecionar para a página de login, por exemplo
            // window.location.href = '/login';
        }
        return errorInterceptor(error);
    }
);

export { Api };
