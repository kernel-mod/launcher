import { createEffect, createSignal } from "solid-js";

import LinkCard from "../components/LinkCard";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

import Book from "../icons/Book";
import GitHub from "../icons/GitHub";
import Comment from "../icons/Comment";

import "./Home.css";

const [open, setOpen] = createSignal(false);

export default function Home(props) {
	createEffect(() => console.log(open()));

	return (
		<>
			<div class="kernel-home-links">
				<LinkCard
					href="https://github.com/kernel-mod/electron"
					target="_blank"
					rel="noreferrer noopener"
					icon={<Book />}
					title="Documentation"
					description="Get started with Kernel."
				/>
				<LinkCard
					href="https://github.com/kernel-mod/electron"
					target="_blank"
					rel="noreferrer noopener"
					icon={<GitHub />}
					title="GitHub"
					description="Found a bug?"
				/>
				<LinkCard
					href="https://github.com/kernel-mod/electron"
					target="_blank"
					rel="noreferrer noopener"
					icon={<Comment />}
					title="Discord Server"
					description="Need help?"
				/>
			</div>
		</>
	);
}
