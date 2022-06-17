import { createSignal, mergeProps } from "solid-js";

import "../styles/Switch.scss";

interface Props {
	checked?: boolean;
	onChange?: (checked) => void;
}

const defaultProps = {
	checked: false
};

export default function Switch(props: Props) {
	const merged = mergeProps(defaultProps, props);
	const [checked, setChecked] = createSignal(merged.checked);

	const handleChange = ({ target }: Event) => {
		setChecked((target as HTMLInputElement).checked);
		merged.onChange?.(checked);
	};

	return (
		<div class="kernel-switch" classList={{ checked: checked() }}>
			<input
				class="kernel-switch-input"
				type="checkbox"
				checked={checked()}
				onChange={handleChange}
			/>
		</div>
	);
}
