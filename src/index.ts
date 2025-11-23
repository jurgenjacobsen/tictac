import { app, BrowserWindow, Tray, Menu } from 'electron';
import path from 'node:path';
import { updateElectronApp } from 'update-electron-app';

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

const createTray = (): void => {
  const tray = new Tray(ICON_PATH);
  tray.setToolTip('TicTac');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open App',
      click: () => {
        const wins = BrowserWindow.getAllWindows()
        if (wins.length === 0) {
          createWindow();
          mainWindow?.maximize();
        } else {
          wins[0].focus()
        }
      }
    },
    { role: 'quit' }
  ])

  tray.setContextMenu(contextMenu);
}


app.on('ready', () => {
  createWindow();
  
  createTray();

  if (mainWindow) mainWindow.maximize();
});

app.on('window-all-closed', () => {
  /*if (process.platform !== 'darwin') {
    app.quit();
  }*/
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    mainWindow?.show();
  }
});
