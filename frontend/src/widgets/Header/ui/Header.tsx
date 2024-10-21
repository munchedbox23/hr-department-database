import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, Storage } from "@mui/icons-material";
import { appRoutes } from "@/shared/const/routes";

const pages = ["Учет отпусков", "Управление должностями", "Учет сотрудников"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppHeader: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const renderLogo = (isMobile: boolean) => (
    <Link to={appRoutes.home()}>
      <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "5px" }}>
        <Storage
          sx={{
            display: {
              xs: "none",
              md: isMobile ? "none" : "flex",
            },
            mr: 1,
          }}
        />
        <Typography
          variant={isMobile ? "h5" : "h6"}
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: {
              xs: "none",
              md: isMobile ? "none" : "flex",
            },
            flexGrow: isMobile ? 1 : 0,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          База данных
        </Typography>
      </Box>
    </Link>
  );

  const renderNavMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography sx={{ textAlign: "center" }}>{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const renderDesktopMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );

  const renderUserMenu = () => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Открыть настройки">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ height: "75px" }}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar disableGutters sx={{ height: "100%" }}>
          {renderLogo(false)}
          {renderNavMenu()}
          {renderLogo(true)}
          {renderDesktopMenu()}
          {renderUserMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
