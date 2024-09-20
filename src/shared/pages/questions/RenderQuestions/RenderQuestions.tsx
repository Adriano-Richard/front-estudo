import { Box, Button, Typography, Grid, TextField } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import QuestionList from "../RenderResponseField/QuestionList"; // Supondo que QuestionList seja um componente
import { useVForm, VForm } from "../../../forms";
import { useState } from "react";
import { IFormData, IResponseOption, Question } from "../DetalheDeQuestoes";

interface QuestionDetailProps {
    id: number;
    handleSave: (dados: IFormData) => void;
    responseOption: IResponseOption[];
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
}

export const RenderQuestion: React.FC<QuestionDetailProps> = ({
    id,
    handleSave,
    responseOption,
    questions,
    setQuestions,
}) => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    
    
    const handleAddQuestion = () => {
        setQuestions([...questions, { id: `question-${questions.length}`, text: '', responseOptionId: null, isRequired: false, description: '', expectativa: 0}]);
    }
    const toggleRequired = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isRequired = !updatedQuestions[index].isRequired;
        setQuestions(updatedQuestions);
      };

    const handleTitleChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = value;
        setQuestions(updatedQuestions);
      };

    const handleResponseTypeChange = (index: number, value: number | null) => {
        const updatedQuestions = [...questions];
        const selectedType = responseOption.find((type) => type.id === value);

        updatedQuestions[index].responseOptionId = value;
        updatedQuestions[index].responseOptions = selectedType ? selectedType.responses : []; // Armazena as opções de resposta, se houver

        setQuestions(updatedQuestions);
    };  

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const reorderedQuestions = [...questions];
        const [removed] = reorderedQuestions.splice(result.source.index, 1);
        reorderedQuestions.splice(result.destination.index, 0, removed);
        setQuestions(reorderedQuestions);
    };
    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleDuplicateQuestion = (index: number) => {
        const questionToDuplicate = questions[index];
        const newQuestion = { ...questionToDuplicate, id: `question-${questions.length}` };
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index + 1, 0, newQuestion);
        setQuestions(updatedQuestions);
    };
    return (
        <>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6">Detalhe de Questões {id}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddQuestion}
                    sx={{ marginLeft: 2 }}
                >
                    Adicionar Box
                </Button>
            </Box>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <QuestionList
                                questions={questions}
                                responseOption={responseOption}
                                onTitleChange={handleTitleChange}
                                onResponseTypeChange={handleResponseTypeChange}
                                onRemove={handleRemoveQuestion}
                                onDuplicate={handleDuplicateQuestion}
                                toggleRequired={toggleRequired}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <VForm ref={formRef} onSubmit={handleSave} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            name="questionCount"
                            disabled={true}
                            label="Quantidade de Questões"
                            value={questions.length}
                        />
                    </Grid>
                </Grid>
            </VForm>
        </>
    );
};
