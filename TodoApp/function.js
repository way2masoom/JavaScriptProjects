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
// function to Refresh todos
// =========================================
function refreshTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ========================================= 
// Save new todo into localStorage
// =========================================

function addTodoToLocalStoreage(todo) {

    // Load existing todos
    const todos = loadTodos();

    // Add new todo
    todos.todoList.push(todo);

    // Save updated todos
    localStorage.setItem("todos", JSON.stringify(todos));
}

function resetHtmlTodos(todos) {

    // Get todo list container
    const todoList = document.getElementById("todoList");

    // Clear old todos
    todoList.innerHTML = '';

    // Add todos again
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
}

// function to delete todos 
function deleteTodo(event) {
    const todoIteam = event.target.parentElement.parentElement;

    const todoId = Number(todoIteam.getAttribute("data-id"));

    const todos = loadTodos();

    // Remove selected todo
    todos.todoList = todos.todoList.filter(todo => {
        return todo.id !== todoId;
    });

    // Save updated todos
    refreshTodos(todos);

    // Refresh UI
    resetHtmlTodos(todos);
}


// function to edit todos
function editTodo(event) {

    const todoIteam = event.target.parentElement.parentElement;

    const todoId = Number(todoIteam.getAttribute("data-id"));

    const todos = loadTodos();

    const selectedTodo = todos.todoList.find(todo => {
        return todo.id === todoId;
    });

    const updatedText = prompt("Edit your todo:", selectedTodo.text);

    if (updatedText === null) {
        return;
    }

    const trimmedText = updatedText.trim();

    if (trimmedText === '') {
        alert("Todo cannot be empty");
        return;
    }

    selectedTodo.text = trimmedText;

    refreshTodos(todos);

    resetHtmlTodos(todos);
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

    if (todo.isCompleted) {
        textDiv.classList.add("completed")
    }

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
    editBtn.addEventListener("click", editTodo);

    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delete";
    deletBtn.classList.add("deleteBtn")
    deletBtn.addEventListener("click", deleteTodo);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompleted) ? "Reset" : "Completed";
    completedBtn.classList.add("completeBtn")

    completedBtn.addEventListener("click", toggleBtns)

    wrapper.appendChild(editBtn)
    wrapper.appendChild(deletBtn)
    wrapper.appendChild(completedBtn)

    todoItem.appendChild(textDiv);

    todoItem.appendChild(wrapper)

    // Finally add todo item into HTML list
    todoList.appendChild(todoItem)

}

// =========================================
// toggleBtns buttons working
function toggleBtns(event) {
    console.log("toggling");

    const todoIteam = event.target.parentElement.parentElement; // wer get todoIteam
    const todoId = todoIteam.getAttribute("data-id");
    const todos = loadTodos();

    // logic 
    todos.todoList.forEach(todo => {

        // compare current todo id
        if (todo.id == Number(todoId)) {

            // toggle completed state
            todo.isCompleted = !todo.isCompleted;
        }
    });

    refreshTodos(todos); // fucntion call 

    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
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

    // event to add todo by hitting enter btn
    todoInput.addEventListener("keypress", (event) => {

        // Check if Enter key is pressed
        if (event.key === "Enter") {

            // Trigger Add Todo button click
            sumbitButton.click();
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

