import axios from "axios";
import HandleResponse from "./HandleResponse";

export const api = axios.create
({
	baseURL: import.meta.env.VITE_API_URL || "https://meeting-scheduling-platform-production.up.railway.app/api",
	withCredentials: true,
});

export async function ApiRegister(firstname: string, lastname: string, email: string, password: string)
{
	const response = await api.post("/register", 
		{
			firstname,
			lastname,
			email,
			password
		}
	);

	return HandleResponse(response);
}

export async function ApiLogin(email: string, password: string)
{
	const response = await api.post("/login",
		{
			email,
			password
		}
	)

	return HandleResponse(response);
}

export async function ApiMe()
{
	const response = await api.get("/me");

	return response;
}

export async function ApiLogout()
{
	const response = await api.get("/logout");
	
	return HandleResponse(response);
}

export async function ApiGetAllMeetings()
{
	const response = await api.get("/meetings");

	return HandleResponse(response);
}

export async function ApiGetMeetingById(meetingId: number)
{
	const response = await api.post("/getMeetingById",
		{
			"unique_id": meetingId
		}
	)

	return HandleResponse(response);
}

export async function ApiGetAllMeetingsForUser(userId: number)
{
	const response = await api.post("/meetingsForUser",
		{
			"user_id": userId
		}
	)

	return HandleResponse(response);
}

export async function ApiGetAllUsers()
{
	const response = await api.get("/getAllUsers");

	return HandleResponse(response);
}

export async function ApiGetUserById(userId: number)
{
	const response = await api.post("/getUserById",
		{
			"user_id": userId
		}
	)

	return HandleResponse(response);
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

	return HandleResponse(response);
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

	return HandleResponse(response);
}

export async function ApiGetUpcomingMeetings(userId: number)
{
	const response = await api.post("/getUpcomingMeetings",
		{
			"user_id": userId
		}
	)

	return HandleResponse(response);
}

export async function ApiGetUserStats(userId: number)
{
	const response = await api.post("/getUserStats",
		{
			"user_id": userId
		}
	)

	return HandleResponse(response);
}

export async function ApiUpdateUser(userId: number, firstname?: string, lastname?: string, email?: string, profilePic?: string, removeProfilePic: boolean = true)
{
	const response = await api.post("/updateUser",
		{
			"user_id":            userId     ?? null,
			"first_name":         firstname  ?? null,
			"last_name":          lastname   ?? null,
			"email":              email      ?? null,
			"profile_pic":        profilePic ?? null,
			"remove_profile_pic": removeProfilePic ? 1 : 0
		}
	)

	return HandleResponse(response);
}

export async function ApigetProfilePic(userId: number)
{
	const response = await api.post("/getProfilePic",
		{
			"user_id": userId
		}
	)
	
	return HandleResponse(response);
}

export async function ApiGetUserSettings(userId: number)
{
	const response = await api.post("/getUserSettings",
		{
			"user_id": userId
		}
	)

	return HandleResponse(response);
}

export async function ApiUpdateUserSettings(userId: number, publicProfile?: number, showEmail?: number)
{
	const response = await api.post("/updateUserSettings",
		{
			"user_id":        userId,
			"public_profile": publicProfile ?? null,
			"show_email":     showEmail ?? null
		}
	)

	return HandleResponse(response);
}

export async function ApiUpdateUserPassword(userId: number, currentPassword: string, newPassword: string, repeatPassword: string)
{
	const response = await api.post("/updatePassword",
		{
			"user_id":          userId,
			"current_password": currentPassword,
			"new_password":     newPassword,
			"repeat_password":  repeatPassword
		}
	)

	return HandleResponse(response);
}

export async function ApiDeleteUser(userId: number)
{
	const response = await api.post("/deleteUser",
		{
			"user_id": userId
		}
	)

	return HandleResponse(response);
}

export async function ApiGetPublicUsersLike(pattern: string)
{
	const response = await api.post("/getPublicUsersLike",
		{
			"pattern": pattern
		}
	)

	return HandleResponse(response);
}