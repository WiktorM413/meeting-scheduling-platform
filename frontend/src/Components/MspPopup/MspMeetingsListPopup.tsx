import "./style.scss";
import type { MeetingType } from "../../api/MeetingType";
import { useAuth } from "../../context/AuthContext";
import { FormatTime } from "../../utils/time";
import MspButton from "../MspButton";
import MspEditMeetingForm from "../MspEditMeeting/MspEditMeetingForm";
import { popup } from "./PopupManager";
import { GetFullDateString, GetWeekDayString } from "../../utils/dateUtils";

type MspMeetingsListPopupProps =
{
	date:     string;
	meetings: MeetingType[];
	otherNames: string[];
	onMeetingUpdate?: () => void;
}

export default function MspMeetingsListPopup({date, meetings, otherNames, onMeetingUpdate}: MspMeetingsListPopupProps)
{
	const { userData } = useAuth();
	const dayMeetings = meetings.filter(m => m.when === date);

	console.log(meetings);
	console.log(otherNames);

	return (
		<div className="msp-meetings-list-popup">
			<div className="msp-meetings-list-popup-header">
				<span className="msp-meetings-list-popup-header-weekday">
					{GetWeekDayString(date)}
				</span>
				<h2 className="msp-meetings-list-popup-header-day">
					{GetFullDateString(date)}
				</h2>
				<span className="msp-meetings-list-popup-count">
					{dayMeetings.length === 0 ? "No meetings" : dayMeetings.length === 1 ? "1 meeting" : `${dayMeetings.length} meetings`}
				</span>
			</div>
			<div className="msp-meetings-list-popup-body">
				{dayMeetings.length === 0 ?
				(
					<p className="msp-meetings-list-popup-empty">No meetings scheduled</p>
				)
				:
				dayMeetings.map((meeting) =>
				{
					const i = meetings.indexOf(meeting);

					return (
					<div key={meeting.unique_id} className={`msp-meetings-list-popup-item ${meeting.provider_id == userData?.id ? "msp-meetings-list-popup-item-owner" : ""}`}>
						<div className="msp-meetings-list-popup-time">
							<span>{FormatTime(meeting.time_start)}</span>
							<div className="msp-meetings-list-popup-time-line"/>
							<span>{FormatTime(meeting.time_end)}</span>
						</div>
						<div className="msp-meetings-list-popup-content">
							<span className="msp-meetings-list-popup-content-topic">{meeting.topic}</span>
							<span className="msp-meetings-list-popup-content-others">{otherNames[i]}</span>
							<span className="msp-meetings-list-popyp-content-where">{meeting.where}</span>
						</div>
						{meeting.provider_id == userData?.id &&
							<MspButton className="msp-meetings-list-popup-edit-button" label="Edit" onClick={() => {
								popup.Open(<MspEditMeetingForm meetingId={meeting.unique_id} onSuccess={onMeetingUpdate}/>);
							}}/>
						}
					</div>
					)
})
				}
			</div>
		</div>
	);
}