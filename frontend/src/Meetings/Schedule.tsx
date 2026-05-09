import "./style.scss";
import { useState, useEffect } from "react";
import { ApiCreateMeeting, ApiGetAllMeetingsForUser, ApiGetAllUsers, ApiGetUserById } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "../api/MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import MspFormField from "../Components/MspFormField";
import type { UserData } from "../api/UserType";
import MspSelect from "../Components/MspSelect";
import MspButton from "../Components/MspButton";


async function Load(userData:     UserData|null,
					setMeetings:  React.Dispatch<React.SetStateAction<MeetingType[]>>,
					setUsers:     React.Dispatch<React.SetStateAction<UserData[]>>,
					setReceivers: React.Dispatch<React.SetStateAction<UserData[]>>)
{
		const loadReceivers = async (meetings: MeetingType[]) =>
		{
			setReceivers([]);

			for (const meeting of meetings)
			{
				try
				{
					const response = await ApiGetUserById(meeting.receiver_id);
					const handled = HandleResponse(response);

					if (handled?.type == "success")
					{
						setReceivers(receivers => [...receivers, handled?.data]);
					}
				}
				catch (error)
				{
					console.log("Error retrieving data: ", error);
				}
			}
		}

		const loadMeetings = async () =>
		{
			try
			{
				if (!userData) {
					setMeetings([]);
					return;
				}
	
				const response = await ApiGetAllMeetingsForUser(userData.id);
				const handled = HandleResponse(response);
		
				if (handled?.type === "success")
				{
					setMeetings(handled.data);

					await loadReceivers(handled.data);
				}
				else
				{
					setMeetings([]);
				}
			}
			catch (error)
			{
				console.log("Error submitting data: ", error);
			}
		};

		const loadUsers = async () =>
		{
			try
			{
				if (!userData)
				{
					setUsers([]);
					return;
				}

				const response = await ApiGetAllUsers();
				const handled = HandleResponse(response);

				if (handled.type === "success")
				{
					setUsers(handled.data);
				}
				else
				{
					setUsers([]);
				}
			}
			catch (error)
			{
				console.log("Error submitting data: ", error);
			}
		}
	
		loadMeetings();
		loadUsers();
}

export default function Schedule()
{
	const { userData } = useAuth();

	const [meetings,     setMeetings]     = useState<MeetingType[]>([]);
	const [users,        setUsers]        = useState<UserData[]>([]);
	const [receivers,    setReceivers]    = useState<UserData[]>([]);
	const [selectedDate, setSelectedDate] = useState("");
	const [receiverId,   setReceiverId]   = useState<number>(-1);
	const [topic,        setTopic]        = useState("");
	const [where,        setWhere]        = useState("");
	const [startTime,    setStartTime]    = useState("");
	const [endTime,      setEndTime]      = useState("");
	const [message,      setMessage]      = useState("");
	const [responseType, setResponseType] = useState("error");

	useEffect(() =>
	{
		Load(userData, setMeetings, setUsers, setReceivers);
	}, [userData, setMeetings, setUsers]);
	
	const createMeeting = async () =>
	{
		try
		{
			if (receiverId == -1)
			{
				setMessage("Error: The user field is required");
				return;
			}

			if (userData)
			{
				const response = await ApiCreateMeeting(userData.id, receiverId, topic, selectedDate, where, startTime, endTime)
				const handled = HandleResponse(response);

				setMessage(handled.message);
				setResponseType(handled.type);

				if (handled.type === "success")
				{
					await Load(userData, setMeetings, setUsers, setReceivers);
				}
			}
		}
		catch (error)
		{
			console.log("Error submitting data: ", error);
		}
	}

	return (
		<div className="msp-schedule">
			<div className="msp-schedule-form">
				<section className="msp-meetings-calendar-wrapper">
					<div className="msp-meetings-calendar">
						<MspCalendar label="Choose a day" meetings={meetings} receivers={receivers} externalSelectedDateSetter={setSelectedDate}/>
					</div>
				</section>
				<MspSelect label="Choose a user" value={receiverId} setter={setReceiverId} className="msp-schedule-user-select">
					<option key="" value="">Choose a person</option>
					{
						users.map((user) =>
						(
							<option key={user.id} value={user.id}>
								{user.first_name} {user.last_name}
							</option>
						))
					}
				</MspSelect>
				<MspFormField className="msp-schedule-form-field" value={topic}     setter={setTopic}     label="Set a topic"/>
				<MspFormField className="msp-schedule-form-field" value={where}     setter={setWhere}     label="Set a place"/>
				<MspFormField className="msp-schedule-form-field" value={startTime} setter={setStartTime} label="When to start" inputType="time"/>
				<MspFormField className="msp-schedule-form-field" value={endTime}  setter={setEndTime}    label="When to end"   inputType="time"/>

				<div className="msp-schedule-form-submit">
					<MspButton label="Schedule meeting" onClick={createMeeting}/>
					<div className="msp-small-text">
						<p className={responseType === "error" ? "msp-error" : "msp-success"}>{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
}