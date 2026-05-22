import { useState } from "react";
import MspFormField from "../../Components/MspFormField";
import MspButton from "../../Components/MspButton";
import { popup } from "../../Components/MspPopup/PopupManager";
import { useAuth } from "../../context/AuthContext";
import { ApiDeleteUser, ApiUpdateUserPassword } from "../../api/client";
import HandleResponse from "../../api/HandleResponse";
import { useNavigate } from "react-router-dom";

export default function AccountSettingObj()
{
	const { userData } = useAuth();

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword,     setNewPassword]     = useState("");
	const [repeatPassword,  setRepeatPassword]  = useState("");
	const [response,        setResponse]        = useState<string|null>(null);

	if (! userData)
	{
		return <div className="msp-account-setting-obj">User is logged out.</div>
	}

	const navigate = useNavigate();

	const updatePassword = async () =>
	{
		try
		{
			const response = await ApiUpdateUserPassword(userData.id, currentPassword, newPassword, repeatPassword);
			const handled  = HandleResponse(response);

			setResponse(handled.message);
		}
		catch (error)
		{
			console.log("Error while updating user password:", error);
		}
	}

	const deleteUser = async () =>
	{
		try
		{
			await ApiDeleteUser(userData.id);
		}
		catch (error)
		{
			console.log("Error while deleting user:", error);
		}
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
				<div className="msp-account-setting-obj-form-response">{response}</div>
			</div>
			<div className="msp-account-setting-obj-delete">
				<h3>DANGER ZONE</h3>
				<div className="msp-account-setting-obj-delete-content">
					<p>Permanently delete your account and all associated data. This action cannot be undone.</p>
					<MspButton label="Delete account" onClick={() =>
						{
							popup.Open(
								<div className="msp-account-setting-obj-delete-popup">
									<h1>Are you sure you want to delete your account?</h1>
									<div className="msp-account-setting-obj-delete-popup-button-group">
										<MspButton label="Yes" onClick={async () =>
											{
												await deleteUser();
												popup.Close();
												navigate("/logout");
											}
										}/>
										<MspButton label="No"  onClick={() => popup.Close()}/>
									</div>
								</div>
							);
						}
					}/>
				</div>
			</div>
		</div>
	);
}