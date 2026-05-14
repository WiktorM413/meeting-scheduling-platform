import "./style.scss";
import type { MeetingType } from "../../api/MeetingType"
import { FormatTime } from "../../utils/time";

type MspListDisplayProps =
{
	meetings?:   MeetingType[];
	otherNames?: string[];
}

function MapMeetings(meetings: MeetingType[]): Map<string, MeetingType[]>
{
	const mappedMeetings = new Map<string, MeetingType[]>;

	meetings.map((meeting) =>
	{
		if (! mappedMeetings.get(meeting.when))
		{
			mappedMeetings.set(meeting.when, [meeting]);
		}
		else
		{
			mappedMeetings.get(meeting.when)?.push(meeting);
		}
	});

	return mappedMeetings;
}

export default function MspListDisplay({meetings, otherNames}: MspListDisplayProps)
{
	if (! meetings)
	{
		return (
			<div className="msp-list-display">
				<p>There are no meetings</p>
			</div>
		);
	}

	const mappedMeetings = MapMeetings(meetings);
	console.log(mappedMeetings);
	return (
		<div className="msp-list-display">
			<div className="msp-list-display-list">
				{[...mappedMeetings.entries()].sort().map(([date, meetings]) => (
					<div key={date}>
						<h2>{date}</h2>
						<div className="msp-list-display-meetings">
						{meetings.map((meeting, i) => (
							<div className="msp-list-display-meeting-card">
								<div className="msp-list-display-meeting-time">
									{FormatTime(meeting.time_start)} - {FormatTime(meeting.time_end)}
								</div>

								<div className="msp-list-display-meeting-main">
									<div className="msp-list-display-meeting-topic">
										{meeting.topic}
									</div>

									<div className="msp-list-display-meeting-people">
										{otherNames ? otherNames[i] : <></>}
									</div>
								</div>
							</div>
						))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}