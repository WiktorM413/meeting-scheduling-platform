import { useState, useEffect } from "react";
import type { ResponseType } from "../api/ResponseType";

import { ApiGetAllMeetingsForUser } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "./MeetingType";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import { useAuth } from "../context/AuthContext";
import type { AxiosResponse } from "axios";

export default function Index()
{
	const { userData } = useAuth();

	const [meetings, setMeetings] = useState<MeetingType[]>([]);
	const [response, setResponse] = useState<ResponseType|null>(null);

	useEffect(() =>
	{
		const loadMeetings = async () =>
		{
			try
			{
				let response: AxiosResponse<any, any, {}>;
				if (userData)
				{
					response = await ApiGetAllMeetingsForUser(userData.id);
					setResponse(HandleResponse(response));
				}
				else
				{
					setResponse(null);
				}

			}
			catch (error)
			{
				console.log("Error submitting data: ", error);
			}
		}

	loadMeetings();

	if (response?.type === "success")
	{
		setMeetings(response.data);
	}
	}, [response, setResponse, setMeetings]);

	return (
		<>
			<MspCalendar meetings={meetings}/>
		</>
	);
}