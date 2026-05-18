
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

// Domeconter loader
document.addEventListener("DOMContentLoaded", () => {
    console.log("DomContentLoaded Sucessfully");


    const todoInput = document.getElementById("todoInput");

    const sumbitButton = document.getElementById("addTodo");

    sumbitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if (todoText === '') {
            alert("Please write something for Todo")
        } else {
            addTodoToLocalStoreage(todoText)
        }
    });

    todoInput.addEventListener("change", (event) => {
        // This call back fired everytime when something change in input tag
        const todoText = event.target.value
        event.target.value = todoText.trim()

        console.log(event.target.value);
    });

    loadTodos();

})

