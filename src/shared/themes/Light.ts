import { createTheme } from '@mui/material';
import { blue, cyan } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#088395',
      dark: blue[800],
      light: blue[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    },
  },
  typography:{
    allVariants:{
      fontFamily: 'inherit',
      color: '#071952'
    }
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          color: '#071952', // Define a cor padrão para todos os ícones
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            color: '#03346E', // Cor do texto para células no TableHead
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
            color: '#03346E', // Cor do texto para células no TableHead
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
              borderColor: '#6EACDA', // Cor da borda antes de focar
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