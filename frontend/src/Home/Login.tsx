import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ResponseType } from "../api/ResponseType";
import { api } from "../api/client";
import HandleResponse from "../api/HandleResponse";
import FormField from "../Components/FormField";
import Anchor from "../Components/Anchor";
import { useAuth } from "../context/AuthContext";


export default function Login()
{
	const { refreshUser } = useAuth();

	const navigate                = useNavigate();
	const [email,    setEmail]    = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState<ResponseType|null>(null);

	const SubmitData = async () =>
	{
		try
		{
			const response = await api.post("/login", {
				email:    email,
				password: password,
			});

			setResponse(HandleResponse(response));
		}
		catch (error)
		{
			console.log("Error submitting data: ", error);
		}
	}

	useEffect(() =>
	{
		if (response?.type !== "success")
		{
			return;
		}

		const handleSuccess = async () =>
		{
			await refreshUser();

			setTimeout(() => navigate("/home"), 1000);
		}

		handleSuccess();
	}, [response, refreshUser, navigate]);

	return (
		<div className="msp-login">
			<h1>
				Log in
			</h1>
			<div className="msp-login-form">
				<FormField label="Email"    value={email}    setter={setEmail}    inputType="email"/>
				<FormField label="Password" value={password} setter={setPassword} inputType="password"/>
				<button className="msp-button msp-login-submit" onClick={SubmitData}>Log in</button>

				<div className="msp-small-text">
					<p className={response?.type === "error" ? "msp-error" : "msp-success"}>{response?.message}</p>
				</div>

				<div className="msp-small-text">
					<p>Don't have an account?</p>
					<Anchor navigator={navigate} to={"/register"} label="Register here."/>
				</div>
			</div>
		</div>
	);
}