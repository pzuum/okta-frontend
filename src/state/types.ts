export type OAuthTypes = {
    queryState?: string;
    verifier?: string;
    setVerifier?: (verifier: string) => void
    setQueryState?: (queryState: string) => void
    renewVerifier?: () => void
}