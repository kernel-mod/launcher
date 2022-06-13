import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import WebSocket from "ws";

if (process.argv[2] === "--help" || process.argv[2] === "-h") {
	console.log(`First argument is the path to the electron executable.
Second argument is the path to the script to inject.`);
	process.exit(0);
}

const electronPath = path.resolve(process.argv[2]);
const injectionPath = path.resolve(process.argv[3]);

const code = fs.readFileSync(injectionPath, "utf8");

const electronInstance = spawn(electronPath, ["--inspect-brk"], {
	// Running with true means you can close the launcher and the program will still run.
	// It changes nothing, the injection still works.
	detached: false,
});

const wsURLRegex = /.+(ws:\/\/127\.0\.0\.1:\d+\/.+)/;

// Find the websocket URL.
// Later make sure to unlisten to these.
function stdListener(data) {
	const string = data.toString();

	let wsURL = string.match(wsURLRegex)?.[1];
	if (wsURL != null) {
		electronInstance.stdout.off("data", stdListener);
		electronInstance.stderr.off("data", stdListener);
		startWebSocket(wsURL);
	}
}

electronInstance.stdout.on("data", stdListener);
electronInstance.stderr.on("data", stdListener);

function startWebSocket(url) {
	const ws = new WebSocket(url);

	// Show messages from the websocket.
	ws.on("message", async function message(data) {
		const json = JSON.parse(`${data}`);
		if (json.method === "Debugger.paused") {
			ws.off("message", message);

			// Compile the script.
			const script = await send(ws, {
				method: "Runtime.compileScript",
				params: {
					expression: code,
					sourceURL: injectionPath,
					persistScript: true,
				},
			});

			// Run the script.
			const res = await send(ws, {
				method: "Runtime.runScript",
				params: {
					// Use the script ID to run the script.
					scriptId: script.scriptId,
					// Figure out if including the devtools console API will break anything.
					includeCommandLineAPI: true,
					returnByValue: false,
				},
			});

			// Allow the app to run its code.
			await send(ws, {
				method: "Debugger.resume",
			});
		}
	});

	ws.on("open", async function open() {
		// Enable the debugger.
		// This makes it pause on the first line again.
		await send(ws, {
			method: "Debugger.enable",
		});
		// Enable the runtime so the script can be compiled and run.
		await send(ws, {
			method: "Runtime.enable",
		});
		// This will continue execution and load NodeJS.
		// If this isn't run the script will run before NodeJS loads all of its APIs.
		await send(ws, {
			method: "Runtime.runIfWaitingForDebugger",
		});
	});
}

let id = 0;
function send(ws, message) {
	return new Promise((resolve, reject) => {
		// Each method call needs a unique ID.
		// This ID is used to identify which response is for which message that was sent.
		const localID = id++;

		// Listen for the response.
		function listener(data) {
			const json = JSON.parse(`${data}`);

			if (json.id === localID) {
				// Don't forget to remove the listener.
				ws.off("message", listener);
				// Return .result because nobody is ever gonna care about the ID.
				resolve(json.result);
			}
		}
		ws.on("message", listener);

		// Send the message with the ID added.
		ws.send(
			JSON.stringify(Object.assign(message, { id: localID })),
			(error) => {
				if (error) {
					// If there's an error, reject and remove the listener.
					ws.off("message", listener);
					reject(error);
				}
			}
		);
	});
}
