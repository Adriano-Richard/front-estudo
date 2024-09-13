import { Interface } from "readline/promises";
import { Environment } from "../../environment";
import { Api } from "../axios-config";
import { IListResponseOptions } from "../response-options/ResponseOptionsService";


export interface IQuestion {
    id: number;
    text: string;
    description: string;
    expectativa: number;
    ResponseOptionId: number | null;
    avaliationId: number
    isRequired: boolean;
    responseOptions?: IListResponseOptions;
  };

export interface IQuestionCreate extends IQuestion {
    avaliationId: number;
}

type TQuestions = {
    data: IListResponseOptions[];
}

const getAll = async (): Promise<TQuestions | Error> => {
    try {
        const urlRelativa = `/Question`;

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
    getAll
};