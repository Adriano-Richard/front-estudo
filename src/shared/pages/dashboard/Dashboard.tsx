import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { FerramentasDeDetalhe } from "../../components"
import { LayoutBaseDePagina } from "../../layouts"
import { useEffect, useState } from "react";
import { AvaliationService } from "../../services/avaliations/AvaliationService";


export const Dashboard = () => {
    const [isLoadingAvaliations, setIsLoadingAvaliations] = useState(true);
    const [totalCountAvaliations, setTotalCountAvaliations] = useState(0);
    useEffect(() => {
            setIsLoadingAvaliations(true);

            AvaliationService.getAll(1)
            .then((result) => {
                setIsLoadingAvaliations(false);
                
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountAvaliations(result.totalCount);
                }
            });
            
        }, []);



    return (
        <LayoutBaseDePagina 
            titulo="Página Inicial" 
            barraDeFerramentas={<FerramentasDeDetalhe 
                mostrarBotaoNovo={false}
                mostrarBotaoSalvar={false}
                mostrarBotaoApagar={false}
                mostrarBotaoVoltar={false}
                />} 
            children={
                <Box width='100%' display='flex'>
                    <Grid container margin={2}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" align="center">
                                            Total de Avaliações
                                        </Typography>
                                        <Box padding={6} display="flex" justifyContent='center' alignItems="center">
                                            {!isLoadingAvaliations &&(
                                                <Typography variant="h1">
                                                    {totalCountAvaliations}
                                                </Typography>
                                            )}
                                            {isLoadingAvaliations &&(
                                                <Typography variant="h6">
                                                    Carregando...
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Card>
                                <CardContent>
                                        <Typography variant="h5" align="center">
                                            Total de algo
                                        </Typography>
                                        <Box padding={6} display="flex" justifyContent='center' alignItems="center">
                                            {!isLoadingAvaliations &&(
                                                <Typography variant="h1">
                                                    {totalCountAvaliations}
                                                </Typography>
                                            )}
                                            {isLoadingAvaliations &&(
                                                <Typography variant="h6">
                                                    Carregando...
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            }>

            
            
        </LayoutBaseDePagina>
    )
}