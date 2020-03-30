const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const { ipcMain } = require('electron')
const { dialog } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const fs = require('fs')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>')
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('generarCSV', (event, arg) => {
  dialog.showSaveDialog(mainWindow, {
    title: 'Exportar CSV',
    defaultPath: 'Prueba-ACHS-Kine.csv'
  }).then(data => {
    if (!data.filePath) {
      fs.writeFile(data.filePath, arg, {encoding: 'utf8'}, err => {
        if (err) throw err
        console.log('archivo guardado')
      })
    }
  })
})