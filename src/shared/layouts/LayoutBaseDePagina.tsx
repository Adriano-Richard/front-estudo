import { Card, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
    children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();
    // const { toggleDrawerOpen } = UseDrawerContext();

    return(
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={2} display="flex" alignItems="center" gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8: 12)} >
                
                <Typography 
                    variant={smDown ? 'h5': mdDown ? 'h5' : 'h5'}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    fontWeight="bold"
                    //sx={{ color: '#071952' }}
                >
                    {titulo}
                </Typography>
                
            </Box>
            <Box padding={2} >
                <Card sx={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    {barraDeFerramentas &&(
                        <Box>
                            {barraDeFerramentas}
                        </Box>
                    )}
                    <Box padding={3} flex={1} overflow="auto">
                        {children}
                    </Box>
                </Card>
            </Box>
            
        </Box>
    );
};