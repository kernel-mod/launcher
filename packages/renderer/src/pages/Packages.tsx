import { For, createSignal } from "solid-js";

import "./Packages.css";

import Package from "../components/Package";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Dialog from "../components/Dialog";
import Text from "../components/Text";

import data from "../data";

export default function Packages() {
	const [searchValue, setSearchValue] = createSignal("");
	const [deleteConfirmation, setDeleteConfirmation] = createSignal(null);

	const foundPackages = () =>
		data.packages.filter(p =>
			p.name.toLowerCase().includes(searchValue().toLocaleLowerCase())
		);

	const handleDeleteConfirmation = (pkg: any) => {
		setDeleteConfirmation(pkg);
	};

	const handleDelete = (pkg: any) => console.log(pkg);

	return (
		<>
			<div class="kernel-packages-header">
				<Text variant="title">
					{searchValue() ? "Search Results" : "Installed Packages"} —{" "}
					{foundPackages().length}
				</Text>
				<SearchBar
					placeholder="Search..."
					value={searchValue()}
					onInput={setSearchValue}
				/>
			</div>
			<div class="kernel-packages">
				<For each={foundPackages()}>
					{(pkg: any) => (
						<Package
							{...pkg}
							onDelete={() => handleDeleteConfirmation(pkg)}
							onForceDelete={() => handleDelete(pkg)}
						/>
					)}
				</For>
			</div>
			<Dialog
				open={deleteConfirmation()}
				onClose={() => setDeleteConfirmation(null)}
				onCancel={() => setDeleteConfirmation(null)}
				title="Delete Package"
				footer={
					<>
						<Button onClick={() => setDeleteConfirmation(null)}>
							Cancel
						</Button>
						<Button
							variant="danger"
							onClick={() => {
								handleDelete(deleteConfirmation());
								setDeleteConfirmation(null);
							}}
						>
							Delete
						</Button>
					</>
				}
			>
				Are you sure you want to delete {deleteConfirmation()?.name}?
			</Dialog>
		</>
	);
}
