import { useEffect, useState } from "react";
import defaultProfilePic from "../assets/default-profile-pic.svg";
import { useAuth } from "../context/AuthContext";
import { ApigetProfilePic } from "../api/client";

type MspUserProfileProps =
{
	className?: string;
	setImage?:  string|null;
	userId?:    number;
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

export default function MspUserProfilePic({className, setImage, userId}: MspUserProfileProps)
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

			if (response.type === "success")
			{
				setProfilePic(response.data.profile_pic);
			}
		}
		catch (error)
		{
			console.log("Error while retrieving profile pic:", error);
		}
	}

	const getUserProfilePic = async () =>
	{
		if (! userId)
		{
			return;
		}

		try
		{
			const response = await ApigetProfilePic(userId);

			if (response.type === "success")
			{
				setProfilePic(response.data.profile_pic);
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
		getUserProfilePic();
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