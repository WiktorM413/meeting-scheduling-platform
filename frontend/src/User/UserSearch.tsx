import { useEffect, useState } from "react";
import MspButton from "../Components/MspButton";
import { type UserData } from "../api/UserType";
import { ApiGetPublicUsersLike } from "../api/client";
import HandleResponse from "../api/HandleResponse";

export default function UserSearch()
{
	const [userSearch,    setUserSearch]    = useState("");
	const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
	
	useEffect(() =>
	{
		const searchUsers = async () =>
		{
			if (! userSearch)
			{
				return;
			}

			try
			{
				const response = await ApiGetPublicUsersLike(userSearch);
				const handled  = HandleResponse(response);

				if (handled.type === "success")
				{
					console.log(handled.data);
					setFilteredUsers(handled.data);
				}
			}
			catch (error)
			{
				console.log("Error retrieving users:", error);
			}
		}
		
		setTimeout(searchUsers, 500);
	}, [userSearch]);
	
	return (
		<div className="msp-user-search">
			<div className="msp-user-search-header">
				<h1>Browse through users</h1>
				<p>Find people you want to meet with</p>
			</div>
			<div className="msp-user-search-search-wrapper">
				<input 
					type="text"
					value={userSearch}
					onChange={(e) => setUserSearch(e.target.value)}
					placeholder="Browse users..."
					className="msp-user-search-search"
				/>
				{userSearch &&
					<MspButton label="✕" className="msp-user-search-search-clear" onClick={() => setUserSearch("")}/>
				}
			</div>
			
		</div>
	);
}