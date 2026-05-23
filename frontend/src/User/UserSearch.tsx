import { useEffect, useState } from "react";
import MspButton from "../Components/MspButton";
import { type UserData } from "../api/UserType";

export default function UserSearch()
{
	const [userSearch,    setUserSearch]    = useState("");
	const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
	
	useEffect(() =>
	{
		const searchUsers = async () =>
		{
			
		}
		
		setTimeout(searchUsers, 300);
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