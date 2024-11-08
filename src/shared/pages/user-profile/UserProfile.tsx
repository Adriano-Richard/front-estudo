import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../layouts";
import { FerramentasDeDetalhe } from "../../components";
import { useEffect, useState } from "react";
import { AvaliationService } from "../../services/avaliations/AvaliationService";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, LinearProgress, TextField, Typography } from "@mui/material";
import { useVForm, IVFormErros } from "../../forms";
import * as yup from "yup";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

interface IFormData {
    name: string;
    questionCount: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required().min(3),
    questionCount: yup.number().required(),
});

export const UserProfile: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [formData, setFormData] = useState<IFormData>({ name: '', questionCount: 0 });

    const handleSave = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados: IFormData) => {
                setIsLoading(true);
                const dadosComoString = JSON.stringify(dadosValidados);

                if (id === 'nova') {
                    AvaliationService.create(dadosComoString).then((result) => {
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
                } else {
                    AvaliationService.updateById(Number(id), dadosValidados).then((result) => {
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
                formRef.current?.setErrors(ValidationErrors);
            });
    };

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            AvaliationService.getByName(id).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/avaliacoes');
                } else {
                    setNome(result.name);
                    formRef.current?.setData(result);
                    setFormData({ name: result.name, questionCount: result.questionCount ?? 0 });
                }
            });
        } else {
            formRef.current?.setData({ name: '', questionCount: 0 });
        }
    }, [id]);

    return (
        <LayoutBaseDePagina 
            titulo={id === 'nova' ? 'Nova Avaliação' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}
                    aoClicarEmSalvar={save}
                    aoClicarEmApagar={() => {}}
                    aoClicarEmNovo={() => navigate('avaliacoes/detalhe/nova')}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmVoltar={() => navigate('/avaliacoes')}
                />
            }
        >
            {isLoading && <LinearProgress variant="indeterminate" />}
            <Container>
                <Grid container spacing={4}>
                    <Grid item md={8}>
                        <Card>
                            <CardHeader title={<Typography variant="h5">Edit Profile</Typography>} />
                            <CardContent>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label="Question Count"
                                            type="number"
                                            value={formData.questionCount}
                                            onChange={(e) => setFormData({ ...formData, questionCount: Number(e.target.value) })}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => handleSave(formData)}>
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                    <Card>
                        <CardContent>
                        <div style={{ textAlign: 'center' }}>
                            <Avatar
                            alt="Mike Andrew"
                            src="/path/to/image/emilyz.jpg"
                            sx={{ width: 100, height: 100, margin: '0 auto 10px' }}
                            />
                            <Typography variant="h5">Mike Andrew</Typography>
                            <Typography variant="subtitle1">Ceo/Co-Founder</Typography>
                        </div>
                        <Typography variant="body2" style={{ marginTop: 10 }}>
                            Do not be scared of the truth because we need to restart the
                            human foundation in truth And I love you like Kanye loves Kanye
                            I love Rick Owens’ bed design but the back is...
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item>
                            <IconButton color="primary">
                                <FacebookIcon />
                            </IconButton>
                            </Grid>
                            <Grid item>
                            <IconButton color="primary">
                                <TwitterIcon />
                            </IconButton>
                            </Grid>
                            <Grid item>
                            <IconButton color="primary">
                                <GoogleIcon />
                            </IconButton>
                            </Grid>
                        </Grid>
                        </CardActions>
                    </Card>
                    </Grid>
                </Grid>
                </Container>
        </LayoutBaseDePagina>
    );
}