import "./style.scss";

type FormFieldProps<T extends string|number> =
{
	label:      string;
	value:      T;
	setter:     React.Dispatch<React.SetStateAction<T>>;
	inputType?: string;
	className?: string;
};

export default function MspFormField<T extends string|number>({ label, value, setter, inputType = "text", className }: FormFieldProps<T>)
{
	return (
		<div className={"msp-form-field " + className}>
			<p>{label}</p>
			<input type={inputType} value={value} onChange={(e) => {setter(e.target.value as T)}}/>
		</div>
	);
}