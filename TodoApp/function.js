// Loading todo 
function loadTodos() {
    // this function will load the todo from browser
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] }
    console.log(todos);
    return todos;
}

// funtion to add todo to local storage
function addTodoToLocalStoreage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Function to append todoslist to html
function appendTodoInHtml(todoText) {
    const todoList = document.getElementById("todoList");
    const todoIteam = document.createElement("li");

    todoIteam.textContent = todoText;
    todoIteam.classList.add('todoItem')

    // Createing filter buttons 
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn")

    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delete";
    deletBtn.classList.add("deletBtn")

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.classList.add("completedBtn")

    todoIteam.appendChild(editBtn)
    todoIteam.appendChild(deletBtn)
    todoIteam.appendChild(completedBtn)

    todoList.appendChild(todoIteam)

}

// Domeconter loader
document.addEventListener("DOMContentLoaded", () => {
    console.log("DomContentLoaded Sucessfully");

    const todoInput = document.getElementById("todoInput");

    const sumbitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");

    sumbitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if (todoText === '') {
            alert("Please write something for Todo")
        } else {
            addTodoToLocalStoreage(todoText)
            appendTodoInHtml(todoText);
            todoInput.value = ' '; // seting the input value as empty after adding todo
        }
    });

    todoInput.addEventListener("change", (event) => {
        // This call back fired everytime when something change in input tag
        const todoText = event.target.value
        event.target.value = todoText.trim()

        console.log(event.target.value);
    });

    const todo = loadTodos();

    todo.todoList.forEach(todo => {
        const newTodoIteam = document.createElement("li");
        newTodoIteam.textContent = todo
        todoList.appendChild(newTodoIteam)
    });

})

