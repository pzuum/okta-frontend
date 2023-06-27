import { OAuth } from "../oAuth";

export class API {
    
    

    static generateLoginURL(codeVerifier: string) {
        return OAuth.authorize(codeVerifier);
        
    }
}