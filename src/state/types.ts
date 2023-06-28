import { ProfileProps } from "../pages/profile/types";

export type OAuthTypes = {
    queryState?: string;
    verifier?: string;
    setVerifier?: (verifier: string) => void
    setQueryState?: (queryState: string) => void
    renewVerifier: () => void
    profile?: ProfileProps
    setProfile?: (profile: ProfileProps) => void
}