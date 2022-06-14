import SettingsItem from "../components/SettingsItem";
import SettingsGroup from "../components/SettingsGroup";

export default function Home(props) {
	return (
		<>
			<SettingsGroup title="General">
				<SettingsItem
					type="switch"
					title="Item 1"
					description="Description"
				/>
				<SettingsItem
					type="switch"
					title="Item 2"
					description="Description Description"
				/>
				<SettingsItem
					type="switch"
					title="Item 3"
					description="Description Description Description"
				/>
				<SettingsItem
					type="switch"
					title="Item 4"
					description="Description Description Description Description"
				/>
				<SettingsItem
					type="switch"
					title="Developer Mode"
					description="Description Description Description Description Description"
				/>
			</SettingsGroup>
			<SettingsGroup title="Packages">
				<SettingsItem
					type="switch"
					title="Item 1"
					description="Description"
				/>
				<SettingsItem
					type="switch"
					title="Item 2"
					description="Description Description"
				/>
				<SettingsItem
					type="switch"
					title="Item 3"
					description="Description Description Description"
				/>
				<SettingsItem
					type="switch"
					title="Item 4"
					description="Description Description Description Description"
				/>
			</SettingsGroup>
			<SettingsGroup title="Updates">todo</SettingsGroup>
		</>
	);
}
