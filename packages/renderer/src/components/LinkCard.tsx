import { Show, mergeProps, splitProps } from "solid-js";

import Text from "./Text";

import "../styles/LinkCard.css";

const defaultProps = {
	title: "",
	description: "",
	href: "",
	icon: null
};

interface Props {
	title: string;
	href: string;
	description?: string;
	icon?: any;
	[key: string]: any;
}

export default function LinkCard(props: Props) {
	const [merged, rest] = splitProps(mergeProps(defaultProps, props), [
		"title",
		"href",
		"description",
		"icon"
	]);

	return (
		<a href={merged.href} class="kernel-link-card" {...rest}>
			<div class="kernel-link-card-icon">
				<Show when={merged.icon}>{merged.icon}</Show>
			</div>
			<div class="kernel-link-card-info">
				<Text variant="title" class="kernel-link-card-title">
					{merged.title}
				</Text>
				<Show when={merged.description}>
					<Text
						variant="caption"
						class="kernel-link-card-description"
					>
						{merged.description}
					</Text>
				</Show>
			</div>
		</a>
	);
}
