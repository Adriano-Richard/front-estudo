import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentasDaListagem } from "../../components"
import { LayoutBaseDePagina } from "../../layouts"
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/UseDebounce";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../environment";
import { IListUniversity, UniversityService } from "../../services/universities/UniversityService";


export const ListagemDeUniversidades: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<IListUniversity[]>([]);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            UniversityService.getAll(pagina, busca)
            .then((result) => {
                setIsLoading(false);
                
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);

                    setRows(result.data);
                    setTotalCount(result.totalCount);
                }
            });
        })
        
    }, [busca, pagina]);

    return (
        <LayoutBaseDePagina
        titulo='Universidades'
        barraDeFerramentas={<FerramentasDaListagem
            mostrarInputBusca
            textoDaBusca={busca}
            textoBotaoNovo='Nova' 
            aoClicarEmNovo={() => navigate('/universidades/detalhe/nova')}
            aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
            />
        }         
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Sigla</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.sigla}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ mr: 2 }}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => navigate(`/universidades/detalhe/${row.name}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
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