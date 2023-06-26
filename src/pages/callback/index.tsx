/** callback url react page */

import { useEffect, useContext } from "react";
import { redirect, useLocation } from "react-router-dom";
import { OAuth } from "../../shared/oAuth";
import { API } from "../../shared/api";
import { OauthState } from "../../state";


export function Callback(): JSX.Element {
    
        const location = useLocation();

        const {
            verifier,
            
        } = useContext(OauthState);
    
        useEffect(() => {
            const run = async () => {

                const params = new URLSearchParams(location.search);
                const code = params.get('code');
                const state = params.get('state');
                const provider = params.get('provider');
                
                if (code && state && provider) {
                    const valid = OAuth.validateState(state);
                if (!valid) {
                    console.error('invalid state');
                    redirect('/');
                }
                
                
                const data = await API.sendTokenRequest(code, verifier as string);
                console.log(data)
                if (data) {
                    redirect('/home');
                }
            } else {
                console.error('missing code or state');
                redirect('/');
            }
        }
        run()
        }, [location.search])
    
        return <></>
}