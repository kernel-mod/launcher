import { createSignal, createEffect, mergeProps, For } from "solid-js";

import "../styles/TabBar.css";

interface TabItem {
	name: string;
	value: any;
	disabled?: boolean;
	icon?: Element;
	[key: string]: any;
}

interface Props {
	value?: any;
	items: TabItem[];
	onChange?: (value?: any) => void;
}

const defaultProps = {
	value: null,
	items: [],
	onChange: () => {}
};

export default function TabBar(props: Props) {
	const merged: Props = mergeProps(defaultProps, props);

	let tabBarRef: HTMLDivElement = null;
	const [selected, setSelected] = createSignal(
		merged.items.find(i => i.value === merged.value)
	);
	const [selectedItemRef, setSelectedItemRef] =
		createSignal<HTMLElement>(null);

	createEffect(() => {
		if (selected()?.value) {
			merged.onChange?.(selected().value);
			setSelectedItemRef(
				(Array.from(tabBarRef.children) as HTMLElement[])[
					merged.items.indexOf(selected())
				]
			);
		}
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		const { items } = merged;
		const keyMap = {
			ArrowLeft:
				items.indexOf(selected()) === 0
					? items[items.length - 1]
					: items[items.indexOf(selected()) - 1],
			ArrowRight:
				items.indexOf(selected()) === items.length - 1
					? items[0]
					: items[items.indexOf(selected()) + 1],
			Home: items[0],
			End: items[items.length - 1]
		};

		if (keyMap.hasOwnProperty(event.key)) {
			event.preventDefault();
			setSelected(keyMap[event.key]);
			selectedItemRef().focus();
		}
	};

	return (
		<div ref={tabBarRef} role="tablist" class="kernel-tab-bar">
			<For each={merged.items}>
				{(item, index) => {
					const { name, value, icon, disabled, ...rest } = item;
					const isSelected = () => selected()?.value === value;
					const tabbable = () =>
						selected()?.value ? isSelected() : index() === 0;

					return (
						<button
							id={`${value}-tab`}
							role="tab"
							aria-selected={isSelected()}
							type="button"
							class="kernel-tab"
							tabIndex={!tabbable() && -1}
							classList={{ selected: isSelected(), disabled }}
							onClick={() => setSelected(item)}
							onKeyDown={handleKeyDown}
							{...rest}
						>
							{icon}
							<span>{name}</span>
						</button>
					);
				}}
			</For>
			<div
				class="kernel-tab-indicator"
				style={{
					"--kernel-tab-size": `${selectedItemRef()?.offsetWidth}px`,
					"--kernel-tab-offset": `${selectedItemRef()?.offsetLeft}px`
				}}
			></div>
		</div>
	);
}
