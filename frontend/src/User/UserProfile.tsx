import "./style.scss";
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { UserData } from "../api/UserType";
import { ApiGetUpcomingMeetings, ApiGetUserById, ApiGetUserSettings, ApiGetUserStats } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import MspUserProfilePic from "../Components/MspUserProfilePic";
import type { MeetingType } from "../api/MeetingType";
import type { UserStatsType } from "../api/UserStatsType";
import { FormatDate } from "../utils/dateUtils";
import { FormatTime } from "../utils/time";
import MspAnchor from "../Components/MspAnchor";
import SettingsIcon from "../assets/settings-icon.svg";
import { type UserSettingsType } from "../api/UserSettingsType";

export default function UserProfile()
{
	const { userId }   = useParams();
	const { userData } = useAuth();

	if (! userId)
	{
		return (
			<div className="msp-user-profile">
				<h1 className="msp-error">Wrong url</h1>
			</div>
		)
	}

	const [user,             setUser]             = useState<UserData|null>(null);
	const [isCurrentUser,    setIsCurrentUser]    = useState(false);
	const [upcomingMeetings, setUpcomingMeetings] = useState<MeetingType[]|null>(null);
	const [userStats,        setUserStats]        = useState<UserStatsType|null>(null);
	const [userSettings,     setUserSettings]     = useState<UserSettingsType|null>(null);

	const navigate = useNavigate();

	useEffect(() =>
	{
		const loadUser = async () =>
		{
			if (Number(userId) == userData?.id)
			{
				setUser(userData);
				setIsCurrentUser(true);

				return userData;
			}
			else
			{
				try
				{
					const response = await ApiGetUserById(Number(userId));
					const handled  = HandleResponse(response);

					if (handled.type === "success")
					{
						setUser(handled.data);
						setIsCurrentUser(false);
						
						return handled.data;
					}
				}
				catch (error)
				{
					console.log("Error retrieving user:", error);
				}
			}
		}

		const loadUpcomingMeetings = async (resolvedUser: UserData) =>
		{
			try
			{
				const response = await ApiGetUpcomingMeetings(resolvedUser.id);
				const handled  = HandleResponse(response);

				if (handled.type === "success")
				{
					setUpcomingMeetings(handled.data);
				}
			}
			catch (error)
			{
				console.log("Error retrieving upcoming meetings:", error);
			}
		}

		const loadUserStats = async (resolvedUser: UserData) =>
		{
			try
			{
				const response = await ApiGetUserStats(resolvedUser.id);
				const handled = HandleResponse(response);

				if (handled.type === "success")
				{
					setUserStats(handled.data);
				}
			}
			catch (error)
			{
				console.log("Error while retrieving user stats:", error);
			}
		}

		const loadUserSettings = async (resolvedUser: UserData) =>
		{
			try
			{
				const response = await ApiGetUserSettings(resolvedUser.id);
				const handled  = HandleResponse(response);

				if (handled.type === "success")
				{
					setUserSettings(handled.data);
				}
			}
			catch (error)
			{
				console.log("Error while retrieving user settings:", error);
			}
		}

		async function Load()
		{
			const resolvedUser = await loadUser();
			if (! resolvedUser)
			{
				return;
			}

			await loadUpcomingMeetings(resolvedUser);
			await loadUserStats(resolvedUser);
			await loadUserSettings(resolvedUser);
		}

		Load();
	}, [userId, userData]);
	
	if (! Number(userSettings?.public_profile) && ! isCurrentUser)
	{
		return <div className="msp-user-profile">User profile is private.</div>
	}

	return (
		<div className="msp-user-profile">
			<div className="msp-user-profile-header">
				<div className="msp-user-profile-header-profile-pic">
					<MspUserProfilePic />
				</div>
				<div className="msp-user-profile-header-user-info">
					<h2>{isCurrentUser ? "Hello," : "Meet"} {user?.first_name} {user?.last_name}.</h2>
					<p className="msp-small-text">
						{Number(userSettings?.show_email) || isCurrentUser ?
							user?.email
						:
							""
						}
					</p>
				</div>
				{isCurrentUser &&
					<div className="msp-user-profile-header-settings">
						<MspAnchor label="" navigator={navigate} to={`/userSettings/${user?.id}`}>
							<img src={SettingsIcon}/>
						</MspAnchor>
					</div>
				}
			</div>
			<div className="msp-user-profile-info">
				<div className="msp-user-profile-info-box">
					<h4>Upcoming</h4>
					<p>{upcomingMeetings?.length === 0 ? "None" : upcomingMeetings?.length}</p>
				</div>
				<div className="msp-user-profile-info-box">
					<h4>Hosted</h4>
					<p>{!userStats || userStats?.meetings_hosted === 0 ? "None" : userStats?.meetings_hosted}</p>
				</div>
			</div>
			<div className="msp-user-profile-upcoming">
				{upcomingMeetings?.slice(0, 3).map((meeting, id) =>
				(
					<div className="msp-user-profile-upcoming-meeting" key={id}>
						<div>
							<h3>{meeting.topic}</h3>
							<p>{FormatDate(meeting.when)} ({FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)})</p>
						</div>
						<div className="msp-user-profile-upcoming-meeting-type">
							{meeting.provider_id == user?.id ?
							(
								<p className="msp-user-profile-upcoming-meeting-type-host">Host</p>
							)
							:
							(
								<p className="msp-user-profile-upcoming-meeting-type-invited">Invited</p>
							)
							}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}