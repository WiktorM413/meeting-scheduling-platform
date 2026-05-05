import MspButton from "../Components/MspButton";
import MspListArrow from "../Components/MspListArrow";
import MspListStep from "../Components/MspListStep";

export default function Index()
{
	return (
		<div className="msp-home">
			<section className="msp-home-hero">
				<div className="msp-home-headers">
					<h1>Scheduling made simple</h1>
					<h2>Set your availability, let people book time, and keep everything organized across time zones.</h2>
				</div>
				<div className="msp-home-button-group">
					<MspButton label="Get started"/>
					<MspButton label="See how it works"/>
				</div>
			</section>
			<section className="msp-home-preview">
				<div className="msp-home-calendar">
					{/* TODO: Create a calendar element for display */}
					Calender
				</div>
			</section>
			<section className="msp-home-how-it-works">
				<h2>How it works</h2>
				<ol>
					<MspListStep label="Set availability"/>
					<MspListArrow />
					<MspListStep label="Share booking link"/>
					<MspListArrow />
					<MspListStep label="Get appointments"/>
				</ol>
			</section>
		</div>
	);
}