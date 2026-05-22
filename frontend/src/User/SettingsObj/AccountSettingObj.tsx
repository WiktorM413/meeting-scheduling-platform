import { useState } from "react";
import MspFormField from "../../Components/MspFormField";
import MspButton from "../../Components/MspButton";
import { useParams } from "react-router-dom";

export default function AccountSettingObj()
{
	const { userId } = useParams();
	
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword,     setNewPassword]     = useState("");
	const [repeatPassword,  setRepeatPassword]  = useState("");
	
	const updatePassword = async () =>
	{
		
	}
	
	return (
		<div className="msp-account-setting-obj">
			<div className="msp-account-setting-obj-header">
				<h2>Account</h2>
				<p className="msp-small-text">Manage your password, sessions, and account actions.</p>
			</div>
			<div className="msp-account-setting-obj-form">
				<h3>Change your password here</h3>
				<MspFormField label="Current password" value={currentPassword} setter={setCurrentPassword} inputType="password"/>
				<MspFormField label="New password"     value={newPassword}     setter={setNewPassword}     inputType="password"/>
				<MspFormField label="Repeat password"  value={repeatPassword}  setter={setRepeatPassword}  inputType="password"/>
				<MspButton label="Update password" onClick={async () =>
					{
						await updatePassword();
					}
				}/>
			</div>
		</div>
	);
}