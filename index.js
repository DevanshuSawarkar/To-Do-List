let todoRootEl = document.getElementById("todoRoot");
let userInputEl = document.getElementById("userInput");



let todoList = [

    {
        title: "HTML",
        id: 1
    },
    {
        title: "CSS",
        id: 2
    },
    {
        title: "Bootstrap",
        id: 3
    }

]



function createAndAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.id;

    let listCont = document.createElement("li");
    listCont.classList.add("todo-list-cont");
    todoRootEl.appendChild(listCont);


    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = checkboxId;
    listCont.appendChild(checkBoxEl);

    console.log(checkBoxEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-cont");
    labelEl.htmlFor = checkboxId;
    listCont.appendChild(labelEl);

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    labelEl.appendChild(titleEl);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    labelEl.appendChild(deleteBtn);

    // <i class="fa-solid fa-trash"></i>

    let trashIconEl = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash");
    deleteBtn.appendChild(trashIconEl);

}



for (each of todoList) {

    createAndAppendTodo(each);

}



function onAddTodo() {

    console.log(userInputEl.value);

    let newTodo = {
        title: userInputEl.value,
        id: todoList.length + 1
    }

    createAndAppendTodo(newTodo);
    todoList.push(newTodo);

    console.log(todoList);

}