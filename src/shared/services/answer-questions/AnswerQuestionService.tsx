import { Api } from "../axios-config";

interface IAnswerQuestionRequest {
    userId: string;
    response: string;
    questionId: number;
}

const create = async (answers: IAnswerQuestionRequest[]): Promise<void | Error> => {
    try {
        // Adicionando a versão da API à URL relativa
        const urlRelativa = `/AnswerQuestion`;

        // Enviando a lista de respostas como payload na requisição POST
        const { data } = await Api.post(urlRelativa, answers);

        if (data) {
            return;
        }
        return new Error('Erro ao enviar as respostas.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao enviar as respostas.');
    }
};
export const AnswerQuestionService = {
    create,
};