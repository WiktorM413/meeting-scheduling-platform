import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ApiMe } from "../api/client";

interface UserData
{
	id:    number;
	email: string;
}

interface AuthContextType
{
	userData:        UserData|null;
	loading:         boolean;
	isAuthenticated: boolean;
	refreshUser:     () => Promise<void>
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
	const [userData,   setUserData]   = useState<UserData|null>(null);
	const [loading, setLoading] = useState(true);

	const refreshUser = async () =>
	{
		try
		{
			const sessionData = await GetCurrentUser();

			setUserData(
				{
					email: sessionData.email,
					id: sessionData.user_id
				}
			);
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

	useEffect(() =>
	{
		refreshUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				userData,
				loading,
				isAuthenticated: userData?.id !== null,
				refreshUser: refreshUser,
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