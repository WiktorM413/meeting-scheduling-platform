import { useEffect, useState } from "react";
import defaultProfilePic from "../assets/default-profile-pic.svg";
import { useAuth } from "../context/AuthContext";
import { ApigetProfilePic } from "../api/client";
import HandleResponse from "../api/HandleResponse";

type MspUserProfileProps =
{
	className?: string;
	setImage?:  string|null;
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
	const [profilePic, setProfilePic] = useState<string|null>(null);

	const getProfilePicInBase64 = async () =>
	{
		try
		{
			if (! userData)
			{
				console.log("User is not logged in");
				return;
			}

			const response = await ApigetProfilePic(userData.id);
			const handled  = HandleResponse(response);

			if (handled.type === "success")
			{
				setProfilePic(handled.data.profile_pic);
			}
		}
		catch (error)
		{
			console.log("Error while retrieving profile pic:", error);
		}
	}

	useEffect(() =>
	{
		getProfilePicInBase64();
	}, [userData]);

	
	
	let src: string;

	if (setImage !== undefined)
	{
		src = setImage ?? defaultProfilePic;
	}
	else if (profilePic)
	{
		src = `data:${GetImageExtension(profilePic)};base64,${profilePic}`;
	}
	else
	{
		src = defaultProfilePic;
	}
		
	return (
		<img className={`msp-user-profile-pic ${className ? className : ""}`} src={src} alt="Profile"/>
	);
}