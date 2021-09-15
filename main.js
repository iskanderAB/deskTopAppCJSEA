const { app, BrowserWindow, ipcMain } = require("electron");

function boot() {
  win = new BrowserWindow({
    width: 1350,
    height: 900,
    resizable:false,
    backgroundColor: "#eeebf0",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  // win.webContents.openDevTools();
  win.loadURL(`file://${__dirname}/pages/home.html`);
  win.on("closed", () => {
    win = "null";
  });
}
app.on("ready", boot);



// link database:
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./database/electronDesktopDb.sqlite"
  }
});

// get members list from database

ipcMain.on("LoadMembersList" , (event)=>{
  let result = knex.select().from("members")
  result.then((row)=>{
    event.sender.send("MembersListLoaded" , row)
  })
})

// ajout trainer list to database 

ipcMain.on("AjoutTrainerList" , (event,arg) => {
   
  
  let ajout =knex('trainers').insert({name:name_trainer,lastname:lastname_trainer,email:email,phone:phone})
    .then(function (new_trainer) {
      event.sender.send("TrainerListAdd") 
  });

});

