import { IdxStatus, hasAuthorizationCode, hasErrorInUrl, hasInteractionCode } from "@okta/okta-auth-js";
import { useEffect } from "react";
import { useIdxTransaction } from "../../state";
import { useNavigate } from "react-router";
import { useOktaAuth } from "@okta/okta-react";

export const LoginCallback = () => {
  const navigate = useNavigate();
  const { setTransaction } = useIdxTransaction();
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    const parseFromUrl = async () => {
      try {
        if (hasInteractionCode(window.location.search)) {
          await oktaAuth.idx.handleInteractionCodeRedirect(window.location.href);
        } else if (hasAuthorizationCode(window.location.search)) {
          await oktaAuth.handleLoginRedirect();
        } else {
          throw new Error('Unable to parse url');
        }
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    };

    if (hasErrorInUrl(window.location.search)) {
      const url = new URL(window.location.href);
      const error = new Error(`${url.searchParams.get('error')}: ${url.searchParams.get('error_description')}`);
      setTransaction({
        status: IdxStatus.FAILURE,
        error
      });
      return;
    } else if(oktaAuth.isLoginRedirect()) {
      return parseFromUrl();
    }
    
    const handleEmailVerifyCallback = async () => {
      try {
        const newTransaction = await oktaAuth.idx.handleEmailVerifyCallback(window.location.search);
        setTransaction(newTransaction);
      } catch (error) {
        setTransaction({
          status: IdxStatus.FAILURE,
          error
        });
      } finally {
        navigate('/');
      }
    };

    if (oktaAuth.idx.isEmailVerifyCallback(window.location.search)) {
      return handleEmailVerifyCallback();
    }
    
  }, [oktaAuth, setTransaction, navigate]);
}
