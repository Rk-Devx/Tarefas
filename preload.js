const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('api',{
  load:()=>ipcRenderer.invoke('load'),save:t=>ipcRenderer.invoke('save',t),
  saveFile:(n,c)=>ipcRenderer.invoke('saveFile',n,c),openFile:()=>ipcRenderer.invoke('openFile'),
  getAutostart:()=>ipcRenderer.invoke('getAutostart'),autostart:o=>ipcRenderer.invoke('autostart',o)});
