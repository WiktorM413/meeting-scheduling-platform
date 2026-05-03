import { useAuth } from "../context/AuthContext";


export default function Index()
{
	const { userData } = useAuth();

	return (
		<><p>Hello {userData?.firstname} {userData?.lastname}. You're a {userData?.userGroup?.type}</p></>
	);
}