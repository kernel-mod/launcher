import { app, contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
    "KernelNative",
    {
        window: {
            close: () => ipcRenderer.send("close"),
            minimize: () => ipcRenderer.send("minimize"),
            maximize: () => ipcRenderer.send("maximize"),
            restore: () => ipcRenderer.send("restore")
        },
        process: {
            platform: process.platform,
            arch: process.arch
        },
        app: {
            getVersion: () => app.getVersion
        }
    }
);