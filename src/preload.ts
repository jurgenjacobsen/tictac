import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getNTAC: () => ipcRenderer.invoke("get-ntac"),
  getLocalWx: () => ipcRenderer.invoke("get-local-wx"),
  openExternal: (url: string) => ipcRenderer.invoke("open-external", url),
});