import axios from 'axios';
import { createContext, useEffect} from 'react';
import { useOktaAuth } from "@okta/okta-react";

const Aspects = {
  auth_user: {method: 'get', type: 'api', path: 'auth/user'},
  user_info: {method: 'get', type: 'api', path: 'user_info'},
  revoke: {method: 'post', type: 'api', path: 'auth/revoke'},
}

export const BackendAPIClientContext = createContext();

export const BackendAPIClientProvider = (props) => {
  const { authState, oktaAuth } = useOktaAuth();
  const client = axios.create({
      baseURL: window.location.origin,
      json: true
  })
  
  const perform = async (aspectName, data={}) => {
    const aspect = Aspects[aspectName];
    console.log(aspect);
    if (aspect) {
      return client({
        method: aspect.method,
        url: `/${aspect.type}/${aspect.path}`,
        data,
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`
        }
      })
      .then(resp => {return resp.data ? resp.data : [];})
      .catch((err) => {
        console.log(err);
        return [];
      });
    } else {
      console.log(
        `Aspect key "${aspectName}" is not valid. Please check.`
      );
      return [];
    }
  }

  return (
    <BackendAPIClientContext.Provider
      value={{
        coreAPIConnect: perform,
      }}
    >
      {props.children}
    </BackendAPIClientContext.Provider>
    )
}