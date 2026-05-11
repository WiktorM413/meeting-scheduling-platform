import "./style.scss";
import { useState } from "react";
import type { MeetingType } from "../../api/MeetingType"
import { FormatTime } from "../../utils/time";

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
			
	return (
		<div className="msp-day-display">
			<div className="msp-day-display-header">
				<input value={today} type="date" onChange={(e) => setDate(e.target.value)}/>
			</div>

			<DayObj date={date} meetings={meetings}/>
		</div>
	);
}