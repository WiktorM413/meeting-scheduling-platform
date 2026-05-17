import "./style.scss";
import { useState } from "react";
import type { MeetingType } from "../../api/MeetingType"
import { FormatTime } from "../../utils/time";
import MspButton from "../MspButton";
import { useAuth } from "../../context/AuthContext";
import { popup } from "../MspPopup/PopupManager";
import MspEditMeetingForm from "../MspEditMeeting/MspEditMeetingForm";

type DayObjPorps =
{
	date:             string;
	meetings?:        MeetingType[];
	otherNames?:      string[];
	onMeetingUpdate?: () => void;
}

function DayObj({date, meetings, otherNames, onMeetingUpdate}: DayObjPorps)
{
	const matchingMeetings = meetings?.filter((meeting) => meeting.when === date) ?? [];
	const { userData }    = useAuth();
	
	return (
		<div className="msp-day-display-meetings">
			{matchingMeetings.map((meeting, i) =>
			{
				if (meeting.when === date)
				{
					return (
						<div className="msp-day-display-meeting-card">
							<div>	
								<div className="msp-day-display-meeting-time">
									{FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}
								</div>

								<div className="msp-day-display-meeting-main">
									<div className="msp-day-display-meeting-topic">
										{meeting.topic}
									</div>

									<div className="msp-day-display-meeting-people">
										{otherNames ? otherNames[i] : <></>}
									</div>
								</div>
							</div>
							{meeting.provider_id == userData?.id &&
								<div className="msp-day-display-meeting-edit">
									<MspButton label="Edit" onClick={() =>
										{
											popup.Open(
												<MspEditMeetingForm meetingId={meeting.unique_id} onSuccess={onMeetingUpdate}/>
											);
										}
									}/>
								</div>
							}
						</div>
					)
				}
			})}

			{matchingMeetings.length === 0 &&
			(
				<p className="msp-day-display-message">No events on {date}</p>
			)}
		</div>
	)
}

type MspDayDisplayProps =
{
	meetings?:        MeetingType[];
	otherNames?:      string[];
	onMeetingUpdate?: () => void;
}

export default function MspDayDisplay({meetings, otherNames, onMeetingUpdate}: MspDayDisplayProps)
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
				<input value={date} type="date" onChange={(e) => setDate(e.target.value)}/>
			</div>

			{meetings ?
				<DayObj date={date} meetings={meetings} otherNames={otherNames} onMeetingUpdate={onMeetingUpdate}/>
			:
				<p>No meetings on {date}</p>
			}
		</div>
	);
}