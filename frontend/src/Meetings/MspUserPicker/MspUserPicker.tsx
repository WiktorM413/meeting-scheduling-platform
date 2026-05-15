import "./style.scss";
import { useState } from "react";
import type { UserData } from "../../api/UserType";

type UserPickerProps =
{
	receiverIds:    number[];
	users:          UserData[];
	setReceiverIds: React.Dispatch<React.SetStateAction<number[]>>;
	className?: string;

}

export default function MspUserPicker({ className, receiverIds, users, setReceiverIds }: UserPickerProps)
{
	console.log("receiver_ids:", receiverIds);

	const [userSearch,   setUserSearch]   = useState<string>("");

	const filteredUsers = users.filter((user) =>
	{
		const fullname = `${user.first_name} ${user.last_name}`.toLowerCase();

		return fullname.includes(userSearch.toLowerCase()) && !receiverIds.includes(Number(user.id));
	})

	function AddReceiver(id: number)
	{
		if (! receiverIds.find(receiverId => receiverId === id))
		{
			setReceiverIds(ids => [...ids, id]);
		}
	}

	function RemoveReceiver(id: number)
	{
		setReceiverIds(ids => ids.filter(userId => userId !== id));
	}

	return (
		<div className={`msp-user-picker ${className ? className : ""}`}>
			<label>Invite people</label>

			<div className="msp-user-picker-selected-users">
				{
					receiverIds.map((id) =>
					{
						const user = users.find(u => u.id == id);

						if (!user)
							return null;

						return (
							<div
								key={id}
								className="msp-user-picker-user-chip"
								onClick={() => RemoveReceiver(id)}
							>
								{user.first_name} {user.last_name} ✕
							</div>
						);
					})
				}
			</div>

			<div className="msp-user-picker-user-search-wrapper">
				<input
					type="text"
					value={userSearch}
					onChange={(e) => setUserSearch(e.target.value)}
					placeholder="Search users..."
					className="msp-user-picker-user-search"
				/>
				{userSearch &&
					(
						<button
							className="msp-user-picker-user-search-clear"
							onClick={() => setUserSearch("")}
						>
							✕
						</button>
					)

				}
			</div>

			{
				userSearch.trim() && filteredUsers.length > 0 &&
				(
					<div className="msp-user-picker-user-results">
						{
							filteredUsers.map((user) =>
							(
								<div
									key={user.id}
									className="msp-user-picker-user-result"
									onClick={() => AddReceiver(Number(user.id))}
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