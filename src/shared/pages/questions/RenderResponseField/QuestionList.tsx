import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Paper, IconButton, Grid } from '@mui/material';
import { Delete, ContentCopy, Star, StarBorder } from '@mui/icons-material';
import RenderResponseField from './RenderResponseField'; 
import { IResponseOption, Question } from '../DetalheDeQuestoes';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { OccupationsService } from '../../../services/occupations/OccupationService';
import { Occupation } from '../RenderQuestions/RenderQuestions';

interface QuestionListProps {
    questions: Question[];
    occupationEnumMap: { [key in Occupation]: number };
    responseOption: IResponseOption[];
    onTitleChange: (index: number, value: string) => void;
    onDescriptionChange: (index: number, value: string) => void;
    onResponseTypeChange: (index: number, value: number | null) => void;
    onOccupationChange: (index: number, value: Occupation) => void;
    onRemove: (index: number) => void;
    onDuplicate: (index: number) => void;
    toggleRequired: (index: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    responseOption,
    onTitleChange,
    onDescriptionChange,
    onResponseTypeChange,
    onOccupationChange,
    occupationEnumMap,
    onRemove,
    onDuplicate,
    toggleRequired,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [occupation, setOccupation] = useState<string[]>([]);
    const [selectedOccupations, setSelectedOccupations] = useState<string[]>([]);

    useEffect(() => {
        setIsLoading(true);
        OccupationsService.getAll()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setOccupation(result.data);
                }
            });
    }, []);

    
    return (
        <Droppable droppableId="questions">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questions.map((question, index) => (
                        <Draggable key={question.id.toString()} draggableId={question.id.toString()} index={index}>
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
                                                value={question.text}
                                                onChange={(e) => onTitleChange(index, e.target.value)}
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Descrição da Questão"
                                                value={question.description}
                                                onChange={(e) => onDescriptionChange(index, e.target.value)}
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <Select
                                                fullWidth
                                                value={question.responseOptionId || ''}
                                                onChange={(e) => onResponseTypeChange(index, Number(e.target.value))}
                                                sx={{ marginBottom: 2 }}
                                            >
                                                <MenuItem value="" disabled>Selecione o tipo de resposta</MenuItem>
                                                {responseOption.map((type) => (
                                                    <MenuItem key={type.id} value={type.id}>{type.namePatterns}</MenuItem>
                                                ))}
                                            </Select>
                                            <RenderResponseField
                                                question={question}
                                                responseOption={responseOption}
                                            />
                                            {occupation.map((occ) => (
                                                <Box key={occ} display="flex" alignItems="center">
                                                    <input
                                                        type="checkbox"
                                                        checked={question.allowedOccupations.includes(occupationEnumMap[occ as Occupation])}
                                                        onChange={() => onOccupationChange(index, occ as Occupation)}
                                                    />
                                                    <Typography marginLeft={1}>{occ}</Typography>
                                                </Box>
                                            ))}
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

