import type { MeetingType } from "../../api/MeetingType";
import { FormatTime } from "../../utils/time";

type MspMeetingsListPopupProps =
{
	date: string;
	meetings: MeetingType[];
}

export default function MspMeetingsListPopup({date, meetings}: MspMeetingsListPopupProps)
{
	return (
		<div className="msp-meetings-list-popup">
			<h1>{date}</h1>
			{meetings?.map((meeting, i) =>
				meeting.when === date ?
				(
					<div key={i}>
						{meeting.other_names}&nbsp;
						({FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}):&nbsp;
						{meeting.topic}
					</div>
				) : null
			)}
		</div>
	);
}