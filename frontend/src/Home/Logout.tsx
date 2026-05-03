import { useEffect } from "react";
import { ApiLogout } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout()
{
	const { clearAuthState } = useAuth();

	const navigate = useNavigate();
	useEffect(() =>
	{
		const logout = async () =>
		{
			try
			{
				await ApiLogout();
			}
			finally
			{
				clearAuthState()

				navigate("/home", {replace: true});
			}
		};

		logout();
	}, [navigate]);

	return null;
}