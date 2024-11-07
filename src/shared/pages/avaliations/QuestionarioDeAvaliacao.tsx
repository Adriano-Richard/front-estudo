import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import QuestionResponse from '../questions/Questionario';
import { IResponseOption, Question } from '../questions/DetalheDeQuestoes';
import { QuestionService } from '../../services/questions/QuestionService';
import { ResponseOptionsService } from '../../services/response-options/ResponseOptionsService';
import { useParams } from 'react-router-dom';
import { AnswerQuestionService } from '../../services/answer-questions/AnswerQuestionService';

const AvaliationResponsePage: React.FC = () => {
    const { id } = useParams<'id'>(); // Pegando o ID da avaliação dos parâmetros da rota
    const [questions, setQuestions] = useState<Question[]>([]);
    const [responseOptions, setResponseOptions] = useState<IResponseOption[]>([]);
    const [responses, setResponses] = useState<string[]>([]);
    const [allRequiredAnswered, setAllRequiredAnswered] = useState<boolean>(false);

    useEffect(() => {
        const loadQuestions = async () => {
            if (id) {
                try {
                    const result = await QuestionService.getQuestionByAvaliationName(id);
                    if (result instanceof Error) {
                        console.error(result.message);
                    } else {
                        setQuestions(result);
                        setResponses(Array(result.length).fill('')); // Inicializar respostas vazias com o tamanho das questões
                    }
                } catch (error) {
                    console.error('Erro ao carregar as questões:', error);
                }
            }
        };

        const loadResponseOptions = async () => {
            try {
                const result = await ResponseOptionsService.getAll();
                if (result instanceof Error) {
                    console.error(result.message);
                } else {
                    setResponseOptions(result.data);
                }
            } catch (error) {
                console.error('Erro ao carregar as opções de resposta:', error);
            }
        };

        loadQuestions();
        loadResponseOptions();
    }, [id]);

    useEffect(() => {
        // Verificar se todas as questões obrigatórias foram respondidas
        const allAnswered = questions.every((question, index) => 
            question.obrigatoria ? responses[index].trim() !== '' : true
        );
        setAllRequiredAnswered(allAnswered);
    }, [responses, questions]);

    const handleResponseChange = (index: number, value: string) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
        console.log(`Resposta atualizada para a questão ${index}: ${value}`);
    };

    const handleSendResponses = async () => {
        if (!id) {
            console.error("ID da avaliação não encontrado.");
            return;
        }

        // Obter o ID do usuário do localStorage
        const userInfo = localStorage.getItem('APP_USER_INFO');
        const userId = userInfo ? JSON.parse(userInfo).id : null;

        if (!userId) {
            console.error("Usuário não autenticado.");
            return;
        }

        // Construindo a lista de AnswerQuestionRequest
        const requestAnswers = questions.map((question, index) => ({
            userId: userId, // Usando o ID do usuário autenticado
            response: responses[index],
            questionId: parseInt(question.id),
        }));

        try {
            // Chamando o serviço para enviar as respostas
            const result = await AnswerQuestionService.create(requestAnswers);
            if (result instanceof Error) {
                console.error(result.message);
            } else {
                console.log("Respostas enviadas com sucesso.");
            }
        } catch (error) {
            console.error('Erro ao enviar as respostas:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Responder Avaliação
            </Typography>
            <QuestionResponse
                questions={questions}
                responseOption={responseOptions}
                onResponseChange={handleResponseChange}
            />
            <button 
                onClick={handleSendResponses} 
                disabled={!allRequiredAnswered} // Desabilitar botão se não estiverem todas as obrigatórias respondidas
            >
                Enviar Respostas
            </button>
        </div>
    );
};

export default AvaliationResponsePage;
