import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { spawn } from "child_process";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        title: "Timber Structural Designer",
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            contextIsolation: true,
            allowRunningInsecureContent: false,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Remove the menu bar
    // mainWindow.setMenuBarVisibility(false);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("get-process-name", () => {
    const name = path.basename(process.argv[0]);
    return name.substring(0, name.length - 4);
});

ipcMain.handle("robot-import", async (event) => {
    return new Promise((resolve, reject) => {
        // Path to the compiled C# executable
        const isDevelopment = !app.isPackaged;
        const csharpExecutablePath = isDevelopment
            ? path.join(
                  app.getAppPath(),
                  "static",
                  "api",
                  "RobotImportTimberModel.exe"
              )
            : path.join(
                  process.resourcesPath,
                  "static",
                  "api",
                  "RobotImportTimberModel.exe"
              );

        // Spawn the C# process
        const cSharpProcess = spawn(csharpExecutablePath);

        let result = "";
        let error = "";

        // Capture the output
        cSharpProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        // Capture errors
        cSharpProcess.stderr.on("data", (data) => {
            error += data.toString();
        });

        cSharpProcess.on("close", (code) => {
            if (code === 0 && !error) {
                resolve(result.trim());
            } else {
                reject(error || "Unknown error occurred.");
            }
        });
    });
});

ipcMain.handle("tedds-design", async (event, parentWindowName, robotData) => {
    return new Promise((resolve, reject) => {
        // Path to the compiled C# executable
        const isDevelopment = !app.isPackaged;
        const csharpExecutablePath = isDevelopment
            ? path.join(
                  app.getAppPath(),
                  "static",
                  "api",
                  "TeddsTimberDesign.exe"
              )
            : path.join(
                  process.resourcesPath,
                  "static",
                  "api",
                  "TeddsTimberDesign.exe"
              );

        // Spawn the C# process
        const cSharpProcess = spawn(csharpExecutablePath, [
            parentWindowName,
            robotData,
        ]);

        let result = "";
        let error = "";

        // Capture the output
        cSharpProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        // Capture errors
        cSharpProcess.stderr.on("data", (data) => {
            error += data.toString();
        });

        cSharpProcess.on("close", (code) => {
            if (code === 0 && !error) {
                resolve(result.trim());
            } else {
                reject(error || "Unknown error occurred.");
            }
        });
    });
});
