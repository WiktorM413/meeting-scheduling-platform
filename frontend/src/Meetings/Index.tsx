import "./style.scss";
import { useState, useEffect } from "react";
import { ApiGetAllMeetingsForUser } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "../api/MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";

export default function Index()
{
	const { userData } = useAuth();

	const [meetings,  setMeetings]  = useState<MeetingType[]>([]);

	useEffect(() =>
	{
		const loadMeetings = async () =>
		{
			try
			{
				if (!userData) {
					setMeetings([]);
					return;
				}

				const response = await ApiGetAllMeetingsForUser(userData.id);
				const handled = HandleResponse(response);

				if (handled?.type === "success")
				{
					setMeetings(handled.data);
				}
				else
				{
					setMeetings([]);
				}
			}
			catch (error)
			{
				console.log("Error submitting data: ", error);
			}
		};

		loadMeetings();
	}, [userData]);
	console.log(meetings);
	return (
		<div className="msp-meetings">
		<section className="msp-meetings-header">
			<h1>Your meetings</h1>
			<p>Manage and view all your scheduled events</p>
		</section>

		<section className="msp-meetings-calendar-wrapper">
			<div className="msp-meetings-calendar">
				<MspCalendar meetings={meetings} />
			</div>
		</section>
	</div>
	);
}