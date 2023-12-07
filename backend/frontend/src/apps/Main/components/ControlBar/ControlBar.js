import { lazy, useState, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,  
} from '@mui/material';


const ControlBar = (props) => {
  const theme = useTheme(); 

  // State initializations
  const [anchorUser, setAnchorUser] = useState();

  const userMenuItems = [
    'Logout'
  ]

  const handleClick = (e) => {
    setAnchorUser(e.currentTarget.getAttribute('id') === 'contentbar-user-button' ? e.currentTarget: null);
  }

  const handleClose = () => {
    setAnchorUser(null);
  }


  const whatWasClicked = (e) => {
    if (e !== null) {
      e.preventDefault();
    }
    let choice = e.currentTarget.textContent;
        
    props.selected(choice);
    handleClose();
  }

  const menuOptions = (menuOptions, menuTitle) => {
    return (
      <div>
        <Divider textAlign="left" variant="middle">
          <Typography variant="overline" display="block" sx={{ fontSize: 8 }}>
            {menuTitle}
          </Typography>
        </Divider>
        {menuOptions.map((item, idx) => (
          <MenuItem key={idx} onClick={whatWasClicked}>
            <Typography>{item}</Typography>
          </MenuItem>
        ))}
      </div>
    )
  }

  const barLayout = (
    <Fragment>
      <Box
        id='contentbar-container'
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 60,
          maxHeight: 60,
          p: 0,        
          backgroundColor: theme.palette.secondary.light
        }}
      >
        <Box
          id='contentbar-menu-button-container'
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
        </Box>
        <Box
          id='contentbar-title-container'
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography sx={{color: theme.palette.title.main}}>TEST</Typography>
        </Box>
        <Box
          id='contentbar-user-button-container'
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'end',
            alignItems: 'center',
            pr: 2,
          }}
        >
          <IconButton
            id='contentbar-user-button'
            edge='start'
            color='inherit'
            aria-controls='contentbar-menu'
            aria-label='menu'
            aria-haspopup='true'
            onClick={handleClick}
            sx={{
              mx: 1,
              p: 0,
              width: 40,
              height: 40,
            }}
          >
            <Avatar 
              alt={props.user.user_fullname} />
          </IconButton>
          <Menu
            id="menu-user"
            anchorEl={anchorUser}
            keepMounted
            open={Boolean(anchorUser)}
            onClose={handleClose}
          >
            {menuOptions(userMenuItems, 'no-one')}
          </Menu>
        </Box>
      </Box>
    </Fragment>
  )

  return barLayout
}

export default ControlBar;