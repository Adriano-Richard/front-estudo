
import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, Paper, IconButton, Grid } from '@mui/material';
import { Delete, ContentCopy, Star, StarBorder } from '@mui/icons-material';
import RenderResponseField from './RenderResponseField'; // Ajuste o caminho conforme necessário
import { IResponseOption, Question } from '../DetalheDeQuestoes';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface QuestionListProps {
    questions: Question[];
    responseTypes: IResponseOption[];
    onTitleChange: (index: number, value: string) => void;
    onResponseTypeChange: (index: number, value: number | null) => void;
    onRemove: (index: number) => void;
    onDuplicate: (index: number) => void;
    toggleRequired: (index: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    responseTypes,
    onTitleChange,
    onResponseTypeChange,
    onRemove,
    onDuplicate,
    toggleRequired,
}) => {
    return (
        <Droppable droppableId="questions">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questions.map((question, index) => (
                        <Draggable key={question.id} draggableId={question.id} index={index}>
                            {(provided) => (
                                <Box
                                    margin={1}
                                    display="flex"
                                    flexDirection="column"
                                    component={Paper}
                                    variant="outlined"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid item>
                                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                                <Box display="flex" alignItems="center" marginBottom={2}>
                                                    <Typography variant="subtitle1" marginRight={2}>
                                                        Questão {index + 1}
                                                    </Typography>
                                                    <IconButton onClick={() => toggleRequired(index)}>
                                                        {question.isRequired ? (
                                                            <Star style={{ color: 'red' }} fontSize="small" />
                                                        ) : (
                                                            <StarBorder fontSize="small" />
                                                        )}
                                                    </IconButton>
                                                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                                        {question.isRequired ? "Obrigatória" : "Opcional"}
                                                    </Typography>
                                                </Box>
                                                <Box marginBottom={2}>
                                                    <IconButton onClick={() => onRemove(index)}>
                                                        <Delete />
                                                    </IconButton>
                                                    <IconButton onClick={() => onDuplicate(index)}>
                                                        <ContentCopy />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <TextField
                                                fullWidth
                                                label="Título da Questão"
                                                value={question.title}
                                                onChange={(e) => onTitleChange(index, e.target.value)}
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <Select
                                                fullWidth
                                                value={question.responseTypeId || ''}
                                                onChange={(e) => onResponseTypeChange(index, Number(e.target.value))}
                                            >
                                                <MenuItem value="" disabled>Selecione o tipo de resposta</MenuItem>
                                                {responseTypes.map((type) => (
                                                    <MenuItem key={type.id} value={type.id}>{type.namePatterns}</MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default QuestionList;