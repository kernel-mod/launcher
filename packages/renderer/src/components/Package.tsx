import { createSignal, mergeProps, Show } from "solid-js";

import Switch from "./Switch";
import Text from "./Text";

import TrashIcon from "../icons/Trash";
import SettingsIcon from "../icons/Settings";

import "../styles/Package.css";

interface Props {
	name: string;
	enabled?: boolean;
	description?: string;
	authors?: string[];
	onToggle?: (enabled: boolean) => void;
	onDelete?: () => void;
	onForceDelete?: () => void;
	onSettings?: () => void;
}

const defaultProps = {
	description: "",
	enabled: false
};

export default function Package(props: Props) {
	const merged = mergeProps(defaultProps, props);
	const [enabled, setEnabled] = createSignal(merged.enabled);

	const handleChange = (value: boolean) => {
		setEnabled(value);
		props.onToggle?.(enabled());
	};

	const handleDelete = ({ shiftKey }: MouseEvent) => {
		if (shiftKey) {
			props.onForceDelete?.();
		} else {
			props.onDelete?.();
		}
	};

	const handleSettings = () => props.onSettings?.();

	return (
		<div class="kernel-package" classList={{ enabled: enabled() }}>
			<label class="kernel-package-header">
				<Text tag="h2" variant="title" class="kernel-package-name">
					{merged.name}
					<Show when={merged.authors}>
						<span class="kernel-package-authors">
							{" "}
							by{" "}
							{new (Intl as any).ListFormat("en", {
								style: "long",
								type: "conjunction"
							}).format(merged.authors)}
						</span>
					</Show>
				</Text>
				<Switch onChange={handleChange} checked={enabled()} />
			</label>
			<Show when={merged.description}>
				<Text variant="caption" class="kernel-package-description">
					{merged.description}
				</Text>
			</Show>
			<div class="kernel-package-footer">
				<button onClick={handleSettings} class="kernel-package-button">
					<SettingsIcon />
				</button>
				<button
					onClick={handleDelete}
					class="kernel-package-button danger"
				>
					<TrashIcon />
					Delete
				</button>
			</div>
		</div>
	);
}
