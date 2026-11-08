const {app,BrowserWindow,Tray,Menu,ipcMain,dialog,nativeImage,shell}=require('electron');
const path=require('path'),fs=require('fs');
const lock=app.requestSingleInstanceLock();
app.setAppUserModelId('com.meuapp.tarefas');
let win,tray,quitting=false;
const dataFile=()=>path.join(app.getPath('userData'),'tarefas.json');
function show(){if(win){win.show();win.focus()}}
if(!lock){app.quit()}else{
  app.on('second-instance',show);
  app.whenReady().then(()=>{
    const icon=path.join(__dirname,'icon.png');
    win=new BrowserWindow({width:1180,height:820,minWidth:820,minHeight:600,show:!process.argv.includes('--hidden'),backgroundColor:'#f5f3ff',autoHideMenuBar:true,icon,
      webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});
    win.loadFile('index.html');
    win.on('close',e=>{if(!quitting){e.preventDefault();win.hide()}});
    win.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});
    tray=new Tray(nativeImage.createFromPath(icon).resize({width:16,height:16}));
    tray.setToolTip('Tarefas');
    tray.setContextMenu(Menu.buildFromTemplate([{label:'Abrir Tarefas',click:show},{label:'Sair',click:()=>{quitting=true;app.quit()}}]));
    tray.on('click',show);
  });
  app.on('before-quit',()=>{quitting=true});
}
ipcMain.handle('load',()=>{try{return fs.readFileSync(dataFile(),'utf8')}catch(e){return null}});
ipcMain.handle('save',(e,txt)=>{try{const f=dataFile();fs.writeFileSync(f+'.tmp',txt);fs.renameSync(f+'.tmp',f);return true}catch(err){return false}});
ipcMain.handle('saveFile',async(e,name,content)=>{const r=await dialog.showSaveDialog(win,{defaultPath:name});if(r.canceled||!r.filePath)return false;fs.writeFileSync(r.filePath,content,'utf8');return true});
ipcMain.handle('openFile',async()=>{const r=await dialog.showOpenDialog(win,{properties:['openFile'],filters:[{name:'Backup JSON',extensions:['json']}]});if(r.canceled||!r.filePaths[0])return null;return fs.readFileSync(r.filePaths[0],'utf8')});
ipcMain.handle('getAutostart',()=>app.getLoginItemSettings().openAtLogin);
ipcMain.handle('autostart',(e,on)=>{app.setLoginItemSettings({openAtLogin:!!on,args:['--hidden']});return true});
