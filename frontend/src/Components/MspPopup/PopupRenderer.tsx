import "./style.scss"
import { type ReactNode, useEffect, useState } from "react"
import { popup } from "./PopupManager";
import MspButton from "../MspButton";

export default function PopupRenderer()
{
	const [node, setNode] = useState<ReactNode>(null);

	useEffect(() =>
	{
		popup.RegisterRenderer(setNode);
	});

	if (!node)
	{
		return null;
	}

	return (
		<div className="msp-popup-overlay">
			<div className="msp-popup-content">
				<MspButton className="msp-popup-button-close" label="✕" onClick={() => popup.Close()}/>
				{node}
			</div>
		</div>
	);
}