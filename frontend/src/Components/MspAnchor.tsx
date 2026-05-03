import type { NavigateFunction, NavigateOptions } from "react-router-dom";
import "./style.scss";

type AnchorProps = 
{
	navigator:         NavigateFunction;
	to:                string;
	label:             string;
	className?:        string;
	navigatorOptions?: NavigateOptions;
};

export default function MspAnchor({navigator, to, label, className, navigatorOptions} : AnchorProps)
{
	return (
		<div className={"msp-anchor " + className}>
			<a onClick={() => navigator(to, navigatorOptions)}>{label}</a>
		</div>
	)
}