import "./style.scss";
import { useState, useEffect } from "react";
import { ApiGetAllMeetingsForUser } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "../api/MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import MspButton from "../Components/MspButton";
import MspWeekDisplay from "../Components/MspWeekDisplay/MspWeekDisplay";
import MspDayDisplay from "../Components/MspDayDisplay/MspDayDisplay";
import MspListDisplay from "../Components/MspListDisplay/MspListDisplay";

type FilterType =
{
	type: "month"
}
| {
	type: "week"
}
| {
	type: "day"
}
| {
	type: "list"
};

export default function Index()
{
	const { userData } = useAuth();

	const [meetings,       setMeetings]       = useState<MeetingType[]>([]);
	const [otherNames,     setOtherNames]     = useState<string[]>([]);
	const [filterType,     setFilterType]     = useState<FilterType>({type: "month"});
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const displayedObject =
		filterType.type === "month" ?
		(
			<section className="msp-meetings-calendar-wrapper">
				<div className="msp-meetings-calendar">
					<MspCalendar meetings={meetings} otherNames={otherNames} onMeetingUpdate={() => setRefreshTrigger(trigger => trigger + 1)}/>
				</div>
			</section>
		) :
		filterType.type === "week" ?
		(
			<div className="msp-meetings-week-display-wrapper">
				<div className="msp-meetings-week-display">
				<MspWeekDisplay meetings={meetings} otherNames={otherNames} onMeetingUpdate={() => setRefreshTrigger(trigger => trigger + 1)}/>
				</div>
			</div>
		) :
		filterType.type === "day" ?
		(
			<div>
				<MspDayDisplay meetings={meetings} otherNames={otherNames} onMeetingUpdate={() => setRefreshTrigger(trigger => trigger + 1)}/>
			</div>
		) : // type === "list"
		(
			<div>
				<MspListDisplay meetings={meetings} otherNames={otherNames} onMeetingUpdate={() => setRefreshTrigger(trigger => trigger + 1)}/>
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
					setOtherNames(handled.data.map((meeting: any) => meeting.other_names));
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
	}, [userData, refreshTrigger]);

	return (
		<div className="msp-meetings">
		<div className="msp-meetings-header">
			<h1>Your meetings</h1>
			<p>Manage and view all your scheduled events</p>
		</div>
		<div className="msp-meetings-button-group">
			<MspButton label="Month" onClick={() => setFilterType({ type: "month" })}/>
			<MspButton label="Week"  onClick={() => setFilterType({ type: "week" })}/>
			<MspButton label="Day"   onClick={() => setFilterType({ type: "day" })}/>
			<MspButton label="List"  onClick={() => setFilterType({ type: "list" })}/>
		</div>
		{displayedObject}
		
	</div>
	);
}