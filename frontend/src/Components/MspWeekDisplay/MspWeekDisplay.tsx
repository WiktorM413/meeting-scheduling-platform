import "./style.scss";
import { useMemo, useState } from "react";
import type { MeetingType } from "../../api/MeetingType";
import type { DayCell } from "../MspCalendar/DayCell";
import MspButton from "../MspButton";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BuildWeek(year: number, month: number, startDay: number, meetings?: MeetingType[]): DayCell[]
{
	const firstDay    = new Date(year, month, startDay);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const today       = new Date();

	const cells: DayCell[] = [];

	for (let d = startDay; cells.length < 7; d++)
	{
		if (d > daysInMonth)
		{
			d = 1;
		}

		const dateObj = new Date(year, month, d);
		const isToday = 
			dateObj.getDate()     === today.getDate()  &&
			dateObj.getMonth()    === today.getMonth() &&
			dateObj.getFullYear() === today.getFullYear();

		const day = (dateObj.getDay() + 6) % 7; // Convert from 0 -> Sunday to 0 -> Monday
		const isAvailable = day < 5;
		let hasEvents = false;

		if (meetings)
		{
			for (let i = 0; i < meetings.length; i++)
			{
				let dateArr = meetings[i].when.split("-");

				if (Number(dateArr[0])     === year  &&
					Number(dateArr[1]) - 1 === month && // months are by index
					Number(dateArr[2])     === d)
				{
					hasEvents = true;
					break;
				}
			}
		}

		cells.push
		({
			date:         d,
			isToday:      isToday,
			isSelected:   false,
			hasEvents:    hasEvents,
			availability: isAvailable
		});
	}

	return cells;
}

export default function MspWeekDisplay()
{
	const now = new Date();
	const [year,  setYear]              = useState(now.getFullYear());
	const [month, setMonth]             = useState(now.getMonth());
	const [startDay, setStartDay]       = useState<number>(1);
	const [selectedDay, setSelectedDay] = useState<number|null>(null);

	const days = useMemo(() => BuildWeek(year, month, startDay), [year, month, startDay]);
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const prevWeek = () =>
	{
		const d = new Date(year, month, startDay - 7);
		setYear(d.getFullYear());
		setMonth(d.getMonth());
		setStartDay(d.getDate());
		setSelectedDay(null);
	}

	const nextWeek = () =>
	{
	
		const d = new Date(year, month, startDay + 7);
		setYear(d.getFullYear());
		setMonth(d.getMonth());
		setStartDay(d.getDate());
		setSelectedDay(null);
	}

	return (
		<div className="msp-week-display">
			<div className="msp-week-display-header">
				<MspButton label="<" onClick={prevWeek}/>
				<h2>
					{new Date(year, month, startDay).toLocaleString("default",
						{
							day: "2-digit",
							month: "2-digit",
							year:  "numeric",
						}
					)}
					-
					{new Date(year, month, startDay + 6).toLocaleString("default",
						{
							day: "2-digit",
							month: "2-digit",
							year:  "numeric",
						}
					)}
				</h2>
				<MspButton label=">" onClick={nextWeek}/>
			</div>
		</div>
	);
}