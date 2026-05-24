import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ApiMe } from "../api/client";
import { type UserData } from "../api/UserType";
import { useNavigate } from "react-router-dom";

interface AuthContextType
{
	userData:        UserData|null;
	loading:         boolean;
	isAuthenticated: boolean;
	refreshUser:     (firstname?: string, lastname?: string, email?: string, profilePic?: string) => Promise<void>;
	clearAuthState:  () => void;
}

async function GetCurrentUser()
{
	try
	{
		const response = await ApiMe();

		return response.data;
	}
	catch (error)
	{
		throw error;
	}
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode })
{
	const navigate = useNavigate();
	
	const [userData,   setUserData] = useState<UserData|null>(null);
	const [loggedIn,   setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const refreshUser = async (firstname?: string, lastname?: string, email?: string) =>
	{
		try
		{
			const sessionData = await GetCurrentUser();
			
			setUserData(
				{
					id:          sessionData.user_id,
					first_name:  firstname ? firstname   : sessionData.firstname,
					last_name:   lastname  ? lastname    : sessionData.lastname,
					email:       email     ? email       : sessionData.email,
				}
		
			);

			setLoggedIn(sessionData.logged_in);
		}
		catch
		{
			setUserData(null);
		}
		finally
		{
			setLoading(false);
		}
	}

	const clearAuthState = () =>
	{
		setUserData(null);
		setLoggedIn(false);
		setLoading(false);
	}

	const handleSessionExpxire = () =>
	{
		clearAuthState();
		navigate("/login");
	}

	useEffect(() =>
	{
		refreshUser();

		const interval = setInterval(async () =>
		{
			if (document.hidden)
			{
				return;
			}

			try
			{
				const sessionData = await GetCurrentUser();
				if (! sessionData.logged_in)
				{
					handleSessionExpxire();
				}
			}
			catch (error)
			{
				handleSessionExpxire();
			}
		}, 60 * 1000)

		return () => clearInterval(interval);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				userData,
				loading,
				isAuthenticated: loggedIn,
				refreshUser,
				clearAuthState,
			}}>
				{children}
		</AuthContext.Provider>
	);
}

export function useAuth()
{
	const context = useContext(AuthContext);

	if (! context)
	{
		throw new Error("UseAuth must be used within AuthProvider");
	}

	return context;
}