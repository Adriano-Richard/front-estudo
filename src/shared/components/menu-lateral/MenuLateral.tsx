import { Avatar, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import Icon from '@mui/material/Icon';
import { Box } from '@mui/system';
import { UseAppThemeContext, UseDrawerContext, useAuthContext, useCompactMenuContext } from '../../contexts';


import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLink {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
    isDrawerOpen: boolean;
}

const ListItemLink: React.FC<IListItemLink> = ({ to, icon, label, onClick, isDrawerOpen }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false});

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };
    
    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary={label} />}
        </ListItemButton>
    );
};

interface IMenuLateral{
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = UseDrawerContext();
    const { toggleTheme } = UseAppThemeContext();
    const { logout } = useAuthContext();
    const { isCompact, toggleCompact } = useCompactMenuContext();
    //const [isCompact, setIsCompact] = useState(false);
    const { user } = useAuthContext();

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/usuarios/detalhe'); // Substitua '/perfil' pela rota desejada
    };
    const handleLogout = () => {
        logout(); // Chama o método de logout do AuthContext
        navigate('/'); // Redireciona para a página de login
      };

    const filteredDrawerOptions = drawerOptions.filter((drawerOption) => {
        // Adicione a lógica para filtrar as opções de menu com base no cargo do usuário
        if (user?.cargo !== 'admin') {
            // Por exemplo, se for Aluno, não mostrar "Questões" e "Universidades"
            return drawerOption.path !== '/questoes/detalhe' && drawerOption.path !== '/universidades';
        }
        // Permitir todas as opções para outros cargos
        return true;
    });

    return(
        
            <><Drawer
            open={isDrawerOpen || !isCompact}
            variant={'permanent'}
            onClose={toggleDrawerOpen}
            PaperProps={{
                style: {
                    width: isCompact ? theme.spacing(7) : theme.spacing(28),
                    transition: 'width 0.3s',
                    boxShadow: theme.shadows[4],
                }
            }}
        >
            <Box height="100%" display="flex" flexDirection="column">
                <Box
                    width="100%"
                    height={theme.spacing(20)}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection={'column'}

                >
                    {!isCompact &&
                        <>
                            <Avatar
                                alt={user?.userName || 'Usuário'}
                                src="/user/anime3.png"
                                sx={{
                                    width: 90,
                                    height: 90,
                                    margin: '0 auto 0px',
                                    cursor: 'pointer'
                                }}
                                onClick={handleNavigate} // Adicione o evento de clique aqui
                            />
                            <Typography>{user?.userName || 'Usuário'}</Typography>
                            <Typography variant="subtitle2">{user?.cargo || 'Cargo'}</Typography>
                        </>}
                    {isCompact &&
                        <>
                            <Avatar
                                alt={user?.userName || 'Usuário'}
                                src="/user/anime3.png"
                                sx={{ width: 40, height: 40, margin: '100px auto 0px', cursor: 'pointer' }}
                                onClick={handleNavigate} />
                        </>}
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" justifyContent="center" height={theme.spacing(smDown ? 6 : mdDown ? 8 : 10)}>
                    {(
                        <List component="nav">
                            <IconButton onClick={toggleCompact} style={{ boxShadow: 'none' }}>
                                <Icon>{isCompact ? 'menu' : 'close'}</Icon>
                            </IconButton>
                        </List>
                    )}


                </Box>
                <Box flex={1}>
                    <List component="nav">
                        {filteredDrawerOptions.map(drawerOption => (
                            <ListItemLink
                                key={drawerOption.path}
                                icon={drawerOption.icon}
                                to={drawerOption.path}
                                label={drawerOption.label}
                                onClick={smDown ? toggleDrawerOpen : undefined}
                                isDrawerOpen={!isCompact} />
                        ))}
                    </List>
                </Box>

                <Box>
                    <List component="nav">
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>
                                <Icon>dark_mode</Icon>
                            </ListItemIcon>
                            {!isCompact && <ListItemText primary="Alternar tema" />}
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <Icon>logout</Icon>
                            </ListItemIcon>
                            {!isCompact && <ListItemText primary="Sair" />}
                        </ListItemButton>
                    </List>
                </Box>
            </Box>
        </Drawer><Box height='100vh' marginLeft={isCompact ? 7 : theme.spacing(28)} sx={{
            transition: 'margin-left 0.3s',
        }}>
                {children}
            </Box></>  
    );
};