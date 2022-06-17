import { Show, createSignal, mergeProps } from "solid-js";

import Text from "./Text";

import "../styles/SettingsGroup.scss";

interface Props {
	title?: string;
	children?: any;
}

const defaultProps = {
	title: ""
};

export default function SettingsGroup(props: Props) {
	const merged = mergeProps(defaultProps, props);

	return (
		<section class="kernel-settings-group">
			<Show when={merged.title}>
				<Text variant="title" class="kernel-settings-group-title">
					{merged.title}
				</Text>
			</Show>
			{merged.children}
		</section>
	);
}
