import { useEffect, useState } from "react";
import { VForm, useVForm} from "../../forms";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ResponseOptionsService } from "../../services/response-options/ResponseOptionsService";
import { Box, Button, Grid, IconButton, LinearProgress, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import QuestionList from "./RenderResponseField/QuestionList";

//Criar arquivos para as interfaces e classes
interface IFormData{
    name: string;
    questionCount: number;
}

export type Question = {
    id: string;
    title: string;
    responseTypeId: number | null;
    isRequired: boolean;
    responseOptions?: string[];
  };

export interface IResponseOption {
    id: number;
    namePatterns?: string;
    responses?: string[];
}

//Criar arquivo para constantes e funções

export const DetalheDeQuestoes: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const [questions, setQuestions] = useState<Question[]>([]);

    const [responseTypes, setResponseTypes] = useState<IResponseOption[]>([]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: `question-${questions.length}`, title: '', responseTypeId: null, isRequired: false }]);
    }

    const toggleRequired = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isRequired = !updatedQuestions[index].isRequired;
        setQuestions(updatedQuestions);
      };

    const handleTitleChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].title = value;
        setQuestions(updatedQuestions);
      };

    const handleResponseTypeChange = (index: number, value: number | null) => {
        const updatedQuestions = [...questions];
        const selectedType = responseTypes.find((type) => type.id === value);

        updatedQuestions[index].responseTypeId = value;
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

    const handleSave = (dados: IFormData) => {
        
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

    useEffect(() => {
        setIsLoading(true);
        ResponseOptionsService.getAll()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    //navigate('/');
                } else {
                    setResponseTypes(result.data);
                }
            });
    }, []);

    return(
        <LayoutBaseDePagina 
            titulo={id === 'nova' ? 'Nova Questão' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={save}
                    aoClicarEmApagar={() => {  }}
                    aoClicarEmNovo={() => navigate('questoes/detalhe/nova')}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/questoes')}
                />
            }
        >
            {isLoading &&(
                <LinearProgress variant="indeterminate" />
            )}
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
                                responseTypes={responseTypes}
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
            <VForm ref={formRef} onSubmit={handleSave}>
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
        </LayoutBaseDePagina>
    );
}