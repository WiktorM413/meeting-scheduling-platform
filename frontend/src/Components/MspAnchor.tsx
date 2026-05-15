import type { NavigateFunction, NavigateOptions } from "react-router-dom";
import "./style.scss";

type AnchorProps = 
{
	navigator:         NavigateFunction;
	to:                string;
	label:             string;
	className?:        string;
	navigatorOptions?: NavigateOptions;
	children?:         React.ReactNode;
};

export default function MspAnchor({navigator, to, label, className, navigatorOptions, children} : AnchorProps)
{
	return (
		<div className={"msp-anchor " + className} onClick={() => navigator(to, navigatorOptions)}>
			<a >{label}</a>
			{children ? children : ""}
		</div>
	)
}