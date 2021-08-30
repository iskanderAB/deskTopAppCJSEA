const { app, BrowserWindow } = require("electron");

function boot() {
  win = new BrowserWindow({
    width: 900,
    height: 800,
  });
  win.loadURL(`file://${__dirname}/main.html`);
  win.on("closed", () => {
    win = "null";
  });
}

app.on("ready", boot);