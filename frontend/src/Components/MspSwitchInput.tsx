import "./style.scss";

type MspSwitchInputProps =
{
	value: number;
	setter: React.Dispatch<React.SetStateAction<number>>;
};

export default function MspSwitchInput({ value, setter }: MspSwitchInputProps)
{
	return (
		<label className="msp-switch-input">
			<input
				type="checkbox"
				checked={!!value}
				onChange={() => setter(value ? 0 : 1)}
			/>
			<span className="msp-switch-input-slider" />
		</label>
	);
}