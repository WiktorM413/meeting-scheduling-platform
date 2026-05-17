import "./style.scss"
import { useNavigate } from "react-router-dom";
import MspAnchor from "../../Components/MspAnchor";
import { useAuth } from "../../context/AuthContext";
import MspUserProfilePic from "../../Components/MspUserProfilePic";

type AccountButtonsProps =
{
	isAuthenticated: boolean;
}

export default function AccountButtons({ isAuthenticated }: AccountButtonsProps)
{
	const navigate     = useNavigate();
	const { userData } = useAuth();

	return (
		<div className="msp-account-buttons">
			{isAuthenticated ?
			(
				<>
					<div>
						<MspAnchor label="" navigator={navigate} to={`userProfile/${userData?.id}`}>
							<MspUserProfilePic className="msp-account-buttons-profile-pic"/>
						</MspAnchor>
					</div>
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