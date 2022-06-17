import { render } from "solid-js/web";
import { createSignal } from "solid-js";

import data from "./data";

import TabBar from "./components/TabBar";
import Titlebar from "./components/Titlebar";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Settings from "./pages/Settings";

import "./styles/main.css";

const PAGES = {
	home: <Home />,
	settings: <Settings />,
	packages: <Packages />
};

function App() {
	const [page, setPage] = createSignal("home");

	return (
		<main class="kernel-app-window">
			<Titlebar
                title="Kernel"
                onClose={KernelNative.window.close}
                onMinimize={KernelNative.window.minimize}
                onMaximize={KernelNative.window.maximize}
            />
			<nav class="kernel-navigation-bar">
				<TabBar value={page()} items={data.pages} onChange={setPage} />
			</nav>
			<div
				role="tabpanel"
				class="kernel-page"
				id={`${page()}-page`}
				aria-labelledby={`${page()}-tab`}
			>
				{PAGES[page()]}
			</div>
		</main>
	);
}

render(() => <App />, document.getElementById("app"));
