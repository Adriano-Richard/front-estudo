import { Api } from "../axios-config";


interface IListAvaliation {
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


export const AvaliationService = {
    getByName,
    updateName,
    getAvaliationVerify,
};