import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

interface AdminNavbarProps {
  brandText: string;
  sidebarOpened: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  brandText,
  sidebarOpened,
  toggleSidebar,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <AppBar position="static">
        <StyledToolbar>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
            {brandText}
            </Typography>
            <div>
            <IconButton
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
            </div>
        </StyledToolbar>
        </AppBar>
        <Box height='100vh'>
                {children}
        </Box> 
    </>
  );
};

export default AdminNavbar;
