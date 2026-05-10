import "./style.scss";
import { useState, useEffect } from "react";
import { ApiGetAllMeetingsForUser } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "../api/MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import MspButton from "../Components/MspButton";
import MspWeekDisplay from "../Components/MspWeekDisplay/MspWeekDisplay";

type FilterType =
{
	type: "month"
}
| {
	type: "week"
}
| {
	type: "day"
};

export default function Index()
{
	const { userData } = useAuth();

	const [meetings,   setMeetings]   = useState<MeetingType[]>([]);
	const [filterType, setFilterType] = useState<FilterType>({type: "month"});

	const displayedObject =
		filterType.type === "month" ?
		(
			<section className="msp-meetings-calendar-wrapper">
				<div className="msp-meetings-calendar">
					<MspCalendar meetings={meetings} />
				</div>
			</section>
		) :
		filterType.type === "week" ?
		(
			<div className="msp-meetings-week-display-wrapper">
				<div className="msp-meetings-week-display">
				<MspWeekDisplay meetings={meetings}/>
				</div>
			</div>
		) : // type === "day"
		(
			<div>

			</div>
		);

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

	return (
		<div className="msp-meetings">
		<section className="msp-meetings-header">
			<h1>Your meetings</h1>
			<p>Manage and view all your scheduled events</p>
		</section>
		<div className="msp-meetings-button-group">
			<MspButton label="Month" onClick={() => setFilterType({ type: "month" })}/>
			<MspButton label="Week"  onClick={() => setFilterType({ type: "week" })}/>
			<MspButton label="Day"   onClick={() => setFilterType({ type: "day" })}/>
		</div>
		{displayedObject}
		
	</div>
	);
}