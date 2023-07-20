import { createContext, useCallback, useEffect, useState } from "react";
import { OAuth } from "../shared/oAuth";
import { OAuthTypes } from "./types";
import { API } from "../shared/api";
import { ProfileProps } from "../pages/profile/types";


const OauthState = createContext<OAuthTypes>({
    renewVerifier: (provider: string) => {
        void 0;
    },
});



const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryState, setQueryState] = useState('');
    const [verifier, setVerifier] = useState('');
    const [profile, setProfile] = useState<ProfileProps>(null);
    const [provider, setProvider] = useState('');
    
    const [shouldRenew, setShouldRenew] = useState(false);

    const renewVerifier = useCallback((currentProvider: string) => {
        setVerifier(OAuth.generateCodeVerifier());
        setQueryState(OAuth.generateState());
        setShouldRenew(true);
        setProvider(currentProvider);
    }, [])

    
    useEffect(() => {
        const handleRenew = async () => {
        setShouldRenew(false);
        if (queryState.length && verifier.length) {
                localStorage.setItem('queryState', queryState);
                localStorage.setItem('verifier', verifier);
                
                const codeChallenge = await OAuth.generateCodeChallenge(verifier as string);
                const url = API.generateLoginURL(
                    queryState as string,
                    codeChallenge,
                    provider,
                    verifier
                )
            
                window.location.replace(url);
            } else {
            if (!queryState.length || !verifier.length) {
            const oldState = localStorage.getItem('queryState');
            const oldVerifier = localStorage.getItem('verifier');
            if (oldState?.length && oldVerifier?.length) {
                setQueryState(oldState);
                setVerifier(oldVerifier);
            }
        }
                  
        } 
    }
    if (shouldRenew)  handleRenew()
    }, [queryState, verifier])
    
    return (<>
            <OauthState.Provider value={{
                queryState,
                verifier,
                setQueryState,
                setVerifier,
                renewVerifier,
                setProfile,
                profile
            }}>
                {children}
            </OauthState.Provider>
        </>)
    

    }

export { OauthState, StateProvider };