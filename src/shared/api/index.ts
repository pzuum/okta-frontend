export class API {
    
    static sendTokenRequest(code: string, provider: string) {
        const url = `http://${import.meta.env.VITE_AUTHORIZE_URI}/token/${provider}`;
        const response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorizationCode: code,
                codeVerifier: localStorage.getItem('verifier'),
                state: localStorage.getItem('queryState')
            })
        });
        return response;
    }

    static generateLoginURL(state: string, codeChallenge: string, provider: string, code: string) {
        console.log({
            code,
        })
        return `http://${import.meta.env.VITE_AUTHORIZE_URI}/login/${provider}/?state=${state}&codeChallenge=${codeChallenge}&code=${code}` as string;
    }
}