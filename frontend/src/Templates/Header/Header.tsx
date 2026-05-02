import { useAuth } from "../../context/AuthContext";

export default function Header()
{
	const { isAuthenticated } = useAuth();

	return (
		<>
			{isAuthenticated == true ? "yes" : "no"}
		</>
	)
}