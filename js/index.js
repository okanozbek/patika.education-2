const input = document.querySelector('#task');
const addButton = document.querySelector('#addTaskButton');
const listArea = document.querySelector('#taskList');
const listItem = document.querySelector('li');
const addedToast = [].slice.call(document.querySelectorAll('.added-toast'));
const emptyWarningToast = [].slice.call(document.querySelectorAll('.empty__warning-toast'));
const localStorageName = "todoItems";
let todoItems = [];
let removeIcon = `
<svg width="24px" class="remove-icon" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
</svg>
`;

function newElement(e) {
    var regex = /^\s*$/.test(input.value);
    e.preventDefault();
    var toast1 = addedToast.map(function(toastEl) {
        return new bootstrap.Toast(toastEl);
    });
    var toast2 = emptyWarningToast.map(function(toastEl) {
        return new bootstrap.Toast(toastEl);
    });
    
    if(input.value && !regex) {
        createItem(input.value);
        toast1.forEach(toast => toast.show());
    } else {
        toast2.forEach(toast => toast.show());
    }

    input.value = "";
};

function todoItemTemplate (id,text) {
    let customClass = 'list-group-item d-flex list-unstyled justify-content-between align-items-center border-0 p-3 rounded-custom-1 custom-box-shadow'
    const li = document.createElement('li');
    const removeElement = document.createElement('span');
    li.id = id;
    li.innerHTML = text;
    li.className = customClass;
    removeElement.innerHTML = removeIcon;
    li.appendChild(removeElement);
    listArea.appendChild(li);
    todoComplete(li);
    todoRemove(li,removeElement);
}

function createItem (text) {
    todoItemTemplate(todoItems.length, text);
    todoItems.push(text);
    localStorage.setItem(localStorageName, JSON.stringify(todoItems));
};

function todoComplete (li) {
    li.addEventListener('click', function(){
        li.classList.toggle('todo-complete');
    });
};

function todoRemove (li,removeItem) {
    removeItem.addEventListener('click', function(){
        let id = JSON.parse(localStorage.getItem(localStorageName)).indexOf(li.firstChild.nodeValue);
        todoItems.splice(id, 1);
        localStorage.setItem(localStorageName, JSON.stringify(todoItems));
        li.remove();
    });
};

window.onload = () => {
    const todoList = JSON.parse(localStorage.getItem(localStorageName));
    todoList.map((item,index) => {
        todoItemTemplate(index, item)
    })
}
