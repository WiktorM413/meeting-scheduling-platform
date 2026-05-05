import "./style.scss";

export default function MspListStep(label: string)
{
	return (
		<li className="msp-list-step">
			<div>{label}</div>
		</li>
	);
}