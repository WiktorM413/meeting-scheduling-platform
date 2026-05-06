import "./style.scss";
import { useMemo, useState } from "react";
import type { DayCell } from "./DayCell";
import MspButton from "../MspButton";
import type { MeetingType } from "../../Meetings/MeetingType";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BuildMonth(year: number, month: number, meetings?: MeetingType[]): DayCell[]
{
	const firstDay =    new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const today =       new Date();
	
	const offset           = (firstDay.getDay() + 6) % 7; // Convert from 0 -> Sunday to 0 -> Monday
	const cells: DayCell[] = [];

	for (let i = 0; i < offset; i++)
	{
		cells.push(null);
	}

	for (let d = 1; d <= daysInMonth; d++)
	{
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
			availability: isAvailable,
		});
	}
	while (cells.length % 7 !== 0)
	{
		cells.push(null);
	}

	return cells;
}

type MspCalendarProps =
{
	meetings?: MeetingType[];
}

export default function MspCalendar({ meetings }: MspCalendarProps)
{
	const now = new Date();
	const [year,  setYear]  = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth());
	const [selectedDay, setSelectedDay] = useState<number|null>(now.getDate());

	const days = useMemo(() => BuildMonth(year, month, meetings), [year, month, meetings]);

	const prevMonth = () =>
	{
		const d = new Date(year, month - 1);
		setYear(d.getFullYear());
		setMonth(d.getMonth());
		setSelectedDay(null);
	}

	const nextMonth = () =>
	{
		const d = new Date(year, month + 1);
		setYear(d.getFullYear());
		setMonth(d.getMonth());
		setSelectedDay(null);
	}

	return (
		<div className="msp-calendar">
			<div className="msp-calendar-header">
				<MspButton label="<" onClick={prevMonth}/>
				<h2>
					{new Date(year, month).toLocaleString("default",
						{
							month: "long",
							year:  "numeric",
						}
					)}
				</h2>
				<MspButton label=">" onClick={nextMonth}/>
			</div>

			<div className="msp-calendar-weekdays">
				{WEEKDAYS.map((d) =>
					<div key={d} className="msp-calendar-weekday">
						{d}
					</div>
				)}
			</div>

			<div className="msp-calendar-grid">
				{days.map((cell, i) =>
				{
					if (!cell)
					{
						return <div key={i} className="msp-calendar-cell msp-calendar-cell-empty"/>
					}

					const isSelected = selectedDay === cell.date;

					return (
						<div
							key={i}
							className={`msp-calendar-cell ${
								isSelected ? "msp-calendar-cell-selected" : ""
							} ${
								cell.isToday ? "msp-calendar-cell-today" : ""
							} ${
								cell.availability ? "msp-calendar-cell-available" : "msp-calendar-cell-blocked"
							}`}
							onClick={() => setSelectedDay(cell.date)}
						>
							<span className="msp-calendar-cell-date">{cell.date}</span>
							{cell.hasEvents && <span className="msp-calendar-cell-dot"/>}
						</div>
					);
				})}
			</div>
		</div>
	);
}