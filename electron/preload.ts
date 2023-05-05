import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('System', {
    platform: () => ipcRenderer.invoke('get-system-plaform').then(result => result),
    execute: (command: string) => ipcRenderer.invoke('execute', command).then(result => result),
})