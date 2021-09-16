
const electron = require("electron");

const { ipcRenderer } = electron;


document.querySelector('#btn-add').addEventListener("click", () => {
    var training_name = document.getElementById('name').value;
    var training_date = document.getElementById('date').value;
    ipcRenderer.send("AjoutTrainingList",[training_name,training_date]); 
    ipcRenderer.on("TrainingListAdd", function()  {
        console.log("ajout avec succes");
    });
});




