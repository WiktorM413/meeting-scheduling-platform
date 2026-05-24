import "./style.scss";
import { useEffect, useState } from "react";
import MspFormField from "../Components/MspFormField";
import MspAnchor from "../Components/MspAnchor";
import type { ResponseType } from "../api/ResponseType";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ApiRegister } from "../api/client";
import MspButton from "../Components/MspButton";

export default function Register()
{
	const { refreshUser } = useAuth();

	const navigate                  = useNavigate();
	const [firstname, setFirstname] = useState("");
	const [lastname,  setLastName]  = useState("");
	const [email,     setEmail]     = useState("");
	const [password,  setPassword]  = useState("");
	const [response,  setResponse]  = useState<ResponseType|null>(null);

	const SubmitData = async () =>
	{
		try
		{
			const response = await ApiRegister(firstname, lastname, email, password);

			setResponse(response);
		}
		catch (error)
		{
			console.error("Error submitting data: ", error);
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
		<div className="msp-register">
			<h1>Register</h1>
			<div className="msp-register-form">
				<MspFormField label="First Name (min. 2)" value={firstname} setter={setFirstname}/>
				<MspFormField label="Last Name (min. 2)"  value={lastname}  setter={setLastName}/>
				<MspFormField label="Email"               value={email}    setter={setEmail}    inputType="email"/>
				<MspFormField label="Password (min. 8)"   value={password}  setter={setPassword} inputType="password"/>
				<MspButton label="Register" className="msp-register-submit" onClick={SubmitData}/>

				<div className="msp-small-text">
					<p className={response?.type === "error" ? "msp-error" : "msp-success"}>{response?.message}</p>
				</div>

				<div className="msp-small-text">
					<p>Already have an account?</p>
					<MspAnchor navigator={navigate} to="/login" label="Log in here." className="msp-register-extra"/>
				</div>
			</div>
		</div>
	);
}