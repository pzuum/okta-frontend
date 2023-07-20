import { USER_TYPE_ENUM } from "./type";

export class API {
    
    static sendTokenRequest(code: string, provider: string, type: `${USER_TYPE_ENUM}` = USER_TYPE_ENUM.BROKER) {
        const url = `http://${import.meta.env.VITE_AUTHORIZE_URI}/token/${provider}`;
        const response = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'type': type,
            },
            body: JSON.stringify({
                authorizationCode: code,
                codeVerifier: localStorage.getItem('verifier'),
                state: localStorage.getItem('queryState'),
            })
        });
        
        return response;
    }

    static generateLoginURL(state: string, codeChallenge: string, provider: string, code: string) {
        
        return `http://${import.meta.env.VITE_AUTHORIZE_URI}/login/${provider}/?state=${state}&codeChallenge=${codeChallenge}&code=${code}` as string;
    }
}