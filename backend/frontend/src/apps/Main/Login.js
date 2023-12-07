import { Navigate } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Button,
  Typography
} from '@mui/material';

const Login = (props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const theme = useTheme();

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  }

  const layout = () => {
    if (authState?.isAuthenticated) {
      console.log('already authenticated. Going to main page.')
      return <Navigate to='/' replace={true} />
    } else {
      return (
        <Box
          id='login-primary-layout'
          sx={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.loginMain,
          }}
        >
          <Box
            id='login-content-layout'
            sx={{
              backgroundColor: theme.palette.primary.main,
              minWidth: 300,
              minHeight: 300,
              borderRadius: '50%',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              variant="text"
              disableElevation
              onClick={handleLogin}
              sx={{
                mt: 3,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.loginLight
                }
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.title.main,
                  fontSize: 24,
                }}
              >
                Login
              </Typography>
            </Button>
          </Box>
        </Box>
      )
    }
  } 
  
  return layout();
}

export default Login;