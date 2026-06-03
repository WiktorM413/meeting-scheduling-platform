import "./style.scss";
import { useEffect, useState } from "react";
import MspSwitchInput from "../../Components/MspSwitchInput";
import MspButton from "../../Components/MspButton";
import { useAuth } from "../../context/AuthContext";
import { ApiGetUserSettings, ApiUpdateUserSettings } from "../../api/client";

export default function PrivacySettingObj()
{
	const { userData } = useAuth();

	const [publicProfile, setPublicProfile] = useState(1);
	const [showEmail,     setShowEmail]     = useState(1);

	if (! userData)
	{
		return <div className="msp-privacy-setting-obj">Your user doesn't exist</div>
	}
	
	const saveChanges = async () =>
	{
		try
		{
			await ApiUpdateUserSettings(userData.id, publicProfile, showEmail);
		}
		catch (error)
		{
			console.log("Error updating the user:", error);
		}
	}

	useEffect(() =>
	{
		const loadUserSettings = async () =>
		{
			try
			{
				const response = await ApiGetUserSettings(userData.id);

				if (response.type === "success")
				{
					setPublicProfile(Number(response.data.public_profile));
					setShowEmail(Number(response.data.show_email));
				}
			}
			catch (error)
			{
				console.log("Error retrieving user settings:", error);
			}
		}

		loadUserSettings();
	}, []);
	
	return (
		<div className="msp-privacy-setting-obj">
			<div className="msp-privacy-setting-obj-header">
				<h2>Privacy</h2>
				<p className="msp-small-text">Control who can see your information and how it's used.</p>
			</div>
			<div className="msp-privacy-setting-obj-options">
				<div className="msp-privacy-setting-obj-options-option">
					<div className="msp-privacy-setting-obj-options-option-content">
						<h4>Public profile</h4>
						<p>Anyone can view your profile page</p>
					</div>
					<MspSwitchInput value={publicProfile} setter={setPublicProfile}/>
				</div>
				<div className="msp-privacy-setting-obj-options-option">
					<div className="msp-privacy-setting-obj-options-option-content">
						<h4>Show email address</h4>
						<p>Display your email on your profile</p>
					</div>
					<MspSwitchInput value={showEmail} setter={setShowEmail}/>
				</div>
			</div>
			<div className="msp-privacy-setting-obj-save-button">
				<MspButton label="Save changes" onClick={async () =>
					{
						await saveChanges();
					}
				}/>
			</div>
		</div>
	);
}