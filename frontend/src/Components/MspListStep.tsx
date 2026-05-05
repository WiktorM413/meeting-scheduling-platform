import "./style.scss";

type MspListStepProps =
{
	label: string;
}

export default function MspListStep({label}: MspListStepProps)
{
	return (
		<li className="msp-list-step">
			<div>{label}</div>
		</li>
	);
}