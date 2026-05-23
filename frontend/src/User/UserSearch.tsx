import { useEffect, useState } from "react";
import MspButton from "../Components/MspButton";
import { type UserData } from "../api/UserType";
import { ApiGetPublicUsersLike } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import { useNavigate } from "react-router-dom";

export default function UserSearch()
{
	const navigate = useNavigate();
	
	const [userSearch,    setUserSearch]    = useState("");
	const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
	
	useEffect(() =>
	{
		const searchUsers = async () =>
		{
			if (! userSearch)
			{
				setFilteredUsers([]);
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
			{userSearch.trim() && filteredUsers.length > 0 &&
				<div className="msp-user-search-user-results">
					{
						filteredUsers.map((user) =>
						(
							<div
								key={user.id}
								className="msp-user-search-user-result"
								onClick={() => navigate(`/userProfile/${user.id}`)}
							>
								<h4>{user.email}</h4>
								<p>{user.first_name} {user.last_name}</p>
							</div>
						))
					}
				</div>
			}
		</div>
	);
}