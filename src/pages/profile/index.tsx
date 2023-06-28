import { useContext } from "react";
import { OauthState } from "../../state";

export const Profile: React.FC = () => {
    const {profile} = useContext(OauthState);
    return (
        <div>
            <h1>Profile</h1>
            <p>
                hi, my name is {profile?.name}
                email: {profile?.email}
            </p>
        </div>
    )
}