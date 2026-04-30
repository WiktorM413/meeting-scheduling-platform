import "./style.scss";

type FormFieldProps<T extends string|number> =
{
	label:      string;
	value:      T;
	setter:     React.Dispatch<React.SetStateAction<T>>;
	inputType?: string;
};

export default function FormField<T extends string|number>({ label, value, setter, inputType = "text" }: FormFieldProps<T>)
{
	return (
		<div className="msp-form-field">
			<p>{label}</p>
			<input type={inputType} value={value} onChange={(e) => {setter(e.target.value as T)}}/>
		</div>
	);
}