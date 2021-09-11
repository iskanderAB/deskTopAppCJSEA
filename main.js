const { app, BrowserWindow } = require("electron");

function boot() {
  win = new BrowserWindow({
    width: 1350,
    height: 900,
    resizable:true
  });
  win.loadURL(`file://${__dirname}/home.html`);
  win.on("closed", () => {
    win = "null";
  });
}

app.on("ready", boot);