import { Show, mergeProps } from "solid-js";

import CloseIcon from "../icons/Close";
import MinimizeIcon from "../icons/Minimize";

import "../styles/Titlebar.css";

interface Props {
	title: string;
	resizable?: boolean;
	onClose?: () => void;
	onMinimize?: () => void;
	onMaximize?: () => void;
}

const defaultProps = {
	title: "",
	resizable: true
};

export default function Titlebar(props: Props) {
	const merged = mergeProps(defaultProps, props);

	return (
		<header class="kernel-titlebar">
			<span class="kernel-titlebar-wordmark">{merged.title}</span>
			<div class="kernel-titlebar-controls">
				<button
					class="kernel-titlebar-button minimize"
					aria-label="Minimize Window"
					onClick={merged.onMinimize}
				>
					<MinimizeIcon />
				</button>
				<Show when={merged.resizable}>
					<button
						class="kernel-titlebar-button maximize"
						aria-label="Maximize Window"
						onClick={merged.onMaximize}
					>
						o
					</button>
				</Show>
				<button
					class="kernel-titlebar-button close"
					aria-label="Close Window"
					onClick={merged.onClose}
				>
					<CloseIcon />
				</button>
			</div>
		</header>
	);
}
