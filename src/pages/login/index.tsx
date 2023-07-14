import { useContext } from "react";

import { OauthState } from "../../state";

export function Login( ): JSX.Element {

    const { renewVerifier } = useContext(OauthState);

    const handleOAuthLogin = async () => {
        renewVerifier();        
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
                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin()}>google</button>
                </div>

                <div className='center container'>
                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin()}>okta</button>
                </div>

                <div className='center container'>
                    <button className='button horizontal-center mt-5'>Login</button>
                </div>


            </div>

        </div>
    </>;
}

