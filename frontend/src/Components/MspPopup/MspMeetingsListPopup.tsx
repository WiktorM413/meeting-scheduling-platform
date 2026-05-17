import "./style.scss";
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
	otherNames: string[];
	onMeetingUpdate?: () => void;
}

export default function MspMeetingsListPopup({date, meetings, otherNames, onMeetingUpdate}: MspMeetingsListPopupProps)
{
	const { userData } = useAuth();

	return (
		<div className="msp-meetings-list-popup">
			<h1>{date}</h1>
			{meetings?.map((meeting, i) =>
				meeting.when === date ?
				(
					
					<div key={i}>
						{otherNames[i]}&nbsp;
						({FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}):&nbsp;
						{meeting.topic}&nbsp;
						{meeting.provider_id === userData?.id ? <MspButton className="msp-meetings-list-popup-edit-button" label="Edit" onClick={() =>{
							popup.Open(<MspEditMeetingForm meetingId={meeting.unique_id} onSuccess={onMeetingUpdate}/>);
						}}/> : <></>}
					</div>
				) : null
			)}
		</div>
	);
}