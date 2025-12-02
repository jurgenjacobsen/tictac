import { app, BrowserWindow, ipcMain } from 'electron';
import { updateElectronApp } from 'update-electron-app';
import { parseStringPromise } from "xml2js";
import path from 'node:path';

updateElectronApp({
  repo: 'jurgenjacobsen/tictac',
  notifyUser: true,
});

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const ICON_PATH: string = path.join(__dirname, '../../src/assets/icon.ico');


if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    title: 'TicTac',
    icon: ICON_PATH,
    autoHideMenuBar: true,
    center: true,
    minHeight: 720,
    minWidth: 1280,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // Example CSP - adjust for GitHub whitelist if needed
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src * 'unsafe-inline' 'unsafe-eval' data: blob:"],
      },
    });
  });

};

app.on('ready', () => {
  createWindow();

  if (mainWindow) mainWindow.maximize();
});

ipcMain.handle("get-ntac", async () => {
  const res = await fetch("https://tictac.nortavia.com/getNTAC.php");
  return await res.json();
});

ipcMain.handle("get-local-wx", async () => {
  const res = await fetch("https://tictac.nortavia.com/getCurrentWxdata.php");
  return await res.json();
});

ipcMain.handle("get-north-wx", async () => {
  const res = await fetch("https://tictac.nortavia.com/getLPPRWXnow.php");
  const xml = await res.text();

  const json = await parseStringPromise(xml);
  return {
    lppr: json.response.data[0].METAR[0]?.raw_text[0],
    lpov: json.response.data[0].METAR[1]?.raw_text[0],
  };
});

ipcMain.handle("get-north-taf", async () => {
  const res = await fetch("https://tictac.nortavia.com/getLPPRtafnow.php");
  const xml = await res.text();

  const json = await parseStringPromise(xml);
  return {
    lppr: json.response.data[0].TAF[0]?.raw_text[0],
    lpov: json.response.data[0].TAF[1]?.raw_text[0],
  };
});

ipcMain.handle("open-external", async (event, url: string) => {
  const { shell } = require('electron');
  await shell.openExternal(url);
});

ipcMain.on("open-notam-popup", () => {
  const popup = new BrowserWindow({
    title: 'NOTAMs Briefing',
    width: 1280,
    height: 720,
    minWidth: 720,
    minHeight: 720,
    icon: ICON_PATH,
    autoHideMenuBar: true,
    center: true,
    minimizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  })

  popup.loadURL("https://fplbriefing.nav.pt")
})

ipcMain.on("open-weather-popup", () => {
  const popup = new BrowserWindow({
    title: 'Weather Briefing',
    width: 1280,
    height: 720,
    minWidth: 720,
    minHeight: 720,
    icon: ICON_PATH,
    autoHideMenuBar: true,
    center: true,
    minimizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  })
  popup.loadURL("https://brief-ng.ipma.pt/#showFlightOverview")
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow?.show();
  }
});
