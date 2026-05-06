import { useState, useEffect } from "react";
import type { ResponseType } from "../api/ResponseType";

import { ApiGetAllMeetings } from "../api/client";
import HandleResponse from "../api/HandleResponse";

export default function Index()
{
	const [response, setResponse] = useState<ResponseType|null>(null);

	useEffect(() => {
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
	}, [setResponse]);

	return (
		<>
			Hello in meetings index
		</>
	);
}