import { Environment } from "../../environment";
import { Api } from "../axios-config";


export interface IListAvaliation {
    name: string;
    questionCount?: number;
}

type TAvaliationsComTotalCount = {
    data: IListAvaliation[];
    totalCount: number;
}

interface AvaliationResponse {
    id: number;
    name: string;
    questionCount: number;
}

const getByName = async( name = '', page = 1 ): Promise<IListAvaliation | Error> => {
    try {
        const urlRelativa = `/avaliation?Name=${name}&pageNumber=${page}`;

        const { data } = await Api.get(urlRelativa);

        if (data){
            return data;
        }
        return new Error('Erro ao listar os registros.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
 };

const updateName = async(name: string, newAvaliationName: string): Promise<void | Error> => {
    try {
        const urlRelativa = `/avaliation?Name=${name}&NewAvaliationName=${newAvaliationName}`;

        await Api.put(urlRelativa);
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
 };

const getAvaliationVerify = async(name: string): Promise<boolean | Error> => {
    try {
        const urlRelativa = `/Avaliation/Verify?Name=${name}`;

        const { data } = await Api.get(urlRelativa);

        if (data && typeof data.hasResponded === 'boolean') {
            return data.hasResponded;
        }
        return false;
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};


const getAll = async (page = 1, filter = ''): Promise<TAvaliationsComTotalCount | Error> => {
    try {
        var urlRelativa = `/Avaliation?pageNumber=${page}`;

        if (filter){
            urlRelativa += `&name=${filter}`;
        }

        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return{
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }
        return new Error('Erro ao listar os registros.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const updateById = async (id: number, dados: IListAvaliation): Promise<void | Error> => {
    try{
        await Api.put(`/avaliation/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const create = async (name: string): Promise<AvaliationResponse | Error> => {
    try{
        const { data } = await Api.post<AvaliationResponse>('/Avaliation', { name });
        if (data) {
            return data;
          }
      
          return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const verifyResponse = async (avaliationName: string): Promise<boolean> => {
    try {
        const userInfo = localStorage.getItem('APP_USER_INFO');
        const userId = userInfo ? JSON.parse(userInfo).id : null;
        
        const response = await Api.get<boolean>(`Avaliation/Verify`, { params: { Name: avaliationName }, headers: { UserId: `${userId}` } });
        return response.data;
    } catch {
        return false; // Assuma que não foi respondido em caso de erro
    }
};

export const AvaliationService = {
    getByName,
    updateName,
    getAvaliationVerify,
    getAll,
    create,
    updateById,
    verifyResponse
};