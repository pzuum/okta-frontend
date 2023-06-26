import { useContext } from "react";
import { redirect } from "react-router-dom";
import { OAuth } from "../../shared/oAuth";
import { API } from "../../shared/api";
import { OauthState } from "../../state";

export function Login( ): JSX.Element {

    const { queryState, verifier } = useContext(OauthState);


    

    const handleOAuthLogin = async (provider: string) => {
        const codeChallenge = await OAuth.generateCodeChallenge(verifier as string);
        const url = API.generateLoginURL(
            queryState as string,
            codeChallenge,
            provider
        )
        redirect(url);
        
    };

    


    return <>
        <div className="login-layout center">

            <div className='card center'>

                <div className='horizontal-center'>
                    <h1>Login</h1>
                </div>

                <div className='center'>
                    <label htmlFor="username" className='input-label'>Username</label>
                    <input type="text" aria-label='username' className='line input' />
                    <label htmlFor="password" className='input-label'>Password</label>
                    <input type="password" aria-label='password' className='line input' />
                </div>

                <div className='center container'>
                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin('google')}>google</button>
                </div>

                <div className='center container'>
                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin('Okta')}>okta</button>
                </div>

                <div className='center container'>
                    <button className='button horizontal-center mt-5'>Login</button>
                </div>


            </div>

        </div>
    </>;
}

