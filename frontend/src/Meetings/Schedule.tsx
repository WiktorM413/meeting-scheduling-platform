import "./style.scss";
import { useState, useEffect, useRef } from "react";
import { ApiCreateMeeting, ApiGetAllMeetingsForUser, ApiGetAllUsers } from "../api/client";
import type { MeetingType } from "../api/MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import MspFormField from "../Components/MspFormField";
import type { UserData } from "../api/UserType";
import MspButton from "../Components/MspButton";
import MspUserPicker from "./MspUserPicker/MspUserPicker";


async function Load(userData:      UserData|null,
					setMeetings:   React.Dispatch<React.SetStateAction<MeetingType[]>>,
					setUsers:      React.Dispatch<React.SetStateAction<UserData[]>>,
					setOtherNames: React.Dispatch<React.SetStateAction<string[]>>)
{
	const loadMeetings = async () =>
	{
		try
		{
			if (!userData) {
				setMeetings([]);
				return;
			}

			const response = await ApiGetAllMeetingsForUser(userData.id);
	
			if (response.type === "success")
			{
				setMeetings(response.data);
				setOtherNames(response.data.map((meeting: any) => meeting.other_names));
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

			if (response.type === "success")
			{
				setUsers(response.data);
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
	const [selectedDate, setSelectedDate] = useState("");
	const [receiverIds,  setReceiverIds]  = useState<number[]>([]);
	
	const [topic,        setTopic]        = useState("");
	const [where,        setWhere]        = useState("");
	const [startTime,    setStartTime]    = useState("");
	const [endTime,      setEndTime]      = useState("");
	const [message,      setMessage]      = useState("");
	const [responseType, setResponseType] = useState("error");
	const [otherNames,   setOtherNames]   = useState<string[]>([]);

	const formRef = useRef<HTMLDivElement|null>(null);

	useEffect(() =>
	{
		Load(userData, setMeetings, setUsers, setOtherNames);
	}, [userData, setMeetings, setUsers]);

	useEffect(() =>
	{
		formRef.current?.scrollIntoView({behavior: "smooth"});
	}, [selectedDate]);
	
	const createMeeting = async () =>
	{
		try
		{
			if (receiverIds.length == 0)
			{
				setMessage("Error: The user field is required");
				return;
			}

			if (userData)
			{
				const response = await ApiCreateMeeting(userData.id, receiverIds, topic, selectedDate, where, startTime, endTime)

				setMessage(response.message);
				setResponseType(response.type);

				if (response.type === "success")
				{
					await Load(userData, setMeetings, setUsers, setOtherNames);
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
				<div className="msp-meetings-calendar-wrapper">
					<div className="msp-meetings-calendar">
						<MspCalendar label="Choose a day" meetings={meetings} externalSelectedDateSetter={setSelectedDate} otherNames={otherNames}/>
					</div>
				</div>
				<div ref={formRef}>
					<MspUserPicker receiverIds={receiverIds} users={users} setReceiverIds={setReceiverIds}/>
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
		</div>
	);
}