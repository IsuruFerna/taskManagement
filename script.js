let taskCount = 0;
let completedTasksCount = 0;

// uncomment this localStorage line to clean the localStorage
// localStorage.setItem("listTasks", JSON.stringify([]));

// retrieving data from local storage
// check if there is already a list in local storage
if (!localStorage.getItem("listTasks")) {
   // if not, set the the listTasks to a empty list in local storage
   localStorage.setItem("listTasks", JSON.stringify([]));
}
let listObjSaveTasks = JSON.parse(localStorage.getItem("listTasks"));

const containerFormTask = document.getElementById("container-form-task-origin");
const containerTaskManage = document.getElementById(
   "container-manage-date-time"
);
containerTaskManage.classList.add("display-none");
const formManageDataTime = document.getElementById("form-manage-date-time");
const formTaskOrigin = document.getElementById("form-task-origin");
const taskOrigin = document.getElementById("tasks-origin");
let listTasks = [];
// const listObjSaveTasks = [];

const manageTasks = document.getElementById("container-manage-date-time");
const listedTasks = document.getElementById("container-listed-tasks");
listedTasks.style.display = "none";

// This is menu
const navList = document.getElementById("menu");
navList.addEventListener("click", function (event) {
   const target = event.target;
   if (target.classList.contains("menu-item")) {
      // set visibility based on clicked button
      if (target.textContent === "Home") {
         listedTasks.style.display = "block";
         containerFormTask.style.display = "none";
      } else if (target.textContent === "Listing") {
         listedTasks.style.display = "none";
         containerFormTask.style.display = "block";
      }
   }
});

// ***************************************************************************************************************
// listed tasks
// build a functionality to add list of task into container-listed-tasks

formTaskOrigin.addEventListener("submit", function (e) {
   // when user click on btn get the input as a string and separate each with the comma and add into an array
   e.preventDefault();
   const strListTask = taskOrigin.value;
   listTasks = strListTask.split(",");

   //  remove the div and show the auto generated div to choose date and time
   containerFormTask.remove();
   containerTaskManage.classList.remove("display-none");

   //  render each input field with task inserted
   listTasks.forEach((element, index) => {
      const eachInput = document.createElement("div");
      eachInput.classList.add("input-container");

      // input fields must be required?
      eachInput.innerHTML = `
                           <div class="input-row">
                              <label for="input-${index}" class="text-input-label">Task</label>
                              <input id="input-${index}" type="text" class="input-text" value="${element.trim()}" />
                           </div>
                           <div class="input-row">
                              <label for="input-${index}-date" class="date-input-label">Date</label>
                              <input id="input-${index}-date" type="date" class="input-date"/>
                           </div>
                           <div class="input-row">
                              <label for="input-${index}-time" class="time-input-label" >Time</label>
                              <input id="input-${index}-time" type="time" class="input-time" />
                           </div>

                           `;
      formManageDataTime.appendChild(eachInput);
   });

   const btnSaveTasks = document.createElement("div");
   btnSaveTasks.classList.add("input-container");
   btnSaveTasks.innerHTML = `<button type="submit" class="btn add-button">Save</button>`;
   formManageDataTime.appendChild(btnSaveTasks);

   formManageDataTime.addEventListener("submit", function (e) {
      e.preventDefault();
      let allInputs = formManageDataTime.getElementsByTagName("input");
      allInputs = Array.from(allInputs);

      // get each input value and create an object and insert into the main array to save(listObjSaveTasks)
      for (let i = 0; i < allInputs.length; i += 3) {
         const obj = {
            task: allInputs[i].value,
            date: allInputs[i + 1].value,
            time: allInputs[i + 2].value,
            done: false,
         };
         listObjSaveTasks.push(obj);
      }

      // store object list to localStorage
      localStorage.setItem("listTasks", JSON.stringify(listObjSaveTasks));

      console.log("all the data saved into list of object");
      console.log(listObjSaveTasks);
      addTask();
   });
});

const showRemoveCompletedTasksBtn = function () {
   taskList.insertAdjacentHTML(
      "afterend",
      `<button onclick="removeCompletedTasks(this)" class="btn remove-completed">Rimuovi task completati</button>`
   );
};

const removeCompletedTaskBtn = function (
   btn = document.querySelector(".btn.remove-completed")
) {
   console.log("this is the btn: ", btn);
   btn.remove();
};

