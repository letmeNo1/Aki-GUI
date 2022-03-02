// Modules to control application life and create native ipcMain window
const { app, BrowserWindow,globalShortcut,screen,ipcMain} = require('electron');
const path = require('path')
const electron = require('electron');

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

  mainWindow.on('close', e => {
    let shell = require('shelljs')
    let nodePath = (shell.which('node').toString());
    shell.config.execPath = nodePath;
    let exec = shell.exec
    e.preventDefault()
    const cmd1 = "jps"
    let out1 = ""
    let  child1 = exec(cmd1,{async:true});
    child1.stdout.on("data",(data)=>{
        out1=out1+data
    })
    child1.stdout.on("close",(data)=>{
        if(out1.includes(".jar")||out1.includes("App")){
            electron.dialog.showMessageBox({
            type: 'info',
            title: 'Warning',
            message:'Please stop service first!',
            buttons: ['ok']
          })
        }else{
            app.exit()
        }
    })
  })

})