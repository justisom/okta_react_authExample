import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { useTheme } from "@mui/material/styles"
import { Box, Typography } from '@mui/material';

import ControlBar from './components/ControlBar/ControlBar';
import LoadingIcon from "../../common/components/LoadingIcon";

const Home = (props) => {
  const theme = useTheme();

  // State initialization =====================================================
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(
    {
      user_fullname: 'Chad Chorgleson'
    }
  );
  const [viewSelected, setViewSelected] = useState(null);
  const [reloadToggle, setReloadToggle] = useState({});

  // State-noticers ===========================================================
  useEffect(() => {
    setLoading(false)
  }, [])

  const logout = async () => {
    try {
      await props.oktaAuth.signOut()
      .then(() => {
        console.log('logged out')
      })      
    } catch(err) {
      console.log(err);
    }    
  }

  // Helpers ==================================================================
  const handleLogout = () => {
    logout();    
    return null;
  }

  const updateView = (selection) => {
    const _toggle = { ...reloadToggle }
    if (_toggle[selection] || _toggle[selection] === undefined) {
      _toggle[selection] = 0;
    } else {
      _toggle[selection] = 1;
    }

    setViewSelected(selection);
    setReloadToggle(_toggle);
  }

  const setCurrentView = () => {
    const selected_view = selectDefaultBoard(viewSelected);
    let reload = reloadToggle[selected_view]
    if (selected_view === 'default') {
      return <DefaultBoard />
    } else if (selected_view === 'Logout') {
      handleLogout();
    } else {
      return null;
    }
  }

  const selectDefaultBoard = (selection) => {
    if (selection === undefined) {
      return 'default';
    } else {
      return selection;
    }
  }

  // Layouts ==================================================================
  const DefaultBoard = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography>BLANK</Typography>
      </Box>
    )    
  }

  const layout = () => {
    if (loading) {
      return <LoadingIcon />
    } else {
      return (
        <Box
          id="home-content-container-shell"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: theme.palette.primary.main
          }}
        >
          <Box
            id="home-toolbar-container-shell"
            sx={{
              display: "flex",
              mb: 0,
            }}
          >
            <ControlBar selected={updateView} user={userData} />
          </Box>
          <Box
            id="home-content-container-main"
            sx={{
              position: "relative",
              display: 'flex',
              flex: 1,
              
            }}
          >
            { setCurrentView() }
          </Box>
        </Box>
      );
    }
  }
  return layout();
}

export default withOktaAuth(Home);