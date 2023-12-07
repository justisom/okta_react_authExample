__webpack_nonce__ = window.nonce

import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { Box } from "@mui/material";

import LoadingIcon from './common/components/LoadingIcon';

import { RequireAuth } from './apps/Main/components/SecureRoute';

import { lightTheme } from './styles/themes';

import Home from './apps/Main/Home';
import Login from './apps/Main/Login';

const cache = createCache({
  key: 'some-dang-key',
  nonce: __webpack_nonce__,
  prepend: true,
});

// const storageType = 'localStorage';
const storageType = 'sessionStorage';

// const config = {
//   issuer: process.env.OKTA_ISSUER,
//   clientId: process.env.OKTA_CLIENT_ID,
//   redirectUri: window.location.origin + '/oidc/callback',
//   scopes: ['openid', 'profile', 'email', 'offline_access'],
//   tokenManager: {
//     storage: storageType
//   },
//   storageManager: {
//     token: {
//      storageType: storageType,
//      storageTypes: []
//     },
//     cache: {
//      storageType: storageType,
//      storageTypes: []
//    },
//    transaction: {
//      storageType: storageType,
//      storageTypes: []
//    }
//  },
//   pkce: true
// }

const config = {
  issuer: process.env.OKTA_ISSUER,
  clientId: process.env.OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/oidc/callback',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  tokenManager: {
    storage: storageType
  },  
}

const oktaAuth = new OktaAuth(config);

const PageNotFound404 = (props) => {
  console.log(window.location.href);
  return (
    <div>
      <h1>404 - Not found</h1>
      <h3>(I promise this will look nice someday.)</h3>
    </div>
  );
};


const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth,  originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  const light = lightTheme;
  return (
      <Security
        oktaAuth={oktaAuth} 
        restoreOriginalUri={restoreOriginalUri}
      >
        <CacheProvider value={cache}>
          <Box
            id='app-root-container'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              m: -1,
            }}
          >
            <ThemeProvider theme={light}>
              <Fragment>
                <Suspense fallback={<LoadingIcon />}>
                  <Routes>
                    <Route path='/' exact={true} element={<RequireAuth />}>
                      <Route path='' element={<Home />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/oidc/callback' element={<LoginCallback />} />
                    <Route path='*' element={<PageNotFound404 />} />
                  </Routes>
                </Suspense>
              </Fragment>
            </ThemeProvider>
          </Box>
        </CacheProvider>
      </Security>  
  )
}

export default App;
