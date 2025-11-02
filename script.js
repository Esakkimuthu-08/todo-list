var input = document.getElementById("input");
var list = document.querySelector(".lists");
var addbook = document.getElementById("add_button");

const btn = document.getElementById("toggle");
btn.onclick = () => document.body.classList.toggle('dark')

let saved = localStorage.getItem("tasks");
let tasks;
let update = false;
let indexValue;

try {
    tasks = saved ? JSON.parse(saved) : [];
} catch (e) {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateAddButton() {
    addbook.style.display = input.value.trim() === "" ? "none" : "block";
}


function noTasks() {
    let li = document.createElement("li");
    li.textContent = "No tasks yet 👀";
    li.style.color = "gray";
    list.appendChild(li);
}

function rendertasks() {
    list.innerHTML = "";

    if (tasks.length === 0) {
        noTasks();
        return;
    }

    tasks.map((taskText, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = taskText;
        li.appendChild(span);

        let div = document.createElement("div");
        div.innerHTML = `
            <button onclick="Delete(${index})">Del</button>
            <button onclick="Edit(${index})">Edit</button>
            <button onclick="Done(this)">Done</button>
        `;
        li.appendChild(div);

        list.appendChild(li);
    });
}

addbook.addEventListener("click", function (event) {
    event.preventDefault();
    let value = input.value.trim();

    if (!value) {
        alert("Please type something");
        return;
    }
    if (update) {
        tasks[indexValue] = value;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        input.value = "";
        updateAddButton();
        rendertasks();

        update = false;
        indexValue = null;
    } else {
        tasks.push(value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
        updateAddButton();
        rendertasks();
    }
});

function Delete(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    rendertasks();
}

function Edit(index) {
    input.value = tasks[index];
    updateAddButton();
    update = true
    indexValue = index
    localStorage.setItem("tasks", JSON.stringify(tasks));
    rendertasks();
}

function Done(button) {
    let li = button.closest("li");
    li.classList.toggle("completed");
}

updateAddButton();

input.addEventListener("input", updateAddButton);
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addbook.click();
    }
});
rendertasks();



fetch("https://dummyjson.com/quotes")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.quotes.forEach(item => {
            const p = document.createElement('p')
            p.textContent = `"${item.quote}" -"${item.author}" `;
            document.body.appendChild(p)
        });
    })
    .catch(error => {
        console.error("error fetching" , error)
    })