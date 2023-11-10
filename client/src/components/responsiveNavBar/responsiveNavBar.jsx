import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// Pages
const pages = ['Products', 'About Us'];
const settings = ['Profile', 'Logout'];

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

// Home Made Hooks
import { useAuth } from '../hooks/useAuth';

// Home Made Components
import { LogOutCard } from '../logOutCard/logOutCard';

export const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElRegister, setAnchorElRegister] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [displayLogOutMessage, setDisplayLogOutMessage] = useState(false);
  const navigate = useNavigate();
  // const {accessToken, refreshToken} = useAuth();
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken.split(' ')[1] != "") {
      setUserLoggedIn(true);
    }
    else {
      setUserLoggedIn(false);
    }
  }, [accessToken]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Login
  const handleLogin = () => {
    navigate('/login');
  }

  // Register
  const handleOpenRegisterMenu = (event) => {
    setAnchorElRegister(event.currentTarget);
  };
  const handleCloseRegisterMenu = () => {
    setAnchorElRegister(null);
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ backgroundImage: 'linear-gradient(45deg, black, transparent)' }}>
          <Toolbar disableGutters sx={{ height: '1px !important' }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {
                  xs: 'none',
                  md: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                width: '50%',
                height: '100%',
              }}
            >
              X-Pharmacy
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                height: '50%',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>


            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'row', justifyContent: 'right' }}>
              {/* Log In Button */}
              {!userLoggedIn && (
                <Button
                  key={'Log In'}
                  onClick={handleLogin}
                  sx={{ my: 2, color: 'white', display: 'block', px: 2 }}
                >
                  LOGIN
                </Button>)}

              {/* Registeration Button */}
              {!userLoggedIn && (
                <Box sx={{ flexGrow: 0, width: 'auto' }}>
                  <Button
                    key={'Registration'}
                    onClick={handleOpenRegisterMenu}
                    sx={{ my: 2, color: 'white', display: 'block', px: 0, width: 'auto' }}
                  >
                    REGISTER
                  </Button>

                  <Menu
                    sx={{ mt: '50px' }}
                    id="menu-appbar"
                    anchorEl={anchorElRegister}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElRegister)}
                    onClose={handleCloseRegisterMenu}
                  >
                    <MenuItem key={'Register As A Patient'} onClick={handleCloseRegisterMenu} component="a" href={"/patientRegister"}>
                      <Typography
                        textAlign="center"
                      >
                        {'Register As A Patient'}
                      </Typography>
                    </MenuItem>

                    <MenuItem key={'Register As A Pharmacist'} onClick={handleCloseRegisterMenu} component="a" href={"/pharmacistRequest"}>
                      <Typography
                        textAlign="center"
                      >
                        {'Register As A Pharmacist'}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}

              {/* Logged In User Nav bar */}
              {userLoggedIn && (
                <Box sx={{ flexGrow: 0, display: { md: 'flex', justifyContent: 'right' } }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, justifyContent: 'right', alignItems: 'center' }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >

                    {/* Change Password */}
                    <MenuItem key={'Change Password'} onClick={() => {
                      handleCloseRegisterMenu();
                      navigate('/changePassword');
                    }}>
                      <Typography
                        textAlign="center"
                      >
                        {'Change Password'}
                      </Typography>
                    </MenuItem>

                    {/* Log Out */}
                    <MenuItem key={'Log Out'} onClick={() => {
                      handleCloseUserMenu();
                      setDisplayLogOutMessage(true);
                    }}>
                      <Typography
                        textAlign="center"
                      >
                        {'Log Out'}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {displayLogOutMessage && (<LogOutCard showLogOutCard={setDisplayLogOutMessage} ></LogOutCard>)}
    </>
  );
}