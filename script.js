const form = document.querySelector("#add-todo-form");
const input = document.querySelector("#todo-input");
const todosList = document.querySelector("#todos");
const addBtn = document.querySelector("#add-btn");
const deleteBtn = document.querySelector("#delete-all-btn");

addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!input.value.trim()) {
    customAlert("Enter task");
    return;
  }

  const todo = input.value.trim();
  input.value = "";

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({
    name: todo,
    completed: false,
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  input.focus();

  renderTodos();
});

deleteBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const filteredTodos = todos.filter((todo) => !todo.completed);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  renderTodos();
});

const renderTodos = () => {
  todosList.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo, index) => {
    if (!todo) return;
    const todoElement = document.createElement("li");
    if (todo.completed) {
      todoElement.classList.add("completed");
    }
    todoElement.innerHTML = `
      ${todo.name}
      <div>
        <button class="delete-btn">Delete</button>
        <button class="complete-btn">Completed</button>
        <button class="update-btn">Update</button>
      </div>`;

    todoElement.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTodo(index);
    });
    todoElement.querySelector(".complete-btn").addEventListener("click", () => {
      toggleComplete(index);
    });
    todoElement.querySelector(".update-btn").addEventListener("click", () => {
      updateTodo(index);
    });

    todosList.appendChild(todoElement);
  });
};

const deleteTodo = (index) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
};

const toggleComplete = (index) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos[index]) return;
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
};

const updateTodo = (index) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (!todos[index]) return;

  const newTodo = prompt("Enter the updated task", todos[index].name);
  if (newTodo) {
    todos[index].name = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
};

renderTodos();

function customAlert(message) {
  const dialogBox = document.querySelector(".dialog-box");
  const dialogMessage = document.querySelector(".dialog-message");
  const okBtn = document.querySelector(".dialog-btn");
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = 999;

  dialogMessage.textContent = message;
  dialogBox.style.display = "block";
  document.body.appendChild(overlay);

  okBtn.addEventListener("click", function () {
    dialogBox.style.display = "none";
    overlay.remove();
  });
}
