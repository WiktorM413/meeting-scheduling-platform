import "./style.scss";

import { useAuth } from "../../context/AuthContext";
import AccountButtons from "./AccountButtons";

export default function Header()
{
	const { isAuthenticated } = useAuth();

	return (
		<div className="msp-header">
			<div className="msp-header-logo">
				MSP
			</div>
			<AccountButtons isAuthenticated={isAuthenticated}/>
		</div>
	)
}