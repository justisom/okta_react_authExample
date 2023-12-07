import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Navigate, Outlet } from "react-router-dom";

import LoadingIcon from '../../../common/components/LoadingIcon';

export const RequireAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [ notLoggedIn, setNotLoggedIn ] = useState(false);

  useEffect(() => {
  }, [authState])

  useEffect(() => {
    if (!authState) {
      console.log('authState not initialized.')
      return;
    }

    if (!authState?.isAuthenticated) {
      console.log('user not authenticated')
      setNotLoggedIn(true);
    } else {
      console.log('user is authenticated!')
      setNotLoggedIn(false)
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    if (notLoggedIn) {
      console.log("load login page");
      return <Navigate to='/login' replace={true} />
    } else {
      console.log(
        "Route not Authenticated. Waiting for authentication page to load."
      );
      return <LoadingIcon />
    }
  }

  return (<Outlet />);
}