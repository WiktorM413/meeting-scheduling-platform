import "./style.scss";
import { useEffect, useState } from "react";
import MspUserPicker from "../../Meetings/MspUserPicker/MspUserPicker";
import MspButton from "../MspButton";
import MspCalendar from "../MspCalendar/MspCalendar";
import MspFormField from "../MspFormField";
import type { UserData } from "../../api/UserType";
import { ApiEditMeeting, ApiGetAllUsers, ApiGetMeetingById } from "../../api/client";
import type { MeetingType } from "../../api/MeetingType";
import { FormatTime } from "../../utils/time";

type MspEditMeetingFormProps =
{
	meetingId:  number;
	onSuccess?: () => void;
}

export default function MspEditMeetingForm({meetingId, onSuccess}: MspEditMeetingFormProps)
{
	const [selectedDate, setSelectedDate] = useState("");
	const [topic,        setTopic]        = useState("");
	const [where,        setWhere]        = useState("");
	const [startTime,    setStartTime]    = useState("");
	const [endTime,      setEndTime]      = useState("");
	const [receiverIds,  setReceiverIds]  = useState<number[]>([]);
	const [users,        setUsers]        = useState<UserData[]>([]);
	const [responseType, setResponseType] = useState("");
	
	useEffect(() =>
	{
		const loadUsers =  async (): Promise<UserData[]> =>
		{
			try
			{
				const response = await ApiGetAllUsers();

				if (response.type === "success")
				{
					return response.data;
				}
			}
			catch (error)
			{
				console.log("Error while retrievin data:", error);
			}

			return [];
		}

		const loadCurrentMeeting = async (meetingId: number): Promise<MeetingType> =>
		{
			try
			{
				const response = await ApiGetMeetingById(meetingId);

				if (response.type === "success")
				{
					setReceiverIds(response.data.receiver_ids.split(",").map((id: string) => Number(id)))
					return response.data;
				}
			}
			catch (error)
			{
				console.log("Error while retrieving data:", error);
			}

			return {} as MeetingType;
		}

		const load = async () =>
		{
			const users =          await loadUsers();
			const currentMeeting = await loadCurrentMeeting(meetingId);
			
			setUsers(users);
			setSelectedDate(currentMeeting.when);
			setTopic(currentMeeting.topic);
			setWhere(currentMeeting.where);
			setStartTime(currentMeeting.time_start);
			setEndTime(currentMeeting.time_end);
		}

		load();
	}, [meetingId])
	
	return (
		<div className="msp-edit-meeting">
			<div className="msp-edit-meeting-form">
				<section className="msp-meetings-calendar-wrapper">
					<div className="msp-meetings-calendar">
						<MspCalendar label="Choose a day" externalSelectedDateSetter={setSelectedDate} selectedDate={Number(selectedDate.split("-")[2])}/>
					</div>
				</section>
				<MspUserPicker className="msp-edit-meeting-user-picker" receiverIds={receiverIds} users={users} setReceiverIds={setReceiverIds}/>
				<MspFormField  className="msp-edit-meeting-form-field" value={topic}     setter={setTopic}     label="Set a topic"/>
				<MspFormField  className="msp-edit-meeting-form-field" value={where}     setter={setWhere}     label="Set a place"/>
				<MspFormField  className="msp-edit-meeting-form-field" value={startTime} setter={setStartTime} label="When to start" inputType="time"/>
				<MspFormField  className="msp-edit-meeting-form-field" value={endTime}   setter={setEndTime}   label="When to end"   inputType="time"/>

				<div className="msp-edit-meeting-form-submit">
					<MspButton label="Edit meeting" onClick={async () => {
						const finalSelectedDate: string|undefined   = selectedDate       === "" ? undefined : selectedDate;
						const finalTopic:        string|undefined   = topic              === "" ? undefined : topic;
						const finalWhere:        string|undefined   = where              === "" ? undefined : where;
						const finalStartTime:    string|undefined   = startTime          === "" ? undefined : FormatTime(startTime);
						const finalEndTime:      string|undefined   = endTime            === "" ? undefined : FormatTime(endTime);
						const finalReceiverIds:  number[]|undefined = receiverIds.length === 0  ? undefined : receiverIds;

						const response = await ApiEditMeeting(meetingId, finalReceiverIds, finalStartTime, finalEndTime, finalTopic, finalWhere, finalSelectedDate);

						setResponseType(response.type);

						if (response.type === "success")
						{
							onSuccess?.();
						}
					}}/>
				</div>

				{responseType === "success" &&
					<div className="msp-small-text msp-edit-meeting-form-message">
						<p className="msp-success">Successfully edited a meeting</p>
					</div>
				}
				{
					responseType === "error" &&
					<div className="msp-small-text msp-edit-meeting-form-message">
						<p className="msp-error">Could not edit a meeting for some reason</p>
					</div>
				}
			</div>
		</div>
	)
}