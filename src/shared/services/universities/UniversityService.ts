import { Environment } from "../../environment";
import { Api } from "../axios-config";

export interface IListUniversity {
    id: string;
    name: string;
    sigla: string;
}

type TUniversities = {
    data: IListUniversity[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TUniversities | Error> => {
    try {
        var urlRelativa = `/University?pageNumber=${page}`;
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

export const UniversityService = {
    getAll,
};