import { Show, createSignal, mergeProps } from "solid-js";

import Switch from "./Switch";
import Text from "./Text";

import "../styles/SettingsItem.css";

interface Props {
	title: string;
	description?: string;
	type: "switch" | "text";
	onToggle?: (enabled: boolean) => void;
}

const defaultProps = {
	description: ""
};

export default function Package(props: Props) {
	const merged = mergeProps(defaultProps, props);

	return (
		<div class="kernel-settings-item">
			<label class="kernel-settings-item-header">
				<Text
					class="kernel-settings-item-title"
					variant="title"
					tag="h2"
				>
					{merged.title}
				</Text>
				<div class="kernel-settings-item-control">
					<Switch />
				</div>
			</label>
			<Show when={merged.description}>
				<Text
					variant="caption"
					class="kernel-settings-item-description"
				>
					{merged.description}
				</Text>
			</Show>
		</div>
	);
}
