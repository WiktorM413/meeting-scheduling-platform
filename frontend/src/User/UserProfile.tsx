import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { UserData } from "../api/UserType";
import { ApiGetUserById } from "../api/client";
import HandleResponse from "../api/HandleResponse";

export default function UserProfile()
{
	const { userId }   = useParams();
	const { userData } = useAuth();

	if (! userId)
	{
		return (
			<div className="msp-user-profile">
				<h1 className="msp-error">Wrong url</h1>
			</div>
		)
	}

	const [user,          setUser]          = useState<UserData|null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);

	useEffect(() =>
	{
		const loadUser = async () =>
		{
			if (Number(userId) == userData?.id)
			{
				setUser(userData);
				setIsCurrentUser(true);
			}
			else
			{
				try
				{
					const response = await ApiGetUserById(Number(userId));
					const handled  = HandleResponse(response);

					if (handled.type === "success")
					{
						setUser(handled.data);
						setIsCurrentUser(false);
					}
				}
				catch (error)
				{
					console.log("Error retrieving user:", error);
				}
			}
		}

		loadUser();
	}, [userId]);
	
	return (
		<div className="msp-user-profile">
			<h1 className="msp-user-profile-header">{isCurrentUser ? "Hello" : "Meet"} {user?.first_name} {user?.last_name}.</h1>
			
		</div>
	)
}