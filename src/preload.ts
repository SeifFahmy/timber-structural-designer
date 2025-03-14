// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getProcessName: () => ipcRenderer.invoke("get-process-name"),
    robotImport: (ulsCaseIds: string, slsCaseIds: string) =>
        ipcRenderer.invoke("robot-import", ulsCaseIds, slsCaseIds),
    teddsDesign: (
        parentWindowName: string,
        robotData: string,
        deflectionLimit: string
    ) =>
        ipcRenderer.invoke(
            "tedds-design",
            parentWindowName,
            robotData,
            deflectionLimit
        ),
    robotUpdate: (sectionData: string) =>
        ipcRenderer.invoke("robot-update", sectionData),
});
