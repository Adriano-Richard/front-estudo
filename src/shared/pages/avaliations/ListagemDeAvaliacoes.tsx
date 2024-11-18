import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../components"
import { LayoutBaseDePagina } from "../../layouts"
import { useEffect, useMemo, useState } from "react";
import { AvaliationService, IListAvaliation } from "../../services/avaliations/AvaliationService";
import { useDebounce } from "../../hooks/UseDebounce";
import { Button, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../environment";
import { useAuthContext } from "../../contexts";


export const ListagemDeAvaliacoes: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<IListAvaliation[]>([]);
    const [answeredEvaluations, setAnsweredEvaluations] = useState<Record<string, boolean>>({});

    const { user } = useAuthContext();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
    
        const fetchData = async () => {
            try {
                const result = await AvaliationService.getAll(pagina, busca);
    
                setIsLoading(false);
    
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setRows(result.data);
                    setTotalCount(result.totalCount);
    
                    // Verificar se o usuário respondeu a cada avaliação
                    const verificationPromises = result.data.map(async (avaliation) => {
                        const isAnswered = await AvaliationService.verifyResponse(avaliation.name);
                        return { [avaliation.name]: isAnswered };
                    });
    
                    const verificationResults = await Promise.all(verificationPromises);
                    const answeredMap = verificationResults.reduce((acc, current) => ({ ...acc, ...current }), {});
                    setAnsweredEvaluations(answeredMap);
                }
            } catch (error) {
                setIsLoading(false);
                alert("Erro ao carregar dados.");
            }
        };
    
        fetchData();
    }, [busca, pagina]);

    // const handleDelete = (id: number) => {
    //     if (confirm('Realmente deseja apagar?')){
    //         AvaliationService.deleteById(id)
    //             .then(result => {
    //                 if(result instanceof Error){
    //                     alert(result.message);
    //                 } else{
    //                      setRows(oldRows => [
    //                          ...oldRows.filter(oldRow => oldRow.id !== id),
    //                      ]);
    //                      alert('Registro apagado com sucesso!');
    //                 }
    //             })
    //     }
    // };

    return (
        <LayoutBaseDePagina
        titulo='Avaliações'
        barraDeFerramentas={<FerramentasDaListagem
            mostrarInputBusca
            textoDaBusca={busca}
            textoBotaoNovo='Nova' 
            aoClicarEmNovo={() => navigate('/avaliacoes/detalhe/nova')}
            aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
            />
        }         
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Quantidade de questões</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.questionCount}</TableCell>
                                <TableCell>
                                    {user?.cargo === 'admin' ? (
                                        <>
                                            <IconButton sx={{ mr: 2 }}>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                            <IconButton onClick={() => navigate(`/avaliacoes/detalhe/${row.name}`)}>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </>
                                    ) : (
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => navigate(`/avaliacoes/responder/${row.name}`)}
                                            disabled={answeredEvaluations[row.name]}
                                        >
                                            Responder
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading &&(
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                        <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                        <Pagination
                                            page={pagina}
                                            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)} 
                                            onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                            />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    )
}