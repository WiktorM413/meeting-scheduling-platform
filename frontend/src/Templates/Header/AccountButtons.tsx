import "./style.scss"
import { useNavigate } from "react-router-dom";
import MspAnchor from "../../Components/MspAnchor";

type AccountButtonsProps =
{
	isAuthenticated: boolean;
}

export default function AccountButtons({ isAuthenticated }: AccountButtonsProps)
{
	const navigate = useNavigate();

	return (
		<div className="msp-account-buttons">
			{isAuthenticated ?
			(
				<>
					<MspAnchor label="Log out" navigator={navigate} to="logout" className="msp-accout-logout"/>
				</>
			)
		:
			(
				<>
					<MspAnchor label="Register" navigator={navigate} to="register" className="msp-account-register"/>
					<MspAnchor label="Log in"   navigator={navigate} to="login"    className="msp-account-login"/>
				</>
			)
			}
		</div>
	);
}