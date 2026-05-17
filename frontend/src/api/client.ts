import axios, { type AxiosResponse } from "axios";

export const api = axios.create
({
	baseURL: "http://localhost:8080/api",
	withCredentials: true,
});

export async function ApiRegister(firstname: string, lastname: string, email: string, password: string): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.post("/register", 
		{
			firstname,
			lastname,
			email,
			password
		}
	);

	return response;
}

export async function ApiLogin(email: string, password: string): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.post("/login",
		{
			email,
			password
		}
	)

	return response;
}

export async function ApiMe(): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.get("/me");

	return response;
}

export async function ApiLogout(): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.get("/logout");
	
	return response;
}

export async function ApiGetAllMeetings(): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.get("/meetings");

	return response;
}

export async function ApiGetMeetingById(meetingId: number): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.post("/getMeetingById",
		{
			"unique_id": meetingId
		}
	)

	return response;
}

export async function ApiGetAllMeetingsForUser(userId: number): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.post("/meetingsForUser",
		{
			"user_id": userId
		}
	)

	return response;
}

export async function ApiGetAllUsers()
{
	const response = await api.get("/getAllUsers");

	return response;
}

export async function ApiGetUserById(userId: number)
{
	const response = await api.post("/getUserById",
		{
			"user_id": userId
		}
	)

	return response;
}

export async function ApiCreateMeeting(providerId: number, receiverIds: number[], topic: string, when: string, where: string, timeStart: string, timeEnd: string)
{
	const response = await api.post("/createMeeting",
		{
			"provider_id":  providerId,
			"receiver_ids": receiverIds,
			"topic":        topic,
			"when":         when,
			"where":        where,
			"time_start":   timeStart,
			"time_end":     timeEnd
		}
	)

	return response;
}

export async function ApiEditMeeting(meetingId: number, newReceiverIds?: number[], newTimeStart?: string,
newTimeEnd?: string, newTopic?: string, newWhere?: string, newWhen?: string)
{
	const response = await api.post("/editMeeting",
		{
			"unique_id":    meetingId,
			"receiver_ids": newReceiverIds,
			"time_start":   newTimeStart,
			"time_end":     newTimeEnd,
			"topic":        newTopic,
			"where":        newWhere,
			"when":         newWhen
		}
	)

	return response;
}

export async function ApiGetUpcomingMeetings(userId: number)
{
	const response = await api.post("/getUpcomingMeetings",
		{
			"user_id": userId
		}
	)

	return response;
}

export async function ApiGetUserStats(userId: number)
{
	const response = await api.post("/getUserStats",
		{
			"user_id": userId
		}
	)

	return response;
}