import "./style.scss";

type MspSelectProps<T> =
{
	className?: string;
	label:      string;
	value:      T;
	setter:     React.Dispatch<React.SetStateAction<T>>;
	children:   React.ReactNode;
};

export default function MspSelect<T>({
	className,
	label,
	value,
	setter,
	children
}: MspSelectProps<T>)
{
	return (
		<div className={`msp-select ${className}`}>
			<p>{label}</p>
			<select
				value={value as any}
				onChange={(e) =>
				{
					// still string from DOM
					setter(e.target.value as any);
				}}
			>
				{children}
			</select>
		</div>
	);
}