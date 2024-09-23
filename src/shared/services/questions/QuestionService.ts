import { Interface } from "readline/promises";
import { Environment } from "../../environment";
import { Api } from "../axios-config";
import { IListResponseOptions } from "../response-options/ResponseOptionsService";
import { Question } from "../../pages";


export interface IQuestion {
    id: number;
    text: string;
    description: string;
    expectativa: number;
    responseOptionId: number | null;
    avaliationId: number
    isRequired: boolean;
    responseOptions?: IListResponseOptions;
  };

export interface IQuestionCreate extends IQuestion {
    avaliationId: number;
}

type TQuestionsAvaliation = {
    data: Question[];
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

const getQuestionByAvaliationName = async (name: string): Promise<Question[] | Error> => {
    try {
        const urlRelativa = `/Question?AvaliationName=${name}`;
        const { data } = await Api.get(urlRelativa);
        if (data) {
            return data;
        }
        return new Error('Erro ao listar os registros.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
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


const create = async (avaliationId: number, questions: Question[]): Promise<number | Error> => {
    try{
        const requestQuestions = questions.map(question => ({
            text: question.text,
            description: question.description,
            responseOptionId: question.responseOptionId,
            expectativa: question.expectativa,
            allowedOccupations: question.allowedOccupations // Certifique-se de que isso é um array de números
        }));
        const { data } = await Api.post('/Question', requestQuestions, { headers: { 'Avaliation-Id': avaliationId }});
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
    getAll,
    getQuestionByAvaliationName
};