import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#088395',
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    }
  },
  typography:{
    allVariants:{
      fontFamily: 'inherit',
      color: '#E2E2B6',
    }
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          color: '#6EACDA', // Define a cor padrão para todos os ícones
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            color: '#088395', // Cor do texto para células no TableHead
            //backgroundColor: '#f0f0f0', // Cor de fundo para células no TableHead (opcional)
            fontWeight: 'bold', // Negrito para o texto das células no TableHead (opcional)
            //textAlign: 'center',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            color: '#088395', // Cor do texto para células no TableHead
            //textAlign: 'center',
            //backgroundColor: '#f0f0f0', // Cor de fundo para células no TableHead (opcional)
            //fontWeight: 'bold', // Negrito para o texto das células no TableHead (opcional)
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#03346E', // Cor da borda antes de focar
            },
            '&:hover fieldset': {
              borderColor: '#1565c0', // Cor da borda ao passar o mouse
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0d47a1', // Cor da borda ao focar
            },
            //color: '#6EACDA', // Cor do texto e do placeholder
          },
        },
      },
    },
  },
});