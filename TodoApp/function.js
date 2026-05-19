// Loading todo 
function loadTodos() {
    // this function will load the todo from browser
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] }
    console.log(todos);
    return todos;
}

// funtion to add todo to local storage
function addTodoToLocalStoreage(todo) {
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

// funtion to executed the filters buttons
function executedFilterAction(event) {
    const todoList = document.getElementById("todoList");

    const element = event.target
    const value = element.getAttribute("data-filter")

    todoList.innerHTML = ''
    const todos = loadTodos();


    // condition toe chek is the todo is  All, completed or pending 
    if (value === 'all') {
        console.log("All todos");
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        });
    } else if (value === 'pending') {
        console.log("Pending todo");
        todos.todoList.forEach(todo => {
            if (todo.isCompleted !== true) {
                appendTodoInHtml(todo);
            }
        });
    } else {
        console.log("Completed todo");
        todos.todoList.forEach(todo => {
            if (todo.isCompleted == true)
                appendTodoInHtml(todo);
        });
    }
}

// Function to append todoslist to html
function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");
    const todoIteam = document.createElement("li");

    const textDiv = document.createElement("div");

    textDiv.textContent = todo.text;
    todoIteam.classList.add('todoItem')

    /****** Createing filter buttons  ******/
    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons")

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn")

    const deletBtn = document.createElement("button");
    deletBtn.textContent = "Delete";
    deletBtn.classList.add("deletBtn")

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.classList.add("completeBtn")

    wrapper.appendChild(editBtn)
    wrapper.appendChild(deletBtn)
    wrapper.appendChild(completedBtn)

    todoIteam.appendChild(textDiv);

    todoIteam.appendChild(wrapper)

    /****** End of filter button  ******/

    todoList.appendChild(todoIteam)

}

// Domeconter loader
document.addEventListener("DOMContentLoaded", () => {
    console.log("DomContentLoaded Sucessfully");

    const todoInput = document.getElementById("todoInput");

    const sumbitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");

    // on the click of filter buttons
    const filterBtns = document.getElementsByClassName("filterBtn");
    console.log(filterBtns);

    for (const btn of filterBtns) {
        btn.addEventListener("click", executedFilterAction)
    }


    sumbitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if (todoText === '') {
            alert("Please write something for Todo")
        } else {
            addTodoToLocalStoreage({ text: todoText, isCompleted: false })
            appendTodoInHtml({ text: todoText, isCompleted: false });
            todoInput.value = ' '; // seting the input value as empty after adding todo
        }
    });

    todoInput.addEventListener("change", (event) => {
        // This call back fired everytime when something change in input tag
        const todoText = event.target.value
        event.target.value = todoText.trim()

        console.log(event.target.value);
    });

    const todos = loadTodos();

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

})

