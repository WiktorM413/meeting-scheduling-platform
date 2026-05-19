import defaultProfilePic from "../assets/default-profile-pic.svg";
import { useAuth } from "../context/AuthContext";

type MspUserProfileProps =
{
	className?: string;
	setImage?:  string;
}

function GetImageExtension(base64Img: string): string
{
	if (base64Img.startsWith('/9j/'))
	{
		return 'image/jpeg';
	}
	if (base64Img.startsWith('iVBOR')) 
	{
		return 'image/png';
	}
	if (base64Img.startsWith('R0lGO')) 
	{
		return 'image/gif';
	}
	if (base64Img.startsWith('UklGR')) 
	{
		return 'image/webp';
	}
	return 'image/jpeg';
}

export default function MspUserProfilePic({className, setImage}: MspUserProfileProps)
{
	const { userData } = useAuth();

	const src = setImage ?? defaultProfilePic;
	
	console.log(src);
	
	return (
		<img className={`msp-user-profile-pic ${className ? className : ""}`} src={src} alt="Profile"/>
	);
}