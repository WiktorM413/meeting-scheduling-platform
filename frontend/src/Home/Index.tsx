import { useState, useEffect } from "react";
import { api } from "../api/client";

export default function Index()
{
	const [message, setMessage] = useState("");

	useEffect(() => {
		api.get("/home").then((res) =>
		{
			setMessage(res.data.message);
		})
	});

	return (
		<><p>{message}</p></>
	);
}