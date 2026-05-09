import { useState } from "react";
import type { UserData } from "../api/UserType";

type UserPickerProps =
{
	receiverIds:    number[];
	users:          UserData[];
	setReceiverIds: React.Dispatch<React.SetStateAction<number[]>>;

}

export default function UserPicker({ receiverIds, users, setReceiverIds }: UserPickerProps)
{
	const [userSearch,   setUserSearch]   = useState<string>("");

	const filteredUsers = users.filter((user) =>
	{
		const fullname = `${user.first_name} ${user.last_name}`.toLowerCase();

		return fullname.includes(userSearch.toLowerCase()) && !receiverIds.includes(user.id);
	})

	function AddReceiver(id: number)
	{
		setReceiverIds(ids => [...ids, id]);
	}

	function RemoveReceiver(id: number)
	{
		setReceiverIds(ids => ids.filter(userId => userId !== id));
	}

	return (
		<div className="msp-user-picker">
			<label>Invite people</label>

			<div className="msp-selected-users">
				{
					receiverIds.map((id) =>
					{
						const user = users.find(u => u.id === id);

						if (!user)
							return null;

						return (
							<div
								key={id}
								className="msp-user-chip"
								onClick={() => RemoveReceiver(id)}
							>
								{user.first_name} {user.last_name} ✕
							</div>
						);
					})
				}
			</div>

			<input
				type="text"
				value={userSearch}
				onChange={(e) => setUserSearch(e.target.value)}
				placeholder="Search users..."
				className="msp-user-search"
			/>

			{
				userSearch.trim() && filteredUsers.length > 0 &&
				(
					<div className="msp-user-results">
						{
							filteredUsers.map((user) =>
							(
								<div
									key={user.id}
									className="msp-user-result"
									onClick={() => AddReceiver(user.id)}
								>
									{user.first_name} {user.last_name}
								</div>
							))
						}
					</div>
				)
			}
		</div>
	);
}