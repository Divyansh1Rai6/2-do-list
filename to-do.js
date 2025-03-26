document.addEventListener("DOMContentLoaded", function () {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");
    let addButton = document.getElementById("addButton");

    addButton.addEventListener("click", function () {
        let taskText = taskInput.value.trim();
        if (taskText === "") return;
        let li = document.createElement("li");
        li.innerHTML = `${taskText} <button class="remove-btn">X</button>`;
        
        li.addEventListener("click", function () {
            this.classList.toggle("completed");
        });
        li.querySelector(".remove-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            li.remove();
        });
        taskList.appendChild(li);
        taskInput.value = "";
    });
});