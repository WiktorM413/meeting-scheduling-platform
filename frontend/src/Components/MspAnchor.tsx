import type { NavigateFunction } from "react-router-dom";
import "./style.scss";

type AnchorProps = 
{
	navigator: NavigateFunction;
	to:        string;
	label:     string;
};

export default function MspAnchor({navigator, to, label} : AnchorProps)
{
	return (
		<div className="msp-anchor">
			<a onClick={() => navigator(`${to}`)}>{label}</a>
		</div>
	)
}