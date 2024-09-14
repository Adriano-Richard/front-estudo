import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useEffect, useState } from "react";
import { AvaliationService } from "../../services/avaliations/AvaliationService";
import { Box, Grid, LinearProgress, Paper, Tab, Tabs, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErros } from "../../forms";
import * as yup from "yup";
import { DetalheDeQuestoes } from "../questions/DetalheDeQuestoes";
import { RenderQuestion } from "../questions/RenderQuestions/RenderQuestions";


interface IFormData{
    name: string;
    questionCount?: number;
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required().min(3),
    questionCount: yup.number(),
});

export const DetalheDeAvaliacoes: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [originalNome, setOriginalNome] = useState('')

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
      };

    const handleSave = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then(async (dadosValidados) => {
                setIsLoading(true);
                
                try {
                    if (id === 'nova') {
                        const result = await AvaliationService.create(dadosValidados);
                        setIsLoading(false);
    
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/avaliacioes');
                            } else {
                                navigate(`/avaliacoes/detalhe/${result}`);
                            }
                        }
                    } else {
                        if (nome !== originalNome) {
                            const updateNameResult = await AvaliationService.updateName(originalNome, nome);
                            if (updateNameResult instanceof Error) {
                                alert(updateNameResult.message);
                                setIsLoading(false);
                                return;
                            } else{
                                if (isSaveAndClose()) {
                                    navigate('/avaliacoes');
                                } else{
                                     navigate(`/avaliacoes/detalhe/${nome}`);
                                }
                            }
                        }
                    }
                } catch (error) {
                    alert('Ocorreu um erro ao salvar.');
                    setIsLoading(false);
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
            });
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
                        const dados = Array.isArray(result) ? result[0] : result;

                        if (dados) {
                            setNome(dados.name);
                            setOriginalNome(dados.name);
                            if (formRef.current) {
                                formRef.current.setData(dados);
                            }
                        }
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
            titulo={id === 'nova' ? 'Nova Avaliação' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvar={save}
                    aoClicarEmApagar={() => {  }}
                    aoClicarEmNovo={() => navigate('avaliacoes/detalhe/nova')}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/avaliacoes')}
                />
            }
        >
            {isLoading &&(
                <LinearProgress variant="indeterminate" />
            )}
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Detalhes da Avaliação" />
                <Tab label="Questões" />
            </Tabs>
            {activeTab === 0 && (
                <VForm ref={formRef} onSubmit={handleSave}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
                        <Grid container direction="column" padding={2} spacing={2}>
                            
                            {isLoading &&(
                                <Grid item>
                                    <LinearProgress variant="indeterminate" />
                                </Grid>
                            )}

                            <Grid item>
                                <Typography variant="h6">Geral</Typography>
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                    <VTextField
                                        fullWidth
                                        disabled={isLoading}
                                        label="Nome"
                                        name='name'
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </VForm>
            )}
            {activeTab === 1 && (
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined" padding={2}>
                <Typography variant="h6">Questões da Avaliação</Typography>
                <RenderQuestion id={parseInt(id)} handleSave={handleSave} />
                </Box>
            )}
        </LayoutBaseDePagina>
    );
}