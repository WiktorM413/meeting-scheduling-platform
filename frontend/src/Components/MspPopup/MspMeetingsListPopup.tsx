import type { MeetingType } from "../../api/MeetingType";
import { useAuth } from "../../context/AuthContext";
import { FormatTime } from "../../utils/time";
import MspButton from "../MspButton";
import MspEditMeetingForm from "../MspEditMeeting/MspEditMeetingForm";
import { popup } from "./PopupManager";

type MspMeetingsListPopupProps =
{
	date:     string;
	meetings: MeetingType[];
}

export default function MspMeetingsListPopup({date, meetings}: MspMeetingsListPopupProps)
{
	const { userData } = useAuth();

	return (
		<div className="msp-meetings-list-popup">
			<h1>{date}</h1>
			{meetings?.map((meeting, i) =>
				meeting.when === date ?
				(
					
					<div key={i}>
						{meeting.other_names}&nbsp;
						({FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}):&nbsp;
						{meeting.topic}&nbsp;
						{meeting.provider_id === userData?.id ? <MspButton label="Edit" onClick={() =>{
							popup.Open(<MspEditMeetingForm meetingId={meeting.unique_id}/>);
						}}/> : <></>}
					</div>
				) : null
			)}
		</div>
	);
}