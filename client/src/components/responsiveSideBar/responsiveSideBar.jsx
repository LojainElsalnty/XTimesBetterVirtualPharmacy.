import * as React from 'react';

// Styles
import styles from './responsiveSideBar.module.css';

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Tooltip
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as Tool } from 'react-tooltip'

export const ResponsiveSideBar = ({ array }) => {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [userType, setUserType] = useState(sessionStorage.getItem('userType'));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
        {array.map((element, index) => (
          <ListItem key={element.pageName} disablePadding sx={{
            '&:hover': {
              backgroundColor: "#e2ebf2",
              color: "black",
              textDecoration: "none",
            },
          }}>
            <ListItemButton component="a" href={`${element.url}`} sx={{ textDecoration: "none" }}>
              <ListItemIcon sx={{ width: "20%" }}>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText primary={element.pageName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={styles['sidebar-main-div']}>
      <React.Fragment key={"left"}>
        <Button sx={{
          color: "white", '&:hover': {
            backgroundColor: "#125594",
            color: "white"
          }
        }} className={styles['view-button']} onClick={() => navigate(-1)}
          data-tooltip-id="back"
          data-tooltip-content="Back"
          data-tooltip-place="bottom"
        >
          <ArrowBackIcon></ArrowBackIcon>
        </Button>
        <Button sx={{
          color: "white", '&:hover': {
            backgroundColor: "#125594",
            color: "white"
          }
        }} className={styles['view-button']} onClick={() => navigate(1)}
          data-tooltip-id="forward"
          data-tooltip-content="Forward"
          data-tooltip-place="bottom"
        >
          <ArrowForwardIcon></ArrowForwardIcon>
        </Button>
        {/* <Button sx={{color: "white", '&:hover': {
                    backgroundColor: "#125594",
                    color: "white"
                    }}} className={styles['view-button']} onClick={toggleDrawer("left", true)}
                    data-tooltip-id="side_bar"
                    data-tooltip-content="Side Bar"
                    data-tooltip-place="bottom"
            >
            <DehazeIcon></DehazeIcon>
        </Button> */}
        {/* 
        {
          sessionStorage.getItem("userType") === "admin" ? <></> :
            <Button sx={{color: "white", '&:hover': {
                      backgroundColor: "#125594",
                      color: "white"
                      }}} 
                      className={styles['view-button']}
                      component="a"
                      href={`/${userType}/profile`}
                      data-tooltip-id="home"
                      data-tooltip-content="Home"
                      data-tooltip-place="bottom"
            >
              <HomeIcon></HomeIcon>
          </Button>
        } */}



        {
          sessionStorage.getItem("userType") === "admin" ? <></> :
            <Button
              sx={{
                color: "white",
                '&:hover': {
                  backgroundColor: "#125594",
                  color: "white"
                }
              }}
              className={styles['view-button']}
              component="a"
              href={`/${userType}/ChatPage`}
              data-tooltip-id="chat"
              data-tooltip-content="Chat"
              data-tooltip-place="bottom"
            >
              <ChatIcon></ChatIcon>
            </Button>
        }

        {
          sessionStorage.getItem("userType") !== "pharmacist" ? <></> :
            <Button
              sx={{
                color: "white",
                '&:hover': {
                  backgroundColor: "#125594",
                  color: "white"
                }
              }}
              className={styles['view-button']}
              component="a"
              href={`/${userType}/notifications`}
              data-tooltip-id="notification"
              data-tooltip-content="Notification"
              data-tooltip-place="bottom"
            >
              <NotificationsIcon></NotificationsIcon>
            </Button>
        }

        <Drawer
          PaperProps={{
            sx: { width: "250px" },
          }}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}

        >
          {list("left")}
        </Drawer>
      </React.Fragment>
      <Tool id="back" />
      <Tool id="forward" />
      <Tool id="side_bar" />
      <Tool id="home" />
      <Tool id="chat" />
    </div>
  );
}
