import { useState, useEffect } from "react";
import type { ResponseType } from "../api/ResponseType";

import { ApiGetAllMeetings } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import type { MeetingType } from "./MeetingType";

export default function Index()
{
	const [meetings, setMeetings] = useState<MeetingType[]>([]);
	const [response, setResponse] = useState<ResponseType|null>(null);

	useEffect(() =>
	{
		const loadMeetings = async () =>
		{
			try
			{
				const response = await ApiGetAllMeetings();

				setResponse(HandleResponse(response));
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
			Hello in meetings index
		</>
	);
}