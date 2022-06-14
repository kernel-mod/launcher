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
                    title="Minimize"
					class="kernel-titlebar-button minimize"
					aria-label="Minimize Window"
					onClick={merged.onMinimize}
				>
					<MinimizeIcon />
				</button>
				<Show when={merged.resizable}>
					<button
                        title="Maximize"
						class="kernel-titlebar-button maximize"
						onClick={merged.onMaximize}
					>
						o
					</button>
				</Show>
				<button
                    title="Close"
					class="kernel-titlebar-button close"
					onClick={merged.onClose}
				>
					<CloseIcon />
				</button>
			</div>
		</header>
	);
}
