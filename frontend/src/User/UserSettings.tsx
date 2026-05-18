import "./style.scss";
import { useParams } from "react-router-dom"
import SmallProfile from "../assets/small-profile.svg"
import LockIcon from "../assets/lock.svg"
import GearIcon from "../assets/settings-icon.svg"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import ProfileSettingObj from "./SettingsObj/ProfileSettingObj";
import PrivacySettingObj from "./SettingsObj/PrivacySettingObj";
import AccountSettingObj from "./SettingsObj/AccountSettingObj";

type ActiveTabType = 
{
	type: "profile"
}
| {
	type: "privacy"
}
| {
	type: "account"
}

type SettingsObjProps =
{
	activeTab: ActiveTabType;
}

function SettingsObj({activeTab}: SettingsObjProps)
{
	switch (activeTab.type)
	{
		case "profile":
			return <ProfileSettingObj />;
		
		case "privacy":
			return <PrivacySettingObj />;

		case "account":
			return <AccountSettingObj />;

		default:
			return <p>Wrong settings!</p>;
	}
}

export default function UserSettings()
{
	const { userId } = useParams();
	const { userData } = useAuth();

	if (! userId || userData?.id != Number(userId))
	{
		return (
			<div className="msp-user-settings">
				You do not have access to this page.
			</div>
		);
	}

	const [activeTab, setActiveTab] = useState<ActiveTabType>({type: "profile"});
	
	return (
		<div className="msp-user-settings">
			<div className="msp-user-settings-header">
				<h1>Settings</h1>
			</div>
			<div className="msp-user-settings-navigation-wrapper">
				<div className="msp-user-settings-navigation">
					<div
						className={`msp-user-settings-navigation-destination ${activeTab.type === "profile" ? "active" : ""}`}
						onClick={() => setActiveTab({type: "profile"})}
					>
						<img src={SmallProfile}/>
						<span>Profile</span>
					</div>
					<div
						className={`msp-user-settings-navigation-destination ${activeTab.type === "privacy" ? "active" : ""}`}
						onClick={() => setActiveTab({type: "privacy"})}
					>
						<img src={LockIcon}/>
						<span>Privacy</span>
					</div>
					<div
						className={`msp-user-settings-navigation-destination ${activeTab.type === "account" ? "active" : ""}`}
						onClick={() => setActiveTab({type: "account"})}
					>
						<img src={GearIcon}/>
						<span>Account</span>
					</div>
				</div>
				
				<div className="msp-user-settings-main">
					<SettingsObj activeTab={activeTab}/>
				</div>
			</div>
		</div>
	)
}