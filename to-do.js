const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
window.onload = () => {
    todos.forEach(task => 
        renderItem(task));
    };
function addItem() {
    const text = input.value.trim();
    if (text === "") return;
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(task);
    saveToLocalStorage();
    renderItem(task);
    input.value = "";
}
function renderItem(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => 
        ToggleComplete(task.id, textSpan, checkbox);
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.className = "task-text";
    if (task.completed)
        textSpan.classList.add("completed");
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => 
        deleteItem(task.id);
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    li.appendChild(li);
}
function ToggleComplete(id, span, checkbox) {
    const task = todos.find(t => t.id === id);
    if (!task) return;
    task.completed = checkbox.checked;
    if (task.completed) {
        span.classList.add("completed");
    } else {
        span.classList.remove("completed");
    }
    saveToLocalStorage();
}
function deleteItem(id) {
    todos = todos.filter(t => t.id !== id);
    saveToLocalStorage();
    const li = document.querySelector(`li[data-id="${id}"]`);
    if (li) li.remove();
}
function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function clearList() {
    todos = [];
    saveToLocalStorage();
    list.innerHTML = "";
}
