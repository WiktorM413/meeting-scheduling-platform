import MspButton from "../MspButton";
import "./style.scss";
import { useRef, useState } from "react";

type MspFileInputProps =
{
	valueSetter: React.Dispatch<React.SetStateAction<File|null>>;
	onChange?:   (file: File|null) => void;
	accept?:     string;
	className?:  string;
}

export default function MspFileInput({valueSetter, onChange, accept, className}: MspFileInputProps)
{
	const [file, setFile] = useState<File|null>(null);
	const inputRef        = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		const f = e.target.files?.[0] ?? null;
		setFile(f);
		onChange?.(f);
	}

	const handleClear = () =>
	{
		setFile(null);
		if (inputRef.current)
		{
			inputRef.current.value = "";
		}
		onChange?.(null);
	}

	return (
		<div className={`msp-file-input ${className}`}>
			<input
				ref={inputRef}
				type="file"
				accept={accept}
				onChange={handleChange}
			/>
			<MspButton className="msp-file-input-button" label="Choose a file" onClick={() => inputRef.current?.click()}/>
			<span className={`msp-file-input-label ${file ? "msp-file-input-label-chosen" : ""}`}>
				{file ? file.name : "No file chosen"}
			</span>
			{file && (
				<MspButton className="msp-file-input-clear" label="Clear" onClick={() => handleClear()}/>
			)}
		</div>
	);
}