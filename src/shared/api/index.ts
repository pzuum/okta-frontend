export class API {
    
    static sendTokenRequest(code: string, codeVerifier: string) {
        const url = process.env.TOKEN_URL as string;
        const response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorizationCode: code,
                codeVerifier: codeVerifier
            })
        });
        return response;
    }

    static generateLoginURL(state: string, codeChallenge: string, provider: string) {
        return `https://${process.env.REDIRECT_URI}/login/${provider}/?state=${state}&codeChallenge=${codeChallenge}` as string;
        
    }
}