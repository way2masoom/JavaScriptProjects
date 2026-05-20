// =========================================
// Load todos from localStorage
// =========================================
function loadTodos() {
    // this function will load the todo from browser
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] }
    console.log(todos);
    return todos;
}

// =========================================
// Save new todo into localStorage
// =========================================
function addTodoToLocalStoreage(todo) {
    const todos = loadTodos();
    todos.todoList.push({ ...todo, id: todo.length });
    localStorage.setItem("todos", JSON.stringify(todos))
}

// =========================================
// Handle filter button actions
// =========================================
function executedFilterAction(event) {
    const todoList = document.getElementById("todoList");

    // Get clicked button
    const element = event.target
    const value = element.getAttribute("data-filter")

    // Clear existing todos before rendering again
    todoList.innerHTML = ''
    const todos = loadTodos();


    // condition toe chek is the todo is  All, completed or pending 
    if (value === 'all') {
        console.log("All todos");
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        });

        // Show only pending todos
    } else if (value === 'pending') {
        console.log("Pending todo");
        todos.todoList.forEach(todo => {
            if (todo.isCompleted !== true) {
                appendTodoInHtml(todo);
            }
        });

        // Show only completed todos
    } else {
        console.log("Completed todo");
        todos.todoList.forEach(todo => {
            if (todo.isCompleted == true)
                appendTodoInHtml(todo);
        });
    }
}

// =========================================
// Add todo item into HTML dynamically
// =========================================

function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");
    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id", todo.id); // every todoIteam has sperate id  

    const textDiv = document.createElement("div");

    textDiv.textContent = todo.text;
    todoItem.classList.add('todoItem')

    // =====================================
    // Create wrapper for action buttons
    // =====================================
    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons")

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn")

    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delete";
    deletBtn.classList.add("deleteBtn")

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.classList.add("completeBtn")

    wrapper.appendChild(editBtn)
    wrapper.appendChild(deletBtn)
    wrapper.appendChild(completedBtn)

    todoItem.appendChild(textDiv);

    todoItem.appendChild(wrapper)

    // Finally add todo item into HTML list
    todoList.appendChild(todoItem)

}

// =========================================
// Run JavaScript after HTML loads completely
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DomContentLoaded Sucessfully");

    const todoInput = document.getElementById("todoInput");

    const sumbitButton = document.getElementById("addTodo");

    let todos = loadTodos();

    const todoList = document.getElementById("todoList");

    // on the click of filter buttons
    const filterBtns = document.getElementsByClassName("filterBtn");
    console.log(filterBtns);

    // =====================================
    // Add click event on filter buttons
    // =====================================
    for (const btn of filterBtns) {
        btn.addEventListener("click", executedFilterAction)
    }

    // =====================================
    // Add new todo
    // =====================================
    sumbitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if (todoText === '') {
            alert("Please write something for Todo")
        } else {
            todos = loadTodos(); // reloading each times 
            const id = todos.todoList.length

            addTodoToLocalStoreage({ text: todoText, isCompleted: false, id })
            appendTodoInHtml({ text: todoText, isCompleted: false, id });
            todoInput.value = ''; // seting the input value as empty after adding todo
        }
    });

    // =====================================
    // Trim extra spaces while typing
    // =====================================
    todoInput.addEventListener("change", (event) => {
        // This call back fired everytime when something change in input tag
        const todoText = event.target.value
        event.target.value = todoText.trim()

        console.log(event.target.value);
    });

    // =====================================
    // Load all saved todos on page refresh
    // =====================================

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

})

