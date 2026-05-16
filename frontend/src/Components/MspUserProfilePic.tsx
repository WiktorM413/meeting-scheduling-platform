import defaultProfilePic from "../assets/default-profile-pic.svg";
import { useAuth } from "../context/AuthContext";

type MspUserProfileProps =
{
	className?: string;
}

export default function MspUserProfilePic({className}: MspUserProfileProps)
{
	const { userData } = useAuth();
	return (
		<img className={`msp-user-profile-pic ${className ? className : ""}`} src={userData?.profile_pic ? userData.profile_pic : defaultProfilePic} alt="Profile"/>
	);
}