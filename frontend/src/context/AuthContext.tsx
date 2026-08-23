import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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

	// Mirror of loggedIn for the polling interval — the interval closure is
	// created once, so reading the state variable there would always see false.
	const loggedInRef = useRef(false);

	const updateLoggedIn = (value: boolean) =>
	{
		loggedInRef.current = value;
		setLoggedIn(value);
	}

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

			updateLoggedIn(!! sessionData.logged_in);
		}
		catch
		{
			setUserData(null);
			updateLoggedIn(false);
		}
		finally
		{
			setLoading(false);
		}
	}

	const clearAuthState = () =>
	{
		setUserData(null);
		updateLoggedIn(false);
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
			// Only watch for expiry of an existing session — visitors who were
			// never logged in (e.g. filling the register form) must not be
			// redirected to /login.
			if (document.hidden || ! loggedInRef.current)
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