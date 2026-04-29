type FormFieldProps =
{
	label:      string;
	value:      string|number;
	setter:     any;
	inputType?: string;
};

export default function FormField({ label, value, setter, inputType = "text" }: FormFieldProps)
{
	return (
		<div className="msp-form-field">
			<p>{label}</p>
			<input type={inputType} value={value} onChange={(e) => {setter(e.target.value)}}/>
		</div>
	);
}