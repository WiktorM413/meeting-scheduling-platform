import "./style.scss";
import { useMemo, useState } from "react";
import type { MeetingType } from "../../api/MeetingType"
import type { DayCell } from "../MspCalendar/DayCell";
import { FormatTime } from "../../utils/time";

function BuildDay(date: string, meetings?: MeetingType[]): DayCell
{
	const [year, month, day] = date.split("-").map((value) => Number(value));

	const today   = new Date();
	const dateObj = new Date(year, month - 1 /* to month index */, day);
	const isToday = 
		dateObj.getDate()     === today.getDate()  &&
		dateObj.getMonth()    === today.getMonth() &&
		dateObj.getFullYear() === today.getFullYear();

	const d = (dateObj.getDay() + 6) % 7; // Convert from 0 -> Sunday to 0 -> Monday
	const isAvailable = d < 5;

	let hasEvents = false;

	if (meetings)
	{
		for (let i = 0; i < meetings.length; i++)
		{
			if (meetings[i].when === date)
			{
				hasEvents = true;
				break;
			}
		}
	}

	const cell: DayCell =
	{
		date:         day,
		isToday:      isToday,
		isSelected:   false,
		hasEvents:    hasEvents,
		availability: isAvailable
	}

	return cell;
}

type DayObjPorps =
{
	date:      string;
	meetings?: MeetingType[];
}

function DayObj({date, meetings}: DayObjPorps)
{
	return (
		<div className="msp-day-display-meetings">
			{meetings?.map((meeting) =>
			{
				if (meeting.when === date)
				{
					return (
						<div className="msp-day-display-meeting-card">
							<div className="msp-day-display-meeting-time">
								{FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}
							</div>

							<div className="msp-day-display-meeting-main">
								<div className="msp-day-display-meeting-topic">
									{meeting.topic}
								</div>

								<div className="msp-day-display-meeting-people">
									{meeting.other_names}
								</div>
							</div>
						</div>
					)
				}
			})}
		</div>
	)
}

type MspDayDisplayProps =
{
	meetings?: MeetingType[];
}

export default function MspDayDisplay({meetings}: MspDayDisplayProps)
{
	const now = new Date();
	const today =
		now.getFullYear().toString() + "-" +
		(now.getMonth() + 1).toString().padStart(2, "0") /* from month index to month number */ + "-" +
		now.getDate().toString().padStart(2, "0");
	const [date,  setDate]  = useState(today);
		

	const cell = useMemo(() => BuildDay(date, meetings), [date, meetings]);
	
	return (
		<div className="msp-day-display">
			<div className="msp-day-display-header">
				<input value={today} type="date" onChange={(e) => setDate(e.target.value)}/>
			</div>

			<DayObj date={date} meetings={meetings}/>
		</div>
	);
}