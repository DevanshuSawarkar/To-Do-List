let todoRootEl = document.getElementById("todoRoot");
let userInputEl = document.getElementById("userInput");

// Function to get the to-do list from localStorage
function getTodoFromLocalStorage() {

    let data = localStorage.getItem("myTodoList");

    if (data === null) {

        return [];

    } else {

        let parsedTodo = JSON.parse(data);

        return parsedTodo;

    }

}

// Load the to-do list from localStorage
let todoList = getTodoFromLocalStorage();

// Function to handle the status change (check/uncheck) of a to-do item
function onStatusChange(checkboxId, titleId, todoId) {
    let checkBoxEl = document.getElementById(checkboxId);
    let titleEl = document.getElementById(titleId);

    let todoIndex = todoList.findIndex((each) => each.id === todoId);

    // Update the isChecked status in the todoList array
    if (checkBoxEl.checked) {
        titleEl.classList.add("checked");
        todoList[todoIndex].isChecked = true;
    } else {
        titleEl.classList.remove("checked");
        todoList[todoIndex].isChecked = false;
    }

    // Save the updated todoList to localStorage
    onSaveTodo();
}

// Function to delete a to-do item
function onDeleteTodo(todoId) {
    let myTodo = document.getElementById(todoId);

    todoRootEl.removeChild(myTodo);

    let newId = parseInt(todoId.slice(4));

    let index = todoList.findIndex((each) => each.id === newId);

    todoList.splice(index, 1);

    // Save the updated list after deletion
    onSaveTodo();
}

// Function to create and append a to-do item to the list
function createAndAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.id;
    let titleId = "title" + todo.id;
    let todoId = "todo" + todo.id;

    let listCont = document.createElement("li");
    listCont.classList.add("todo-list-cont");
    listCont.id = todoId;
    todoRootEl.appendChild(listCont);

    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = checkboxId;
    checkBoxEl.checked = todo.isChecked; // Preserve the checked status
    checkBoxEl.onclick = function () {

        onStatusChange(checkboxId, titleId, todo.id);

    }
    listCont.appendChild(checkBoxEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-cont");
    labelEl.htmlFor = checkboxId;
    listCont.appendChild(labelEl);

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;

    if (todo.isChecked) {
        
        titleEl.classList.add("checked"); // Add the strike-through if checked

    }

    labelEl.appendChild(titleEl);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {

        onDeleteTodo(todoId);

    }
    labelEl.appendChild(deleteBtn);

    let trashIconEl = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash");
    deleteBtn.appendChild(trashIconEl);

}

// Render the saved todos when the page loads
for (each of todoList) {

    createAndAppendTodo(each);

}

// Function to add a new to-do item
function onAddTodo() {
    let todoText = userInputEl.value.trim(); // Trim to remove any extra spaces

    if (todoText === "") {
        // Show an alert if the input is empty
        alert("To-Do item cannot be empty!");
        return;
    }

    let newTodo = {
        title: todoText,
        id: todoList.length + 1,
        isChecked: false // Set to false by default for new todos
    }

    createAndAppendTodo(newTodo);

    todoList.push(newTodo);

    userInputEl.value = "";

    // Save the new todo to localStorage
    onSaveTodo();
}

// Function to save the to-do list to localStorage
function onSaveTodo() {

    let stringyFyTodo = JSON.stringify(todoList);

    localStorage.setItem('myTodoList', stringyFyTodo);

}