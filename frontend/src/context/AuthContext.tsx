import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../api/client";

interface AuthContextType
{
	email:           string|null;
	userId:          number|null;
	loading:         boolean;
	isAuthenticated: boolean;
	refreshUser:     () => Promise<void>
}

async function GetCurrentUser()
{
	try
	{
		const response = await api.get("/me");

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
	const [email,   setEmail]   = useState<string|null>(null);
	const [userId,  setUserId]  = useState<number|null>(null);
	const [loading, setLoading] = useState(true);

	const refreshUser = async () =>
	{
		try
		{
			const sessionData = await GetCurrentUser();

			setEmail(sessionData.email);
			setUserId(sessionData.user_id);
		}
		catch
		{
			setEmail(null);
			setUserId(null);
		}
		finally
		{
			setLoading(false);
		}
	}

	useEffect(() => {
		refreshUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				email,
				userId,
				loading,
				isAuthenticated: userId !== null,
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