import "./style.scss";
import { useEffect, useState } from "react";
import MspUserPicker from "../../Meetings/MspUserPicker/MspUserPicker";
import MspButton from "../MspButton";
import MspCalendar from "../MspCalendar/MspCalendar";
import MspFormField from "../MspFormField";
import type { UserData } from "../../api/UserType";
import { ApiEditMeeting, ApiGetAllUsers } from "../../api/client";
import HandleResponse from "../../api/HandleResponse";

async function LoadUsers(): Promise<UserData[]>
{
	try
	{
		const response = await ApiGetAllUsers();
		const handled = HandleResponse(response);

		if (handled.type === "success")
		{
			return handled.data;
		}
	}
	catch (error)
	{
		console.log("Error while retrievin data:", error);
	}

	return [];
}

type MspEditMeetingFormProps =
{
	meetingId: number;
}

export default function MspEditMeetingForm({meetingId}: MspEditMeetingFormProps)
{
	const [selectedDate, setSelectedDate] = useState("");
	const [topic,        setTopic]        = useState("");
	const [where,        setWhere]        = useState("");
	const [startTime,    setStartTime]    = useState("");
	const [endTime,      setEndTime]      = useState("");
	const [receiverIds,  setReceiverIds]  = useState<number[]>([]);
	const [users,        setUsers]        = useState<UserData[]>([]);
	
	useEffect(() =>
	{
		const load = async () =>
		{
			const users = await LoadUsers();

			setUsers(users);
		}

		load();
	}, [])

	return (
		<div className="msp-edit-meeting">
			<div className="msp-edit-meeting-form">
				<section className="msp-meetings-calendar-wrapper">
					<div className="msp-meetings-calendar">
						<MspCalendar label="Choose a day" externalSelectedDateSetter={setSelectedDate}/>
					</div>
				</section>
				<MspUserPicker className="msp-edit-meeting-user-picker" receiverIds={receiverIds} users={users} setReceiverIds={setReceiverIds}/>
				<MspFormField  className="msp-edit-meeting-form-field" value={topic}     setter={setTopic}     label="Set a topic"/>
				<MspFormField  className="msp-edit-meeting-form-field" value={where}     setter={setWhere}     label="Set a place"/>
				<MspFormField  className="msp-edit-meeting-form-field" value={startTime} setter={setStartTime} label="When to start" inputType="time"/>
				<MspFormField  className="msp-edit-meeting-form-field" value={endTime}  setter={setEndTime}    label="When to end"   inputType="time"/>

				<div className="msp-edit-meeting-form-submit">
					<MspButton label="Edit meeting" onClick={async () => {
						const finalSelectedDate: string|undefined   = selectedDate       === "" ? undefined : selectedDate;
						const finalTopic:        string|undefined   = topic              === "" ? undefined: topic;
						const finalWhere:        string|undefined   = where              === "" ? undefined: where;
						const finalStartTime:    string|undefined   = startTime          === "" ? undefined: startTime;
						const finalEndTime:      string|undefined   = endTime            === "" ? undefined: endTime;
						const finalReceiverIds:  number[]|undefined = receiverIds.length === 0  ? undefined: receiverIds;

						const response = await ApiEditMeeting(meetingId, finalReceiverIds, finalStartTime, finalEndTime, finalTopic, finalWhere, finalSelectedDate);

						console.log(response);
					}}/>
				</div>
			</div>
		</div>
	)
}