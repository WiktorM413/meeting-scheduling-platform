import { useMemo, useState } from "react";
import type { MeetingType } from "../../api/MeetingType"
import type { DayCell } from "../MspCalendar/DayCell";
import { FormatTime } from "../../utils/time";
import { popup } from "../MspPopup/PopupManager";

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

type DayObjPorps =
{
	cell:      DayCell;
	year:      number;
	month:     number;
	day:       number;
	meetings?: MeetingType[];
}

function DayObj({cell, year, month, meetings}: DayObjPorps)
{
	if (!cell)
		{
			return <div className="msp-week-display-cell msp-week-display-cell-empty"/>
		}

		return (
			<div
				className={`msp-week-display-cell ${
					cell.isSelected ? "msp-week-display-cell-selected" : ""
				} ${
					cell?.isToday ? "msp-week-display-cell-today" : ""
				} ${
					cell?.availability ? "msp-week-display-cell-available": "msp-week-display-cell-blocked"
				}`}
			>
				<span className="msp-week-display-cell-date">{cell.date}</span>
				{cell.hasEvents && <span className="msp-calendar-cell-dot"
					onClick={() =>
					{
						const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(cell.date).padStart(2, '0')}`;
						
						popup.Open(
							<>
								<h1>{dateString}</h1>
								{meetings?.map((meeting, i) =>
									meeting.when === dateString ?
									(
										<div key={i}>
											{meeting.other_names}&nbsp;
											({FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}):&nbsp;
											{meeting.topic}
										</div>
									) : null
								)}
							</>
						);
					}
				}/>}
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
	const [year,  setYear]  = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth());
	const [day,   setDay]   = useState(now.getDate());
	const [date,  setDate]  = useState("");

	const cell = useMemo(() => BuildDay(year, month, day, meetings), [year, month, day, meetings]);
	
	return (
		<div className="msp-day-display">
			<div className="msp-day-display-header">
				<input type="date" onChange={(e) =>
					{
						const [inYear, inMonth, inDay] = e.target.value.split("-");

						setYear (Number(inYear));
						setMonth(Number(inMonth));
						setDay  (Number(inDay));
					}
				}/>
			</div>

			<DayObj cell={cell} year={year} month={month} day={day} meetings={meetings}/>
		</div>
	);
}