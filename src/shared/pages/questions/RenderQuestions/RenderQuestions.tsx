import { Box, Button, Typography, Grid, TextField } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import QuestionList from "../RenderResponseField/QuestionList"; // Supondo que QuestionList seja um componente
import { useVForm, VForm } from "../../../forms";
import { useEffect } from "react";
import { IFormData, IResponseOption, Question } from "../DetalheDeQuestoes";

interface QuestionDetailProps {
    id: number;
    handleSave: (dados: IFormData) => void;
    responseOption: IResponseOption[];
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
}
export type Occupation = 'Aluno' | 'Professor' | 'TecnicoAdministrativo' | 'Coordenador' | 'Egresso' | 'Gestor';

export const RenderQuestion: React.FC<QuestionDetailProps> = ({
    id,
    handleSave,
    responseOption,
    questions,
    setQuestions,
}) => {
    const { formRef } = useVForm();

    const occupationEnumMap: { [key in Occupation]: number } = {
        Aluno: 0,
        Professor: 1,
        TecnicoAdministrativo: 2,
        Coordenador: 3,
        Egresso: 4,
        Gestor: 5,
    };

    useEffect(() => {
        // Verificar se há perguntas e se elas precisam de ajuste nas ocupações
        const needsUpdate = questions.some(question => 
            question.allowedOccupations.some((occupation: any) => typeof occupation === 'string')
        );
    
        if (needsUpdate) {
            const updatedQuestions = questions.map((question) => {
                // Mapear as ocupações permitidas para o formato numérico esperado
                const mappedOccupations = question.allowedOccupations.map((occupation: Occupation) => occupationEnumMap[occupation]);
    
                return {
                    ...question,
                    allowedOccupations: mappedOccupations, // Atualiza com ocupações numéricas
                };
            });
            setQuestions(updatedQuestions);
        }
    }, [questions]);
    
    const handleOccupationChange = (index: number, occupation: Occupation) => {
        const updatedQuestions = [...questions];
    
        // Verifica se a ocupação já está selecionada
        const updatedOccupations = updatedQuestions[index].allowedOccupations.includes(occupationEnumMap[occupation])
            ? updatedQuestions[index].allowedOccupations.filter((item) => item !== occupationEnumMap[occupation]) // Remove se já estiver selecionada
            : [...updatedQuestions[index].allowedOccupations, occupationEnumMap[occupation]]; // Adiciona se não estiver selecionada
    
        updatedQuestions[index].allowedOccupations = updatedOccupations; // Atualiza a lista de ocupações permitidas
        setQuestions(updatedQuestions);
    };
    
    const handleAddQuestion = () => {
        setQuestions([...questions, { id: `question-${questions.length}`, text: '', responseOptionId: null, obrigatoria: false, description: '', expectativa: 0, allowedOccupations: []}]);
    }
    const toggleRequired = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].obrigatoria = !updatedQuestions[index].obrigatoria;
        setQuestions(updatedQuestions);
      };

    const handleTitleChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = value;
        setQuestions(updatedQuestions);
      };

      const handleDescriptionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].description = value;
        setQuestions(updatedQuestions);
      };

    const handleResponseTypeChange = (index: number, value: number | null) => {
        const updatedQuestions = [...questions];
        const selectedType = responseOption.find((type) => type.id === value);

        updatedQuestions[index].responseOptionId = value;
        updatedQuestions[index].responseOptions = selectedType ? selectedType : selectedType; // Armazena as opções de resposta, se houver

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
                                onDescriptionChange={handleDescriptionChange}
                                onResponseTypeChange={handleResponseTypeChange}
                                onOccupationChange={handleOccupationChange}
                                occupationEnumMap={occupationEnumMap}
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
