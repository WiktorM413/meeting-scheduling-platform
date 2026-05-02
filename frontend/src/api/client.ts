import axios, { type AxiosResponse } from "axios";

export const api = axios.create
({
	baseURL: "http://localhost:8080/api",
	withCredentials: true,
});

export async function ApiRegister(firstname: string, lastname: string, email: string, password: string): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.post("/register", 
		{
			firstname,
			lastname,
			email,
			password
		}
	);

	return response;
}

export async function ApiLogin(email: string, password: string): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.post("/login",
		{
			email,
			password
		}
	)

	return response;
}

export async function ApiMe(): Promise<AxiosResponse<any, any, {}>>
{
	const response = await api.get("/me");

	return response;
}