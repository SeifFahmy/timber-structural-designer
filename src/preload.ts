// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getProcessName: () => ipcRenderer.invoke("get-process-name"),
    robotImport: (caseIds: string) =>
        ipcRenderer.invoke("robot-import", caseIds),
    teddsDesign: (parentWindowName: string, robotData: string) =>
        ipcRenderer.invoke("tedds-design", parentWindowName, robotData),
    robotUpdate: (sectionData: string) =>
        ipcRenderer.invoke("robot-update", sectionData),
});
