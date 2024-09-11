import { Interface } from "readline/promises";
import { Environment } from "../../environment";
import { Api } from "../axios-config";


export interface IQuestion {
    id: string;
    title: string;
    responseTypeId: number | null;
    isRequired: boolean;
    responseOptions?: string[];
  };

export interface IQuestionCreate extends IQuestion {
    avaliationId: number;
}

interface IResponseOption {
    id: number;
    namePatterns?: string;
    responses?: string[];
}


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


const create = async (dados: IQuestionCreate[]): Promise<number | Error> => {
    try{
        const { data } = await Api.post('/avaliation/', dados);
        if (data) {
            return data.id;
          }
      
          return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

export const QuestionService = {
    updateName,
    getAvaliationVerify,
    create,
};