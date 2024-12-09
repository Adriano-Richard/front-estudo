import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useCompactMenuContext } from "../../contexts";

const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: "space-between",
  paddingLeft: 16,
  paddingRight: 16,
}));

interface AdminNavbarProps {
  brandText: string;
  children?: React.ReactNode;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  brandText,
  children,
}) => {
  const { isCompact } = useCompactMenuContext(); // Usa o estado do menu lateral

  const sidebarWidth = isCompact ? 56 : 240; // Largura do menu lateral (compacto ou expandido)

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#ffffff",
        color: "#000000",
        left: `${sidebarWidth}px`, // Ajusta a posição com base no menu lateral
        width: `calc(100% - ${sidebarWidth}px)`, // Preenche o espaço restante
        transition: "all 0.3s", // Suaviza a transição
      }}
    >
      <StyledToolbar>
        <Typography variant="h6" noWrap>
          {brandText}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {children}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default AdminNavbar;
