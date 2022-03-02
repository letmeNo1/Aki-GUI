// Modules to control application life and create native ipcMain window
const { app, BrowserWindow,globalShortcut,screen,ipcMain} = require('electron');
const path = require('path')


app.on('ready',()=>{
  let mainWindow = new BrowserWindow({
          width: 300,
          height: 300,
          webPreferences: {
            nodeIntegration: true, 
            enableRemoteModule: true,
            contextIsolation: false,
          },
          icon: path.join(__dirname, 'assets/image/f3.png')
  })
  mainWindow.loadFile('sections/index.html')
  if (process.platform === 'darwin') {
      app.dock.setIcon(path.join(__dirname, 'assets/image/f3.png'));
  }

 
})