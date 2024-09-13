import { Box, Button, Icon, Paper, TextField, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Environment } from "../../environment";
import { useCompactMenuContext } from "../../contexts";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDeBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo,
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { isCompact } = useCompactMenuContext();

    // Determina se o botão novo deve ser visível
    const botaoNovoVisivel = mostrarBotaoNovo !== undefined ? mostrarBotaoNovo : !(smDown && !isCompact);

    return (
        <Box
            height={theme.spacing(7)}
            marginX={1}
            padding={1}
            paddingX={3}
            display="flex"
            gap={1}
            alignItems="center"
            component={Paper}
            boxShadow={0}
        >
            {mostrarInputBusca && (
                <TextField
                    size="small"
                    value={textoDaBusca}
                    placeholder={Environment.INPUT_DE_BUSCA}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    variant="outlined"
                    sx={{ boxShadow: 'none' }}
                />
            )}

            <Box flex={1} display="flex" justifyContent="end">
                {botaoNovoVisivel && (
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon sx={{ color: 'white' }}>add</Icon>}
                        sx={{ height: theme.spacing(5) }} // Ajusta a altura do botão para corresponder ao TextField
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>
        </Box>
    );
};
