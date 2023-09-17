let taskCount = 0;
let completedTasksCount = 0;

const showRemoveCompletedTasksBtn = function () {
  taskList.insertAdjacentHTML(
    "afterend",
    `<button onclick="removeCompletedTasks(this)" class="btn remove-completed">Rimuovi task completati</button>`
  );
};

const removeCompletedTaskBtn = function (
  btn = document.querySelector(".btn.remove-completed")
) {
  btn.remove();
};

function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText !== "" && taskText.length <= 30) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
                      <span class="task-text">${taskText}</span>
                      <button onclick="removeTask(this)" class="btn removeTaskBtn">Rimuovi</button>
                  `;
    console.log(completedTasksCount);
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
    taskList.appendChild(li);
    taskInput.value = "";
    taskCount++;
  } else {
    alert("assicurati che il testo non sia vuoto e non superi i 30 caratteri.");
  }
}

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
