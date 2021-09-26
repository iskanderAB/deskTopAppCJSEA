
const electron = require("electron");

const { ipcRenderer } = electron;



document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("LoadTrainingList");
    ipcRenderer.on("TrainingListLoaded", (evnt, result) => {
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
                          ${s.date}
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="items-center">
                          ${s.trainer}
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="items-center">
                          ${s.sub}
                        </div>
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
                        <button id=${s.id} onclick="deleteTraining(${s.id})">
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

//add trainers to options 

document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("LoadTrainersList");
  ipcRenderer.on("TrainersListLoaded", (evnt, result) => {
    const first_trainer = document.querySelector("#first_trainer");
    const first_trainer1 = document.querySelector("#first_trainer1");
    const second_trainer = document.querySelector("#second_trainer");
    const second_trainer1 = document.querySelector("#second_trainer1");

    result.map((o) => {
      first_trainer.innerHTML += `<option>${o.name}</option>`;
      first_trainer1.innerHTML += `<option>${o.name}</option>`;
      second_trainer.innerHTML += `<option>${o.name}</option>`;
      second_trainer1.innerHTML += `<option>${o.name}</option>`;
  });
});
});

// get input value and send it to addTrainingToDB
  document.querySelector('#btn-add').addEventListener("click", () => {
    var training_name = document.getElementById('name').value;
    var training_date = document.getElementById('date').value;
    var first_trainer = document.getElementById('first_trainer').value;
    var second_trainer = document.getElementById('second_trainer').value;
  
    if (training_name.toString() === "") {
      ipcRenderer.send("showError", "Name can not be null");
    } 
    else if (training_date.toString() == "") {
    ipcRenderer.send("showError", "Date can not be null");
    }
      else {
      console.log(training_name);
      ipcRenderer.send("addTrainingToDB", [training_name, training_date, first_trainer, second_trainer]);
    }
  });

// show model from stilou button

function showModel(id) {
  const modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  ipcRenderer.send("getModelTrainingInput", id);
  ipcRenderer.on("inputModelTrainingLoaded", (event, result) => {
    console.log(result);
    document.querySelector("#modalInputtrainingname").value = result[0].training_name;
    document.querySelector("#modalInputtrainingdate").value = result[0].training_date;
    document.querySelector("#modalInputtrainer").value = result[0].first_trainer1;
    document.querySelector("#modalInputsub").value = result[0].second_trainer1;
  });

  const updateTrainingBtn = document.querySelector("#updateTraining");

  updateTrainingBtn.addEventListener("click", () => {
    const modalInputtrainingname = document.querySelector("#modalInputtrainingname").value;
    const modalInputtrainingdate = document.querySelector( "#modalInputtrainingdate" ).value;
    const modalInputtrainer = document.querySelector( "modalInputtrainer" ).value;
    const modalInputsub = document.querySelector( "#second_trainer" ).value;
    ipcRenderer.send("updateTraining", [
      id,
      modalInputtrainingname,
      modalInputtrainingdate,
      modalInputtrainer,
      modalInputsub
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


// delete training

function deleteTraining(p) {
  ipcRenderer.send("deleteTraining", p);
}