import { OktaAuthOptions } from "@okta/okta-auth-js/core"

const CLIENT_ID = import.meta.env.VITE_OKTA_CLIENT_ID
const ISSUER = import.meta.env.VITE_OKTA_ISSUER
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI

export const oktaOptions = {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: [
        'openid',
        'profile',
        'email',
        'offline_access',
        'okta.myAccount.profile.read',
        'okta.myAccount.profile.manage',
        'okta.myAccount.email.manage',
        'okta.myAccount.phone.manage',
        // 'okta.myAccount.password.read', 
        // 'okta.myAccount.password.manage',
    ],
    pkce: true
} as OktaAuthOptions