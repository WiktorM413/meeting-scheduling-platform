import { useState } from "react";
import MspSwitchInput from "../../Components/MspSwitchInput";
import MspButton from "../../Components/MspButton";

export default function PrivacySettingObj()
{
	const [publicProfile, setPublicProfile] = useState(1);
	const [showEmail,     setShowEmail]     = useState(1);

	const saveChanges = async () =>
	{

	}
	
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