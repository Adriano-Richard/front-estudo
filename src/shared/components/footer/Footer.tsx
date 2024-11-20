import { Box, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Detecta se é mobile

  return (
    <Box
      component="footer"
      width="100%"
      bgcolor={theme.palette.background.paper}
      padding={theme.spacing(2)}
      position="relative" // Para garantir que ele seja parte do fluxo e não sobreponha
      zIndex={1000}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      boxShadow={theme.shadows[4]}
      marginTop={theme.spacing(2)} // Garante um pequeno espaço acima no layout
      // Aqui utilizamos o sx para passar estilos adicionais
      sx={{
        transform: smDown ? 'translateY(100%)' : 'none', // Em mobile, o footer começa fora da tela
        transition: 'transform 0.3s ease-in-out', // Para uma transição suave
      }}
    >
      <Box flexDirection="row" display="flex" justifyContent="space-around" width="100%">
        <Box textAlign="center" marginBottom={theme.spacing(1)}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Projeto de graduação do curso de Ciência da Computação
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Universidade Federal do Tocantins
          </Typography>
        </Box>

        <Box textAlign="center" marginBottom={theme.spacing(1)}>
          <Typography variant="body2" color="textSecondary">
            Aluno: Adriano Richard Dantas da Conceição Zanetti
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Orientador: George Lauro Ribeiro de Brito
          </Typography>
        </Box>
      </Box>

      <Divider style={{ width: '80%', margin: theme.spacing(1, 0) }} />

      <Box textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Autoavaliação da Rede Nacional PROFIAP - Mestrado de Administração Pública
        </Typography>
      </Box>

      <Divider style={{ width: '80%', margin: theme.spacing(1, 0) }} />

      <Box textAlign="center">
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Sistema de autoavaliação. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
};
