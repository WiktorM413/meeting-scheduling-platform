import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export default function UserProfile()
{
	const { userId } = useParams();
	const { userData } = useAuth();

	return (
		<div className="msp-user-profile">
			Hello {userId} or rather {userData?.id}
		</div>
	)
}