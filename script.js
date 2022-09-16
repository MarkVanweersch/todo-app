// add function to create a todo to be added through checking it


const root = document.querySelector(":root");
const background = document.querySelector(".background");
const themeIcon = document.querySelector(".theme-icon");

const todoApp = document.querySelector(".todo-list-container");
const todoInput = todoApp.querySelector(".todo-input");
const todoItemsDraggable = todoApp.querySelectorAll(".todo-item[draggable=true]");
const checkTodoIcon = todoApp.querySelectorAll(".todo-item-checkbox");
const todoItemNames = todoApp.querySelectorAll(".todo-item-text");
const deleteTodoIcon = todoApp.querySelectorAll(".todo-item-cross");
const itemCounter = document.querySelector(".item-counter");
const filterAll = document.querySelectorAll(".all-filter");
const filterActive = document.querySelectorAll(".active-filter");
const filterCompleted = document.querySelectorAll(".completed-filter");
const clearCompleted = document.querySelector(".clear-completed-function");


themeIcon.addEventListener("click", themeSwitcher);
todoInput.addEventListener("keyup", addTodo);

checkTodoIcon[0].addEventListener("click", addTodo);

for (let i = 1; i < checkTodoIcon.length; i++) {
  checkTodoIcon[i].addEventListener("click", checkTodo);
};

todoItemNames.forEach((item) => {
  item.addEventListener("click", checkTodo);
});
deleteTodoIcon.forEach((item) => {
  item.addEventListener("click", removeTodo);
});
filterAll.forEach((item) => {
  item.addEventListener("click", showAll);
});
filterActive.forEach((item) => {
  item.addEventListener("click", showActive);
});
filterCompleted.forEach((item) => {
  item.addEventListener("click", showComplete);
});
clearCompleted.addEventListener("click", deleteCompleted);

countItems();

function themeSwitcher() {
  if (root.hasAttribute("style")) {
    root.removeAttribute("style");
    background.classList.toggle("dark");
    background.classList.toggle("light");
    themeIcon.setAttribute("src", "./images/icon-sun.svg");
  } else {
    root.style.setProperty("--clr-main-background", "hsl(236, 33%, 92%)");
    root.style.setProperty("--clr-item-background", "hsl(0, 0%, 98%)");
    root.style.setProperty("--clr-border", "hsl(233, 11%, 84%)");
    root.style.setProperty("--clr-item-text-active", "hsl(235, 19%, 35%)");
    root.style.setProperty("--clr-item-text-inactive", "hsl(233, 11%, 84%)");
    root.style.setProperty("--clr-filter-hover", "hsl(235, 19%, 35%)");
    background.classList.toggle("dark");
    background.classList.toggle("light");
    themeIcon.setAttribute("src", "./images/icon-moon.svg");
  }
};

function addTodo(event) {
  let key = event.key;

  if ((key === "Enter" && todoInput.value !== "") || (event.type === "click" && todoInput.value !== "")) {
    const newTodo = document.createElement("li");
    newTodo.setAttribute("class", "todo-item unchecked visible");

    const todoItemCheckBox = document.createElement("div");
    todoItemCheckBox.setAttribute("class", "todo-item-checkbox");
    todoItemCheckBox.addEventListener("click", checkTodo);

    const todoItemTextContainer = document.createElement("p");
    todoItemTextContainer.setAttribute("class", "todo-item-text");
    todoItemTextContainer.addEventListener("click", checkTodo);
    
    const newTodoTextNode = document.createTextNode(todoInput.value);
    todoItemTextContainer.appendChild(newTodoTextNode);

    const todoItemCross = document.createElement("img");
    todoItemCross.setAttribute("src", "./images/icon-cross.svg");
    todoItemCross.setAttribute("class", "todo-item-cross");
    todoItemCross.setAttribute("alt", "Cross icon indicating to remove the todo");
    todoItemCross.addEventListener("click", removeTodo);
    
    newTodo.appendChild(todoItemCheckBox);
    newTodo.appendChild(todoItemTextContainer);
    newTodo.appendChild(todoItemCross);    

    todoApp.appendChild(newTodo);
    todoInput.value = "";
    countItems();
  }
};

function countItems() {
  const itemNumber = todoApp.querySelectorAll(".todo-item.unchecked").length;
  itemCounter.innerText = itemNumber;
};

function checkTodo(event) {
  let target = event.currentTarget;
  let todoItem = target.parentElement;
  todoItem.classList.toggle("unchecked");
  todoItem.classList.toggle("checked");
  todoItem.classList.toggle("completed");
  countItems();
};

function removeTodo(event) {
  let cross = event.currentTarget;
  let todoItem = cross.parentElement;
  todoItem.remove();
  countItems();
};

function showAll() {
  const todoItems = todoApp.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.classList.remove("hidden");
    item.classList.add("visible");
  });
  filterAll.forEach((item) => {
    item.classList.add("active");
  });
  filterActive.forEach((item) => {
    item.classList.remove("active");
  });
  filterCompleted.forEach((item) => {
    item.classList.remove("active");
  });
};

function showActive() {
  const activeItems = todoApp.querySelectorAll(".todo-item.unchecked");
  activeItems.forEach((item) => {
    item.classList.add("visble");
    item.classList.remove("hidden");
  });
  const completedItems = todoApp.querySelectorAll(".todo-item.checked");
  completedItems.forEach((item) => {
    item.classList.add("hidden");
    item.classList.remove("visible");
  });
  filterAll.forEach((item) => {
    item.classList.remove("active");
  });
  filterActive.forEach((item) => {
    item.classList.add("active");
  });
  filterCompleted.forEach((item) => {
    item.classList.remove("active");
  });
};

function showComplete() {
  const completedItems = todoApp.querySelectorAll(".todo-item.checked");
  completedItems.forEach((item) => {
    item.classList.add("visible");
    item.classList.remove("hidden");
  });
  const activeItems = todoApp.querySelectorAll(".todo-item.unchecked");
  activeItems.forEach((item) => {
    item.classList.add("hidden");
    item.classList.remove("visible");
  });
  filterAll.forEach((item) => {
    item.classList.remove("active");
  });
  filterActive.forEach((item) => {
    item.classList.remove("active");
  });
  filterCompleted.forEach((item) => {
    item.classList.add("active");
  });
};

function deleteCompleted() {
  const completedItems = todoApp.querySelectorAll(".todo-item.checked");
  completedItems.forEach((item) => {
    item.remove();
  });
};


// drag and drop functionality

todoItemsDraggable.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

todoApp.addEventListener("dragover", (event) => {
  event.preventDefault();
  const item = todoApp.querySelector(".dragging");

  const elementAfterDraggable = getElementAfterDraggable(event.clientY);
  if (elementAfterDraggable === undefined ) {
    todoApp.appendChild(item);
  } else {
    todoApp.insertBefore(item, elementAfterDraggable);
  };
});

function getElementAfterDraggable(yPos) {
  const afterElement = [...todoApp.querySelectorAll(".todo-item[draggable=true]:not(.dragging)")];

  return afterElement.reduce((closest, item) => {
    const box = item.getBoundingClientRect();
    const offset = yPos - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: item};
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};