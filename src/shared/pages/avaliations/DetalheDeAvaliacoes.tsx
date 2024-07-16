import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useEffect, useState } from "react";
import { AvaliationService } from "../../services/avaliations/AvaliationService";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField, VForm, useVForm, IVFormErros } from "../../forms";
import * as yup from "yup";


interface IFormData{
    name: string;
    questionCount: number;
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required().min(3),
    questionCount: yup.number().required(),
});

export const DetalheDeAvaliacoes: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

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
            <p>Detalhe de Avaliações {id}</p>

            <VForm ref={formRef} onSubmit={handleSave}>
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
        </LayoutBaseDePagina>
    );
}