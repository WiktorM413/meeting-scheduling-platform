import "./style.scss";
import { useState, useEffect } from "react";
import type { ResponseType } from "../api/ResponseType";
import { ApiGetAllMeetingsForUser } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "./MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import MspFormField from "../Components/MspFormField";

export default function Schedule()
{
		const { userData } = useAuth();
	
		const [meetings,     setMeetings] = useState<MeetingType[]>([]);
		const [response,     setResponse] = useState<ResponseType|null>(null);
		const [selectedDate, setSelectedDate] = useState("");
	
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
	
				setResponse(handled);
	
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

	console.log(selectedDate);

	return (
		<div className="msp-schedule">
			<div className="msp-form">
				<section className="msp-meetings-calendar-wrapper">
					<div className="msp-meetings-calendar">
						<MspCalendar meetings={meetings} externalSelectedDateSetter={setSelectedDate}/>
					</div>
				</section>
				{/* TODO: MspFormField for start_time end_time topic, etc. from meetings table */}
			</div>
		</div>
	);
}