import "./style.scss";
import { useMemo, useState } from "react";
import type { MeetingType } from "../../api/MeetingType";
import type { DayCell } from "../MspCalendar/DayCell";
import MspButton from "../MspButton";
import { popup } from "../MspPopup/PopupManager";
import { FormatTime } from "../../utils/time";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function BuildWeek(year: number, month: number, startDay: number, meetings?: MeetingType[]): DayCell[]
{
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

type MspWeekDisplayProps =
{
	meetings?: MeetingType[];
	startDayNum?: number;
}

export default function MspWeekDisplay({ meetings, startDayNum = 1 }: MspWeekDisplayProps)
{
	const now = new Date();
	const [year,  setYear]              = useState(now.getFullYear());
	const [month, setMonth]             = useState(now.getMonth());
	const [startDay, setStartDay]       = useState<number>(startDayNum);
	const [selectedDay, setSelectedDay] = useState<number|null>(null);

	const days = useMemo(() => BuildWeek(year, month, startDay, meetings), [year, month, startDay, meetings]);

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

	let weekdaysObj: string[] = [];
	{
		let day = new Date(year, month, startDayNum).getDay() - 2;
		if (day < 0)
		{
			day = 7 + day;
		}
		
		for (let i = 0; i < 7; i++)
		{
			day = (day + 1) % 7;
			weekdaysObj.push(WEEKDAYS[day]); 
		}
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

			<div className="msp-week-display-weekdays">
				{weekdaysObj.map((weekday) =>
				(
					<div key={weekday} className="msp-week-display-weekday">
						{weekday}
					</div>
				))}
			</div>

			<div className="msp-week-display-week">
				{days.map((day, i) =>
				{
					if (!day)
					{
						return <div key={i} className="msp-week-display-cell msp-week-display-cell-empty"/>
					}

					const isSelected = selectedDay === day.date;

					return (
						<div
							key={i}
							className={`msp-week-display-cell ${
								isSelected ? "msp-week-display-cell-selected" : ""
							} ${
								day?.isToday ? "msp-week-display-cell-today" : ""
							} ${
								day?.availability ? "msp-week-display-cell-available": "msp-week-display-cell-blocked"
							}`}
							onClick={() => setSelectedDay(day.date)}
						>
							<span className="msp-week-display-cell-date">{day.date}</span>
							{day.hasEvents && <span className="msp-calendar-cell-dot"
								onClick={() =>
								{
									const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
									
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
				})}
			</div>
		</div>
	);
}