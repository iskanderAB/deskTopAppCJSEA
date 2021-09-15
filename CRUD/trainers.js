const electron = require("electron");

const { ipcRenderer } = electron;


document.querySelector('#btn-add').addEventListener("click", () => {
    var name_trainer=document.querySelector('#name_trainer').Value;
    var lastname_trainer=document.querySelector('#lastname_trainer').Value;
    var email=document.querySelector('#email').Value;
    var phone=document.querySelector('#phone').Value;
    ipcRenderer.send("AjoutTrainerList", name_trainer); 
    ipcRenderer.on("TrainerListAdd", function()  {
        console.log("ajout avec succes");

});
});
