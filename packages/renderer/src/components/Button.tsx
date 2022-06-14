import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import "../styles/Button.css";

const defaultProps = {
	variant: "default",
	size: "medium",
	disabled: false
};

interface Props {
	variant?: "default" | "accent" | "danger";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	[key: string]: any;
}

export default function Button(props: Props) {
	const [merged, rest] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"href",
		"variant",
		"disabled"
	]);

	return (
		<Dynamic
			class={`kernel-button variant-${merged.variant}`}
			disabled={merged.disabled}
			component={merged.href ? "a" : "button"}
			type="button"
			{...rest}
		>
			{merged.children}
		</Dynamic>
	);
}
