import "./style.scss";

import { useAuth } from "../../context/AuthContext";
import AccountButtons from "./AccountButtons";

export default function Header()
{
	const { isAuthenticated } = useAuth();

	return (
		<div className="msp-header">
			<AccountButtons isAuthenticated={isAuthenticated}/>
		</div>
	)
}