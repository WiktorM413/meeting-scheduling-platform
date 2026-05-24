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
			{isAuthenticated &&
				<div className="msp-header-main-routes-group">
					<MspAnchor className="msp-header-meetings" label="Meetings" navigator={navigate} to="/meetings"/>
					<MspAnchor className="msp-header-schedule" label="Schedule" navigator={navigate} to="/schedule" />
					<MspAnchor className="msp-header-search"   label="Search"   navigator={navigate} to="userSearch"/>
				</div>
			}
			<AccountButtons isAuthenticated={isAuthenticated}/>
		</div>
	)
}