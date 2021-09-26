const electron = require("electron");

const { ipcRenderer } = electron;




// select trainers from database

document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("LoadTrainersList");
  ipcRenderer.on("TrainersListLoaded", (evnt, result) => {
    const tablecontent = document.querySelector("#tableContent");

    result.map((s) => {
        tablecontent.innerHTML += `<tr id="myTr" class="border-b border-gray-200 bg-white">
                      <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="items-center">
                          ${s.id}
                        </div>
                      </td>
  
                      <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="items-center">
                          ${s.name}
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="items-center">
                          ${s.lastname}
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex items-center justify-center">
                              ${s.email}
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                              ${s.phone}
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
  
                          <button onclick="showModel(${s.id})">
                            
                            <div
                              class="
                                w-4
                                mr-2
                                transform
                                text-purple-500
                                hover:scale-110
                              "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                          </button>
                          <button id=${s.id} onclick="deleteTrainer(${s.id})">
                            <div
                              class="w-4 mr-2 transform text-red-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>`;
      });
    });
  });

// get input value and send it to addTrainerToDB


document.querySelector('#btn-add').addEventListener("click", () => {

    var name_trainer=document.querySelector('#name_trainer').value;
    var lastname_trainer=document.querySelector('#lastname_trainer').value;
    var email_trainer=document.querySelector('#email').value;
    var phone_trainer=document.querySelector('#phone').value;

    if (name_trainer.toString() === "") {
      ipcRenderer.send("showError", "Name can not be null");
    } else if (lastname_trainer.toString() == "") {
     
      ipcRenderer.send("showError", "Last name can not be null");
    } else if (phone_trainer.toString().length != 0) {
      if (phone_trainer.toString().length != 8 || isNaN(phone_trainer)) {  
        
        ipcRenderer.send("showError", "Phone can only be a number and lenght 8");
      }
      else {
      console.log(name_trainer);
      ipcRenderer.send("addTrainerToDB", [name_trainer, lastname_trainer, email_trainer, phone_trainer]);
    }
  }});
 
// show model from stilou button

function showModel(id) {
    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    ipcRenderer.send("getModelTrainerInput", id);
    ipcRenderer.on("inputModelTrainerLoaded", (event, result) => {
      console.log(result);
      document.querySelector("#modalInputNameTrainer").value = result[0].name;
      document.querySelector("#modalInputLastNameTrainer").value = result[0].lastname;
      document.querySelector("#modalInputEmailTrainer").value = result[0].email;
      document.querySelector("#modalInputPhoneTrainer").value = result[0].phone;
    });
  
    const updateTrainerBtn = document.querySelector("#updateTrainer");
  
    updateTrainerBtn.addEventListener("click", () => {
      const modalInputNameTrainer = document.querySelector("#modalInputNameTrainer").value;
      const modalInputLastNameTrainer = document.querySelector(
        "#modalInputLastNameTrainer"
      ).value;
      const modalInputEmailTrainer = document.querySelector("#modalInputEmailTrainer").value;
      const modalInputPhoneTrainer = document.querySelector("#modalInputPhoneTrainer").value;
  
      ipcRenderer.send("updateTrainer", [
        id,
        modalInputNameTrainer,
        modalInputLastNameTrainer,
        modalInputEmailTrainer,
        modalInputPhoneTrainer,
      ]);
    });
  }
// close modal

function closeModel() {
    const modal = document.querySelector(".modal");
    modal.classList.add("hidden");
  }
  

// reload page

ipcRenderer.on("reload", () => {
  location.reload();
});


// delete trainer

function deleteTrainer(p) {
    ipcRenderer.send("deleteTrainer", p);
  }
  

