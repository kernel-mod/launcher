import { app, BrowserWindow, ipcMain, shell } from "electron";
import { join } from "path";

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
	win = new BrowserWindow({
        title: "Kernel Launcher",
        width: 700,
        height: 500,
        frame: false,
        show: false,
		webPreferences: {
			preload: join(__dirname, "../preload/index.cjs")
		}
	});

    win.on('ready-to-show', () => {
        win?.show();
    });

	if (app.isPackaged) {
		win.loadFile(join(__dirname, "../renderer/index.html"));
	} else {
		const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

		win.loadURL(url);
		win.webContents.openDevTools({
            mode: "detach"
        });
	}

	// Open URLS with the shell rather than new windows
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return { action: "deny" };
	});

    // KernelNative contextBridge handlers
    ipcMain.handle("close", () => win?.close());
    ipcMain.handle("minimize", () => win?.minimize());
    ipcMain.handle("maximize", () => win?.maximize());
    ipcMain.handle("restore", () => win?.restore());
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	win = null;
	if (process.platform !== "darwin") app.quit();
});

// Focus on the main window if the user tried to open another
app.on("second-instance", () => {
	if (win) {
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on("activate", () => {
	const allWindows = BrowserWindow.getAllWindows();
    
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});