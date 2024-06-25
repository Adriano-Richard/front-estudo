import { Environment } from "../../environment";
import { Api } from "../axios-config";


export interface IListAvaliation {
    name: string;
    questionCount: number;
}

type TAvaliationsComTotalCount = {
    data: IListAvaliation[];
    totalCount: number;
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

        await Api.post(urlRelativa);
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
        const urlRelativa = `/avaliation?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name=${filter}`;

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

export const AvaliationService = {
    getByName,
    updateName,
    getAvaliationVerify,
    getAll,
};