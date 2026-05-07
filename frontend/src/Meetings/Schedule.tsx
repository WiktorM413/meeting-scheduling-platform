import "./style.scss";
import { useState, useEffect } from "react";
import { ApiGetAllMeetingsForUser, ApiGetAllUsers } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "../api/MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import MspFormField from "../Components/MspFormField";
import type { UserData } from "../api/UserType";


async function Load(userData:    UserData|null,
					setMeetings: React.Dispatch<React.SetStateAction<MeetingType[]>>,
					setUsers:    React.Dispatch<React.SetStateAction<UserData[]>>)
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
				const handled = HandleResponse(response);
		
				if (handled?.type === "success")
				{
					setMeetings(handled.data);
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
	const [selectedDate, setSelectedDate] = useState("");
	const [receiverId,   setReceiverId]   = useState<number>();

	useEffect(() =>
	{
		Load(userData, setMeetings, setUsers);
	}, [userData, setMeetings, setUsers]);
	
	return (
		<div className="msp-schedule">
			<div className="msp-form">
				<section className="msp-meetings-calendar-wrapper">
					<div className="msp-meetings-calendar">
						<MspCalendar meetings={meetings} externalSelectedDateSetter={setSelectedDate}/>
					</div>
				</section>
				<select className="msp-schedule-user-select" value={receiverId} onChange={(e) => setReceiverId(Number(e.target.value))}>
					<option key="" value="">Choose a person</option>
					{
						users.map((user) =>
						(
							<option key={user.id} value={user.id}>
								{user.first_name} {user.last_name}
							</option>
						))
					}
				</select>
			</div>
		</div>
	);
}