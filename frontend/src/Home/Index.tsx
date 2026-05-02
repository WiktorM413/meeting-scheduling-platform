import { useAuth } from "../context/AuthContext";


export default function Index()
{
	const { userData } = useAuth();

	return (
		<><p>{userData?.email}</p></>
	);
}