import { useRef } from "react";
import MspButton from "../Components/MspButton";
import MspCalendar from "../Components/MspCalendar/MspCalendar";
import MspListArrow from "../Components/MspListArrow";
import MspListStep from "../Components/MspListStep";
import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function Index()
{
	const howItWorksRef = useRef<HTMLDivElement|null>(null);
	const navigate    = useNavigate();
	
	return (
		<div className="msp-home">
			<div className="msp-home-hero">
				<div className="msp-home-headers">
					<h1>Scheduling made simple</h1>
					<h2>Set your availability, let people book time, and keep everything organized across time zones.</h2>
				</div>
				<div className="msp-home-button-group">
					<MspButton label="Get started"      onClick={() => navigate("/schedule")}/>
					<MspButton label="See how it works" onClick={() => howItWorksRef.current?.scrollIntoView({behavior: "smooth"})}/>
				</div>
			</div>
			<div className="msp-home-preview">
				<div className="msp-home-calendar">
					<MspCalendar />
				</div>
			</div>
			<div className="msp-home-how-it-works" ref={howItWorksRef}>
				<h2>How it works</h2>
				<ol>
					<MspListStep label="Choose a day"/>
					<MspListArrow />
					<MspListStep label="Select people"/>
					<MspListArrow />
					<MspListStep label="Set the topic"/>
					<MspListArrow />
					<MspListStep label="Set the place"/>
					<MspListArrow />
					<MspListStep label="Set the time"/>
				</ol>
			</div>
		</div>
	);
}