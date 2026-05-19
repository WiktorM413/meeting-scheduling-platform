import "./style.scss";
import { useState } from "react";
import MspButton from "../../Components/MspButton";
import MspFileInput from "../../Components/MspFileInput/MspFileInput";
import MspUserProfilePic from "../../Components/MspUserProfilePic";
import { useAuth } from "../../context/AuthContext";
import MspFormField from "../../Components/MspFormField";
import { ApiUpdateUser } from "../../api/client";


export default function ProfileSettingObj()
{
	const { userData, refreshUser } = useAuth();
	
	const [profilePic,       setProfilePic]       = useState<File|null>(null);
	const [profilePicURL,    setProfilePicURL]    = useState<string|null>(null);
	const [firstname,        setFirstname]        = useState<string>(userData?.first_name ?? "");
	const [lastname,         setLastname]         = useState<string>(userData?.last_name  ?? "");
	const [email,            setEmail]            = useState<string>(userData?.email      ?? "");
	const [removeProfilePic, setRemoveProfilePic] = useState<boolean>(false);

	if (! userData)
	{
		return <div className="msp-profile-setting-obj">Your user doesn't exist!</div>
	}

	const saveChanges = async () =>
	{
		const imageAsBase64 = async (): Promise<string|null> =>
		{
			if (! profilePic)
			{
				return null;
			}

			const buffer = await profilePic.arrayBuffer();
			const bytes  = new Uint8Array(buffer);
			const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');

			return btoa(binary);
		}
		
		const profilePicString: string|null = await imageAsBase64();

		try
		{
			await ApiUpdateUser(userData.id, firstname, lastname, email, profilePicString ?? undefined, removeProfilePic);
			await refreshUser(firstname, lastname, email, profilePicString ?? undefined);
		}
		catch (error)
		{
			console.log("Error updating user", error);
		}
	}

	const handleProfilePicChange = (file: File | null, removeProfilePic: boolean = false) =>
	{
		setProfilePic(file);
		setRemoveProfilePic(removeProfilePic);

		if (profilePicURL)
		{
			URL.revokeObjectURL(profilePicURL);
		}

		setProfilePicURL(file ? URL.createObjectURL(file) : null);
	}

	return (
		<div className="msp-profile-setting-obj">
			<div className="msp-profile-setting-obj-header">
				<h2>Profile</h2>
				<p className="msp-small-text">Update your personal information and public-facing details.</p>
			</div>
			<div className="msp-profile-setting-obj-profile-pic">
				<MspUserProfilePic setImage={profilePicURL ?? userData.profile_pic}/>
				<div className="msp-profile-setting-obj-profile-pic-options">
					<p>Profile photo</p>
					<MspFileInput label="Upload new" valueSetter={setProfilePic} onChange={handleProfilePicChange}/>
					<MspButton label="Remove" onClick={() => handleProfilePicChange(null, true)}/>
				</div>
			</div>
			<div className="msp-profile-setting-obj-credentials">
				<div className="msp-profile-setting-obj-credentials-name">
					<MspFormField label="First name" value={firstname} setter={setFirstname}/>
					<MspFormField label="Last name"  value={lastname}  setter={setLastname}/>
				</div>
				<div className="msp-profile-setting-obj-credentials-email">
					<MspFormField label="Email address" value={email} setter={setEmail}/>
				</div>
			</div>
			<div className="msp-profile-setting-obj-save-button">
				<MspButton label="Save changes" onClick={async () =>
					{
						await saveChanges();
						await refreshUser(firstname, lastname, email);
					}}
				/>
			</div>
		</div>
	);
}