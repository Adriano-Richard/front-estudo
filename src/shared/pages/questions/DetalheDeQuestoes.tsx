import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useEffect, useState } from "react";
import { AvaliationService } from "../../services/avaliations/AvaliationService";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, LinearProgress, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErros } from "../../forms";
import * as yup from "yup";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Delete, ContentCopy, StarBorder, Star } from "@mui/icons-material";
import { ResponseOptionsService } from "../../services/response-options/ResponseOptionsService";

//Criar arquivos para as interfaces e classes
interface IFormData{
    name: string;
    questionCount: number;
}

type Question = {
    id: string;
    title: string;
    responseTypeId: number | null;
    isRequired: boolean;
    responseOptions?: string[];
  };

  interface IResponseOption {
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

    const handleResponseTypeChange = (index: number, value: number) => {
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

    const renderResponseField = (question: Question) => {
        const selectedType = responseTypes.find((type) => type.id === question.responseTypeId);

        if (!selectedType) return null;

        switch (selectedType.namePatterns) {
            case 'Text':
                return <TextField fullWidth placeholder="Resposta do usuário" />;
            case 'DropDown':
                return (
                    <Select fullWidth displayEmpty>
                        <MenuItem value="" disabled>Selecione uma opção</MenuItem>
                        {question.responseOptions?.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                );
            case 'RadioButton':
                return (
                    <FormControl>
                        <FormLabel>Selecione uma opção</FormLabel>
                        <RadioGroup row>
                            {question.responseOptions?.map((option, index) => (
                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                );
            default:
                return null;
        }
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
                    navigate('/');
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
                                        <IconButton onClick={() => handleRemoveQuestion(index)}>
                                            <Delete />
                                        </IconButton>
                                        <IconButton onClick={() => handleDuplicateQuestion(index)}>
                                            <ContentCopy />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    label="Título da Questão"
                                    value={question.title}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                />
                                <Select
                                    fullWidth
                                    value={question.responseTypeId || ''}
                                    onChange={(e) => handleResponseTypeChange(index, Number(e.target.value))}
                                >
                                    <MenuItem value="" disabled>Selecione o tipo de resposta</MenuItem>
                                    {responseTypes.map((type) => (
                                        <MenuItem key={type.id} value={type.id}>{type.namePatterns}</MenuItem>
                                    ))}
                                </Select>
                                <Box marginTop={2}>
                                    {renderResponseField(question)}
                                </Box>
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