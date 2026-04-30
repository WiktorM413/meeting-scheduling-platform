import "./style.scss";
import { useState } from "react";
import { api } from "../api/client";
import FormField from "../Components/FormField";
import HandleResponse from "../api/HandleResponse";
import type { ResponseType } from "../api/ResponseType";

export default function Register()
{
	const [firstname, setFirstname] = useState("");
	const [lastname,  setLastName]  = useState("");
	const [password,  setPassword]  = useState("");
	const [response,   setResponse] = useState<ResponseType|null>(null);

	const SubmitData = async () =>
	{
		try
		{
			const response = await api.post("/register", {
				firstname: firstname,
				lastname:  lastname,
				password:  password,
			});

			setResponse(HandleResponse(response));
		}
		catch (error)
		{
			console.error("Error submitting data: ", error);
		}
	}

	return (
		<div className="msp-register">
			<h1>Register</h1>
			<div className="msp-register-form">
				<FormField label="First Name" value={firstname} setter={setFirstname}/>
				<FormField label="Last Name"  value={lastname}  setter={setLastName}/>
				<FormField label="Password"   value={password}  setter={setPassword}/>
				<button className="msp-register-submit" onClick={SubmitData}>Register</button>

				<div className="msp-small-text">
					<p className={response?.type === "error" ? "msp-error" : "msp-success"}>{response?.message}</p>
				</div>
			</div>
		</div>
	);
}