function addTask() {
   // const taskInput = document.getElementById("task");
   // const taskText = taskInput.value.trim();

   // set visibility of containers
   containerTaskManage.style.display = "none";
   listedTasks.style.display = "block";

   // add each created task to list
   listObjSaveTasks.forEach((element) => {
      const taskList = document.getElementById("taskList");
      const li = document.createElement("li");
      li.classList.add("task");
      li.innerHTML = `
                      <span class="task-text">${element.task} ${
         element.date ? " " + element.date : " date"
      } ${element.time ? " " + element.time : " time"}</span>
                      <button class="btn removeTaskBtn">Rimuovi</button>
                  `;

      li.addEventListener("mouseover", () => {
         li.style.backgroundColor = "#10111a";
      });
      li.addEventListener("mouseleave", () => {
         li.style.backgroundColor = "#0d0e14";
      });
      li.addEventListener("click", (event) => {
         if (event.target.tagName !== "BUTTON") {
            li.firstElementChild.style.textDecoration = "line-through";
            li.classList.add("completed");
            completedTasksCount++;
            if (completedTasksCount === 1) {
               showRemoveCompletedTasksBtn();
            }
            console.log(completedTasksCount);
         }
         //li.style.textDecoration = "line-through";
      });
      console.log(li);

      taskList.appendChild(li);
      // taskInput.value = "";
      taskCount++;

      btnRemove();
   });

   // error handeler
   // if (taskText !== "" && taskText.length <= 30) {
   // } else {
   //    alert(
   //       "assicurati che il testo non sia vuoto e non superi i 30 caratteri."
   //    );
   // }
}

// implementing remove btn
const btnRemove = function () {
   const btnRemoveTask = document.querySelectorAll(".removeTaskBtn");

   for (let i = 0; i < btnRemoveTask.length; i++) {
      btnRemoveTask[i].addEventListener("click", function () {
         // remove from the visibility and remove from the data
         btnRemoveTask[i].parentElement.remove();
         listObjSaveTasks.splice(i, 1);

         // update/store object list to localStorage
         localStorage.setItem("listTasks", JSON.stringify(listObjSaveTasks));
      });
   }
};

// function addTask() {
//    const taskInput = document.getElementById("task");
//    const taskText = taskInput.value.trim();

//    if (taskText !== "" && taskText.length <= 30) {
//       const taskList = document.getElementById("taskList");
//       const li = document.createElement("li");
//       li.classList.add("task");
//       li.innerHTML = `
//                       <span class="task-text">${taskText}</span>
//                       <button onclick="removeTask(this)" class="btn removeTaskBtn">Rimuovi</button>
//                   `;
//       console.log(completedTasksCount);
//       li.addEventListener("mouseover", () => {
//          li.style.backgroundColor = "#10111a";
//       });
//       li.addEventListener("mouseleave", () => {
//          li.style.backgroundColor = "#0d0e14";
//       });
//       li.addEventListener("click", (event) => {
//          if (event.target.tagName !== "BUTTON") {
//             li.firstElementChild.style.textDecoration = "line-through";
//             li.classList.add("completed");
//             completedTasksCount++;
//             if (completedTasksCount === 1) {
//                showRemoveCompletedTasksBtn();
//             }
//             console.log(completedTasksCount);
//          }
//          //li.style.textDecoration = "line-through";
//       });
//       taskList.appendChild(li);
//       taskInput.value = "";
//       taskCount++;
//    } else {
//       alert(
//          "assicurati che il testo non sia vuoto e non superi i 30 caratteri."
//       );
//    }
// }

function removeTask(button) {
   const taskList = document.getElementById("taskList");
   const li = button.parentElement;
   if (li.className.includes("completed")) {
      completedTasksCount--;
   }
   taskList.removeChild(li);
   taskCount--;
   if (completedTasksCount === 0) {
      removeCompletedTaskBtn();
   }
}

const removeCompletedTasks = function (btn) {
   let completedTasks = document.getElementsByClassName("completed");
   completedTasks = Array.from(completedTasks);
   completedTasks.forEach((element) => {
      element.remove();
      taskCount--;
      completedTasksCount--;
   });
   removeCompletedTaskBtn(btn);
};
