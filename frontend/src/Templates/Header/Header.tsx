import "./style.scss";

import { useAuth } from "../../context/AuthContext";
import AccountButtons from "./AccountButtons";
import MspAnchor from "../../Components/MspAnchor";
import { useNavigate } from "react-router-dom";

export default function Header()
{
	const { isAuthenticated } = useAuth();
	const navigate            = useNavigate();

	return (
		<div className="msp-header">
			<MspAnchor className="msp-header-logo" label="MSP" navigator={navigate} to="/home" />
			<AccountButtons isAuthenticated={isAuthenticated}/>
		</div>
	)
}