import defaultProfilePic from "../assets/default-profile-pic.svg";
import { useAuth } from "../context/AuthContext";

type MspUserProfileProps =
{
	className?: string;
	setImage?:  string;
}

export default function MspUserProfilePic({className, setImage}: MspUserProfileProps)
{
	const { userData } = useAuth();
	
	if (! setImage)
	{
		setImage = userData?.profile_pic;
	}

	return (
		<img className={`msp-user-profile-pic ${className ? className : ""}`} src={setImage ? setImage : defaultProfilePic} alt="Profile"/>
	);
}