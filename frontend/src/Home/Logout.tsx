import { useEffect } from "react";
import { ApiLogout } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Logout()
{
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
				navigate("/home", {replace: true});
				window.location.reload();
			}
		};

		logout();
	}, [navigate]);

	return null;
}