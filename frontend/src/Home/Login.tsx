import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ResponseType } from "../api/ResponseType";
import HandleResponse from "../api/HandleResponse";
import MspFormField from "../Components/MspFormField";
import MspAnchor from "../Components/MspAnchor";
import { useAuth } from "../context/AuthContext";
import { ApiLogin } from "../api/client";
import MspButton from "../Components/MspButton";


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
			const response = await ApiLogin(email, password);

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

			setTimeout(() => navigate("/home", { replace: true }), 1000);
		}

		handleSuccess();
	}, [response, refreshUser, navigate]);

	return (
		<div className="msp-login">
			<h1>
				Log in
			</h1>
			<div className="msp-login-form">
				<MspFormField label="Email"    value={email}    setter={setEmail}    inputType="email"/>
				<MspFormField label="Password" value={password} setter={setPassword} inputType="password"/>
				<MspButton label="Login" className="msp-login-submit" onClick={SubmitData}/>

				<div className="msp-small-text">
					<p className={response?.type === "error" ? "msp-error" : "msp-success"}>{response?.message}</p>
				</div>

				<div className="msp-small-text">
					<p>Don't have an account?</p>
					<MspAnchor navigator={navigate} to={"/register"} label="Register here." className="msp-login-extra"/>
				</div>
			</div>
		</div>
	);
}