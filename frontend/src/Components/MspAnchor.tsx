import type { NavigateFunction } from "react-router-dom";
import "./style.scss";

type AnchorProps = 
{
	navigator:  NavigateFunction;
	to:         string;
	label:      string;
	className?: string;
};

export default function MspAnchor({navigator, to, label, className} : AnchorProps)
{
	return (
		<div className={"msp-anchor " + className}>
			<a onClick={() => navigator(`${to}`)}>{label}</a>
		</div>
	)
}