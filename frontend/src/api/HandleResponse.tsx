import type { AxiosResponse } from "axios";
import type { ResponseType } from "./ResponseType";

export default function HandleResponse(response: AxiosResponse<any, any, {}>): ResponseType
{
	if (response.data.error)
	{
		return {
			type:    "error",
			message: response.data.message,
		};
	}

	return {
		type:    "success",
		message: "Successfully registered",
	};
}