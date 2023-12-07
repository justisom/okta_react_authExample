import { Component } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


class LoadingIcon extends Component {
    constructor(props) {
      super(props)        
    };

    render() {
      return (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="success" />  
          </Box>  
        </Box>
      )
    }
  }

export default LoadingIcon;