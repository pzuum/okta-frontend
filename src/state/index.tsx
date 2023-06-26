import { createContext, useCallback, useState } from "react";
import { OAuth } from "../shared/oAuth";
import { OAuthTypes } from "./types";


const OauthState = createContext<OAuthTypes>({
    
});

const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryState, setQueryState] = useState(() => OAuth.generateState());
    const [verifier, setVerifier] = useState(() => OAuth.generateCodeVerifier());

    const renewVerifier = useCallback(() => {
        setVerifier(OAuth.generateCodeVerifier());
        setQueryState(OAuth.generateState());
    }, [])

    
    
    return (<>
            <OauthState.Provider value={{ queryState, verifier, setQueryState, setVerifier, renewVerifier }}>
                {children}
            </OauthState.Provider>
        </>)
    

    }

export { OauthState, StateProvider };