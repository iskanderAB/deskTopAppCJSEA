const electron = require("electron");

const { ipcRenderer } = electron;


document.querySelector('#btn-add').addEventListener("click", () => {
    var name_trainer=document.querySelector('#name_trainer').value;
    var lastname_trainer=document.querySelector('#lastname_trainer').value;
    var email=document.querySelector('#email').value;
    var phone=document.querySelector('#phone').value;
    console.log(name_trainer);
    ipcRenderer.send("AjoutTrainerList", [name_trainer,lastname_trainer,email,phone]); 
    ipcRenderer.on("TrainerListAdd", function()  {
        console.log("ajout avec succes");

});
});

