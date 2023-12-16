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
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

// Home Made Hooks
import { useAuth, useUserType } from '../hooks/useAuth';

// Components
import { PasswordCard } from '../../components/changePasswordCard/changePasswordCard';
import { PasswordPopUp } from '../../components/passwordPopUp/passwordPopUp';
import { LogOutCard } from '../logOutCard/logOutCard';
import { Modal } from '../../components/modalCard/modalCard';
import { CreditCard } from '../../components/creditCard/creditCard';
import ViewPharmacistWalletPage from '../../pages/pharmacist/viewPharmacistWalletPage';
import ViewPatientWalletPage from '../../pages/patient/viewPatientWalletPage';

export const ResponsiveAppBar = ({ array }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElRegister, setAnchorElRegister] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [displayLogOutMessage, setDisplayLogOutMessage] = useState(false);
  const [displayWalet, setDisplayWallet] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('accessToken');
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState(array);
  console.log("Pages: ");
  console.log(pages);


  useEffect(() => {
    if (accessToken != null && accessToken != undefined && accessToken.split(' ')[1] != "") {
      setUserLoggedIn(true);
      setUsername(sessionStorage.getItem('username'));
      setName(sessionStorage.getItem('name'));
      setUserType(sessionStorage.getItem('userType'));
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
            <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
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
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                width: '100%',
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
                {pages != [] && pages.map((page, key) => (
                  <MenuItem key={key} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component="a"
                      href={page.url}
                      variant="h1"
                    >
                      {page.pageName}</Typography>
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
              {pages != [] && pages.map((page, key) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component="a"
                    href={page.url}
                    variant="label"
                    sx={{
                      my: 2,
                      height: '100%',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 1
                    }}
                  >
                    {page.pageName}</Typography>
                </MenuItem>
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
                    sx={{ my: 2, color: 'white', display: 'block', px: 0, width: 100 }}
                    PaperProps={{
                      style: {
                        width: 160,
                      },
                    }}
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
                    PaperProps={{
                      style: {
                        width: 210,
                      },
                    }}
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
                      <Avatar sx={{ backgroundColor: "#213547" }} alt="Person" src="../../assets/img/male.svg" />
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
                    PaperProps={{
                      style: {
                        width: 160,
                      },
                    }}
                  >

                    {/* Profile */}
                    {/* {
                  sessionStorage.getItem('userType') !== 'admin' && 
                  <MenuItem 
                    onClick={() => {
                      handleCloseUserMenu();
                    }}

                    component="a" 
                    href={`/${userType}/profile`}
                  >
                    <Typography 
                        textAlign="center"
                    >
                        {'Profile'}
                    </Typography>
                  </MenuItem>
                }*/}
                    {sessionStorage.getItem('userType') === 'pharmacist' &&
                      <MenuItem
                      >
                        <Typography
                          textAlign="center"
                        >
                          <ViewPharmacistWalletPage />
                        </Typography>
                      </MenuItem>
                    }

                    {sessionStorage.getItem('userType') === 'patient' &&
                      <MenuItem
                      >
                        <Typography
                          textAlign="center"
                        >
                          <ViewPatientWalletPage />
                        </Typography>
                      </MenuItem>
                    }

                    {
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu();
                          setOpen(!open);
                        }}
                      >
                        <Typography
                          textAlign="center"
                        >
                          {'Change Password'}
                        </Typography>
                      </MenuItem>
                    }

                    {/* Wallet */}
                    {/*                 {
                  sessionStorage.getItem('userType') !== 'admin' &&
                    <MenuItem 
                    onClick={() => {
                      handleCloseUserMenu();
                    }}

                    onMouseOver={() => {
                      setDisplayWallet(true);
                    }}

                    
                    onMouseLeave={() => {
                      setDisplayWallet(false);
                    }}
                  >
                    <Typography 
                        textAlign="center"
                    >
                        {'Wallet'}
                    </Typography>
                  </MenuItem>
                } */}

                    {/* Log Out */}
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        setDisplayLogOutMessage(true);
                      }}
                    >
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
      {open &&
        (<PasswordPopUp showPasswordCard={setOpen} />)
      }
      {
        displayWalet &&
        (
          <div style={{ zIndex: 100, position: 'absolute', top: '20%', left: '55%' }}>
            <CreditCard><ViewPharmacistWalletPage></ViewPharmacistWalletPage></CreditCard>
          </div>
        )
      }
    </>
  );
}