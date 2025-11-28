import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  getNTAC: () => ipcRenderer.invoke("get-ntac"),
  getLocalWx: () => ipcRenderer.invoke("get-local-wx"),
  getNorthWx: () => ipcRenderer.invoke("get-north-wx"),
  getNorthTaf: () => ipcRenderer.invoke("get-north-taf"),
  openExternal: (url: string) => ipcRenderer.invoke("open-external", url),
  openNotamPopup: () => ipcRenderer.send("open-notam-popup"),
  openWeatherPopup: () => ipcRenderer.send("open-weather-popup"),
});