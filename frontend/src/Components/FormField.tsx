export default function FormField(label: string, value: string|number, setter: any, inputType: string = "text")
{
	return (
		<div className="msp-form-field">
			<p>{label}</p>
			<input type={inputType} value={value} onChange={(e) => {setter(e.target.value)}}/>
		</div>
	);
}