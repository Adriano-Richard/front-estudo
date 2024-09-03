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

//Criar arquivos para as interfaces e classes
interface IFormData{
    name: string;
    questionCount: number;
}

type Question = {
    id: string;
    title: string;
    responseType: 'text' | 'radio' | 'dropdown';
    isRequired: boolean;
  };


//Criar arquivo para constantes e funções
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required().min(3),
    questionCount: yup.number().required(),
});

export const DetalheDeQuestoes: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    // const [boxes, setBoxes] = useState([{}]);

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const [questions, setQuestions] = useState<Question[]>([]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: `question-${questions.length}`, title: '', responseType: 'text', isRequired: false }]);
    };

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

    const handleResponseTypeChange = (index: number, value: 'text' | 'radio' | 'dropdown') => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].responseType = value;
        setQuestions(updatedQuestions);
    };    

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const reorderedQuestions = [...questions];
        const [removed] = reorderedQuestions.splice(result.source.index, 1);
        reorderedQuestions.splice(result.destination.index, 0, removed);
        setQuestions(reorderedQuestions);
    };

    const renderResponseField = (responseType: 'text' | 'radio' | 'dropdown') => {
        switch (responseType) {
          case 'text':
            return <TextField fullWidth placeholder="Resposta do usuário" />;
          case 'radio':
            return (
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel
                        value="disabled"
                        disabled
                        control={<Radio />}
                        label="other"
                    />
                    </RadioGroup>
            </FormControl>
            );
          case 'dropdown':
            return (
              <Select fullWidth displayEmpty>
                <MenuItem value="" disabled>Selecione uma opção</MenuItem>
                <MenuItem value="option1">Opção 1</MenuItem>
                <MenuItem value="option2">Opção 2</MenuItem>
              </Select>
            );
          default:
            return null;
        }
      };

    // const handleAddBox = () => {
    //     setBoxes([...boxes, {}]); // Adiciona uma nova caixa
    //   };

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);
        
                if(id === 'nova'){
                    AvaliationService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/avaliation');
                                } else {
                                    navigate(`/avaliation/detalhe/${result}`);
                                }
                            }
                        });
                }   else {
                        AvaliationService
                            .updateById(Number(id), dadosValidados)
                            .then((result) => {
                                setIsLoading(false);
                                if (result instanceof Error) {
                                    alert(result.message);
                                } else {
                                    if (isSaveAndClose()) {
                                        navigate('/avaliation');
                                    }
                                }
                            });
                    }
            })
            .catch((errors: yup.ValidationError) => {
                const ValidationErrors: IVFormErros = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    ValidationErrors[error.path] = error.message;
                });
                console.log(ValidationErrors);
                formRef.current?.setErrors(ValidationErrors);
            })
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
        if (id !== 'nova'){
            setIsLoading(true);

            AvaliationService.getByName(id)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/avaliacoes');
                    } else {
                        setNome(result.name);
                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                name: ''
            });
        }
    }, [id]);

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
                                    value={question.responseType}
                                    onChange={(e) => handleResponseTypeChange(index, e.target.value as 'text' | 'radio' | 'dropdown')}
                                >
                                    <MenuItem value="text">Texto</MenuItem>
                                    <MenuItem value="radio">Radiobutton</MenuItem>
                                    <MenuItem value="dropdown">Dropdown</MenuItem>
                                </Select>
                                <Box marginTop={2}>
                                    {renderResponseField(question.responseType)}
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