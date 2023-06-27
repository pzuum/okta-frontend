
import OktaAuth, {urlParamsToObject} from '@okta/okta-auth-js/authn';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { oktaOptions } from '../shared/oAuth/okta';
import { IdxStatus, OktaAuthIdxInterface, OktaAuthMyAccountInterface, isRedirectUri } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { RestoreOriginalUriFunction } from '@okta/okta-react/bundles/types/OktaContext';

export const IdxTransaction = React.createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useIdxTransaction = () => React.useContext(IdxTransaction);

export const MyAccountContext = React.createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useMyAccountContext = () => React.useContext(MyAccountContext);


const oktaAuth = (() => {
  const { 
    state, 
    recoveryToken, 
    issuer,
    clientId
    
    
   } = urlParamsToObject(window.location.search) as unknown as {
    state: string,
    recoveryToken: string,
    issuer: string,
    clientId: string,
    
   };
  return new OktaAuth(Object.assign({}, oktaOptions, {
    state,
    recoveryToken,
    myAccount: MyAccountContext,
    idx: IdxTransaction,
    // enable dynamic config app config in testing
    ...(issuer && { issuer }),
    ...(clientId && { clientId }),
   
  })) as unknown as OktaAuth & OktaAuthIdxInterface & OktaAuthMyAccountInterface })();


const restoreOriginalUri: RestoreOriginalUriFunction = (oktaAuth: OktaAuth, originalUri: string) => {
    void 0;
};

export const StateProvider = ({ children }: React.PropsWithChildren ) => {
 const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Record<string, never> | {tokens: {
    accessToken: string,
  }, status: string, meta: {flow: string}}>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { tokens, status, meta } = transaction || {};
    if (status === IdxStatus.SUCCESS) {
      oktaAuth.tokenManager.setTokens(tokens);
      navigate('/');
      setTransaction(null);
    } else if (status === IdxStatus.TERMINAL) {
      navigate('/terminal');
      setTransaction(null);
    } else if (status === IdxStatus.FAILURE) {
      navigate('/error');
      setTransaction(null);
    } else if (status === IdxStatus.CANCELED) {
      navigate('/canceled');
      setTransaction(null);
    } else if (status === IdxStatus.PENDING) {
      navigate(`/flow/${meta.flow}`);
    }
  }, [transaction, history]);

  useEffect(() => {
    const resumeTransaction = async () => {
      setLoading(true);
      const newTransaction = await oktaAuth.idx.proceed();
      setTransaction(newTransaction);
      setLoading(false);
    };

    if (!isRedirectUri(window.location.href, oktaAuth) && oktaAuth.idx.canProceed()) {
      resumeTransaction();
    }
  }, [])

  if (loading) {
    return <Spinner />;
  }

  return (
    <Security
      oktaAuth={oktaAuth} 
      onAuthRequired={() => navigate('/')}
      restoreOriginalUri={restoreOriginalUri}
    >
      <IdxTransaction.Provider value={{
        transaction,
        setTransaction,
      }}>{children}</IdxTransaction.Provider>
      
      </Security>)
}
