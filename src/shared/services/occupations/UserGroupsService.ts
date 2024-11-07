import { Api } from "../axios-config";


type TUserGroups = {
    data: string[];
}

const getOccupations = async (): Promise<TUserGroups | Error> => {
    try {
        const urlRelativa = `/UserGroups/occupations`;

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

const getAges = async (): Promise<TUserGroups | Error> => {
    try {
        const urlRelativa = `/UserGroups/ages`;

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

const getTitles = async (): Promise<TUserGroups | Error> => {
    try {
        const urlRelativa = `/UserGroups/titles`;

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

const getExperienceLevels = async (): Promise<TUserGroups | Error> => {
    try {
        const urlRelativa = `/UserGroups/experience-levels`;

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


export const UserGroupsService = {
    getOccupations,
    getAges,
    getTitles,
    getExperienceLevels,
};