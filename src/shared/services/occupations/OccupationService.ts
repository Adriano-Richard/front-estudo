import { Api } from "../axios-config";


type TOccupations = {
    data: string[];
}

const getAll = async (): Promise<TOccupations | Error> => {
    try {
        const urlRelativa = `/Occupation`;

        const { data } = await Api.get<string[]>(urlRelativa);

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

export const OccupationsService = {
    getAll,
};