import HomeIcon from "./icons/Home";
import PackagesIcon from "./icons/Packages";
import SettingsIcon from "./icons/Settings";

export default {
	packages: [
		{
			name: "test package 0",
			authors: ["me"],
			description:
				"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
			enabled: true
		},
		{
			name: "test package 1",
			description:
				"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
			enabled: false
		},
		{
			name: "test package 2",
			description:
				"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
			enabled: false
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		},
		{
			name: "test package 3"
		}
	],
	pages: [
		{
			name: "Home",
			value: "home",
			icon: <HomeIcon />,
			"aria-controls": "home-page"
		},
		{
			name: "Packages",
			value: "packages",
			icon: <PackagesIcon />,
			"aria-controls": "packages-page"
		},
		{
			name: "Settings",
			value: "settings",
			icon: <SettingsIcon />,
			"aria-controls": "settings-page"
		}
	]
} as any;
