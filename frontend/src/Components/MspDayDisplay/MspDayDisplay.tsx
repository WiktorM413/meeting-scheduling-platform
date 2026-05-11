import { useMemo, useState } from "react";
import type { MeetingType } from "../../api/MeetingType"
import type { DayCell } from "../MspCalendar/DayCell";

function BuildDay(year: number, month: number, day: number, meetings?: MeetingType[]): DayCell
{
	const today   = new Date();
	const dateObj = new Date(year, month, day);
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
			let dateArr = meetings[i].when.split("-");

			if (Number(dateArr[0])     === year  &&
				Number(dateArr[1]) - 1 === month && // months are by index
				Number(dateArr[2])     === day)
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

type MspDayDisplayProps =
{
	meetings?: MeetingType[];
}

export default function MspDayDisplay({meetings}: MspDayDisplayProps)
{
	const now = new Date();
	const [year,  setYear]  = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth());
	const [day,   setDay]   = useState(now.getDate());

	const cell = useMemo(() => BuildDay(year, month, day, meetings), [year, month, day, meetings]);

	return (
		<div className="msp-day-display">
			<input type="date" onChange={(e) => console.log(e.target.value)}/>
		</div>
	);
}