import { Api } from "../axios-config";

export interface IListResponseOptions {
    id: number;
    namePatterns?: string;
    responses?: string[];
}

type TResponseOptions = {
    data: IListResponseOptions[];
}

const getAll = async (): Promise<TResponseOptions | Error> => {
    try {
        const urlRelativa = `/ResponseOptions`;

        const { data } = await Api.get(urlRelativa);

        if (data) {
            return{
                data
            }
        }
        return new Error('Erro ao listar os registros.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

export const ResponseOptionsService = {
    getAll,
};