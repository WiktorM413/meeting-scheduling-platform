import "./style.scss";

type MspButtonProps =
{
	label:      string;
	className?: string;
	onClick?:   React.MouseEventHandler<HTMLButtonElement>;
}

export default function MspButton({label, className, onClick}: MspButtonProps)
{
	
	return (
		<button className={"msp-button " + className} onClick={onClick}>{label}</button>
	)
}