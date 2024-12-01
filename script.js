const inputTask = document.querySelector("#task");
const inputBtn = document.querySelector("#btn");
const renderTaskSection = document.querySelector(".renderTaskSection");

let tasks = JSON.parse(localStorage.getItem("task")) || [];
tasks.forEach((task) => {
  renderTask(task);
});

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputTask.value;
  if (inputValue.trim() === "") {
    alert("input field is required");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: inputValue,
    completed: false,
  };
  tasks.push(newTask);
  saveItems();
  renderTask(newTask);
  inputTask.value = "";
  console.log(tasks);
});

function renderTask(task) {
  renderTaskSection.innerHTML += ` <form class="renderTaskForm">
        <div class="renderTaskContainer">
          <input type="checkbox" class="checkbox" />
          <input type="text" id="rendertask"  style="display: none"/>
          <li class="renderList">${task.text}</li>
          <button id="edit" type="button">
            <span class="material-symbols-outlined edit"> edit_square </span>
          </button>
          <button id="delete" type="button">
            <span class="material-symbols-outlined delete"> delete </span>
          </button>
        </div>
      </form>`;

  const renderList =
    renderTaskSection.lastElementChild.querySelector(".renderList");
  renderList.setAttribute("taskId", task.id);
  renderList.classList.toggle("completed", task.completed);
}

renderTaskSection.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("delete")) {
    let taskId = e.target
      .closest(".renderTaskForm")
      .querySelector(".renderList")
      .getAttribute("taskId");
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    saveItems();
    renderTaskSection.removeChild(e.target.closest(".renderTaskForm"));
  }
//   else if(e.target.classList.contains("edit")){
//     const renderTaskForm = e.target.closest(".renderTaskForm");
//     const renderitem = renderTaskForm.querySelector(".renderList");
//     const taskText = renderitem.textContent;
//     inputTask.value = taskText;
//     console.log("Task to edit:", taskText);
    
//     let taskId = e.target
//       .closest(".renderTaskForm")
//       .querySelector(".renderList")
//       .getAttribute("taskId");
//    tasks =  tasks.map((task) => (
//         task.id === parseInt(taskId) ? {...task, text:taskText}: task
//     ))

//     saveItems();
   
   
// }
if (e.target.classList.contains("edit")) {
  const renderTaskForm = e.target.closest(".renderTaskForm");
  const renderItem = renderTaskForm.querySelector(".renderList");
  const taskInput = renderTaskForm.querySelector("#rendertask");
  const taskText = renderItem.textContent;

  taskInput.style.display = "flex";
  taskInput.value = taskText; 
  taskInput.style.backgroundColor = "white";
  taskInput.style.color = "black";
  renderItem.style.display = "none"; 

  const editButton = e.target;
  editButton.textContent = "update";
  editButton.classList.remove("edit");
  editButton.classList.add("update");
} else if (e.target.classList.contains("update")) {
  const renderTaskForm = e.target.closest(".renderTaskForm");
  const renderItem = renderTaskForm.querySelector(".renderList");
  const taskInput = renderTaskForm.querySelector("#rendertask");
  const taskId = renderItem.getAttribute("taskId");
  const updatedText = taskInput.value;
  tasks = tasks.map((task) =>
    task.id === parseInt(taskId) ? { ...task, text: updatedText } : task
  );
  saveItems();
   renderItem.textContent = updatedText;
   taskInput.style.display = "none"; 
  renderItem.style.display = "flex"; 
  
  const updateButton = e.target;
  updateButton.textContent = "edit_square";
  updateButton.classList.remove("update");
  updateButton.classList.add("edit");
}
    

  if (e.target.classList.contains("checkbox")) {
    e.stopPropagation();

    const taskForm = e.target.closest(".renderTaskForm");
    const taskId = taskForm.querySelector(".renderList").getAttribute("taskId");

    const task = tasks.find((task) => task.id === parseInt(taskId));
    if (task) {
      task.completed = !task.completed;
    }

    const renderList = taskForm.querySelector(".renderList");
    renderList.classList.toggle("completed", task.completed);
    if (task.completed) {
      renderList.style.textDecoration = "line-through";
      renderList.style.fontStyle = "italic"
    } else {
      renderList.style.textDecoration = "none";
      renderList.style.fontStyle = "normal"
    }
    saveItems();
  }
});

const saveItems = () => {
  localStorage.setItem("task", JSON.stringify(tasks));
};
