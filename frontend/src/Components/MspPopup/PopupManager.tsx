import type { ReactNode } from "react";

class PopupManager
{
	private setPopup: ((node: ReactNode) => void) | null = null;

	RegisterRenderer(setPopup: (node: ReactNode) => void)
	{
		this.setPopup = setPopup;
	}

	Open(node: ReactNode)
	{
		this.setPopup?.(node);
	}

	Close()
	{
		this.setPopup?.(null);
	}
}

export const popup = new PopupManager();