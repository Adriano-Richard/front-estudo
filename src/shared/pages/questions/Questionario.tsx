import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { IResponseOption, Question } from '../questions/DetalheDeQuestoes';
import RenderUserResponseField from './RenderResponseField/RenderUserResponseField';

interface QuestionResponseProps {
    questions: Question[];
    responseOption: IResponseOption[];
    onResponseChange: (index: number, value: string) => void;
}

const QuestionResponse: React.FC<QuestionResponseProps> = ({
    questions,
    responseOption,
    onResponseChange,
}) => {
    return (
        <div>
            {questions.map((question, index) => (
                <Box
                    key={question.id}
                    margin={1}
                    display="flex"
                    flexDirection="column"
                    component={Paper}
                    variant="outlined"
                >
                    <Grid container direction="column" padding={2} spacing={2}>
                        <Grid item>
                            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
                                <Typography variant="subtitle1">
                                    Questão {index + 1}
                                </Typography>
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    {question.obrigatoria ? "Obrigatória" : "Opcional"}
                                </Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {question.text}
                            </Typography>
                            {question.description && (
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {question.description}
                                </Typography>
                            )}
                            <RenderUserResponseField
                                question={question}
                                responseOption={responseOption}
                                onResponseChange={(value: string) => onResponseChange(index, value)} // Passando a função onResponseChange
                            />
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </div>
    );
};

export default QuestionResponse;
