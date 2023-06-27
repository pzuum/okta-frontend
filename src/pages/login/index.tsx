
import { API } from "../../shared/api";

export function Login( ): JSX.Element {

    

    

    const handleOAuthLogin = async (provider: string) => {
        
       
        
        
        
        
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
                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin('google')}>google</button>

                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin('Okta')}>okta</button>

                    <button className='button horizontal-center mt-5' onClick={() => handleOAuthLogin('Microsoft')}>Microsoft</button>
            </div>
        </div>
    </>;
}

