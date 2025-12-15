const addTask = document.querySelector(".add-button");
const taskContainer = document.querySelector(".task-container");
const inputText = document.querySelector(".input-text");
const main = document.querySelector("main");
const progressBar = document.querySelector(".progress-bar");
const motivation = document.querySelector(".motivation");
const pDataContainer = document.querySelector(".privious-data-container");
const popUp = document.querySelector(".pop-up");
const pTaskList = document.querySelector(".p-task-list");
const mainTaskContainer = document.querySelector(".main-data-container");

let load = 0;
let pDataCount = 0;

inputText.focus();

const priviousData = JSON.parse(localStorage.getItem("pData")) || {};

document.body.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("add-button")) {
        if (inputText.value !== "") {
            const taskBox = document.createElement("div");
            const taskBoxLeft = document.createElement("div");
            const task = document.createElement("div");
            const check = document.createElement("i");
            const cross = document.createElement("i");


            taskBox.classList.add("task-box", "flex");
            taskBoxLeft.classList.add("flex");
            check.classList.add("fa-regular", "fa-circle", "uncheck");

            cross.classList.add("fa-solid", "fa-xmark", "cross");

            task.classList.add("text-content");
            task.textContent = inputText.value;
            inputText.value = "";

            taskBoxLeft.classList.add("check-plus-tentcontent");
            taskBoxLeft.append(check, task);
            taskBox.append(taskBoxLeft, cross);

            taskContainer.append(taskBox);
        }
    }

    if (e.target.classList.contains("uncheck")) {
        e.target.classList.remove("fa-regular", "fa-circle", "uncheck");
        e.target.classList.add("fa-circle-check", "fa-solid", "check", "green");
        e.target.nextSibling.classList.add("line-through");

        load += 20;
        progressBar.style.width = `${load}%`;

        priviousData[pDataCount] = e.target.nextSibling.textContent;
        pDataCount++;

        if (load === 100) {
            motivation.textContent = "Hurray ! Congratulation you have succesfully completed your tasks.";
            popUp.classList.toggle("displayNone");
            main.classList.add("pointerEventsNone");
        }
        else if (load > 50) {
            motivation.textContent = "Just a step away, keep going !";
        }
    }

    else if (e.target.classList.contains("check")) {
        e.target.classList.remove("fa-circle-check", "fa-solid", "check", "green");
        e.target.classList.add("fa-regular", "fa-circle", "uncheck");
        e.target.nextSibling.classList.remove("line-through");

        load -= 20;
        progressBar.style.width = `${load}%`;

        if (load < 50) {
            motivation.textContent = "Raise the bar by completing your goals !";
        }
        else if (load > 50 && load !== 100) {
            motivation.textContent = "Just a step away, keep going !";
        }

    }

    if (e.target.classList.contains("cross")) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("p-task")) {
        mainTaskContainer.classList.add("hidden");
        pDataContainer.classList.remove("hidden");

    } else if (e.target.classList.contains("m-task")) {
        mainTaskContainer.classList.remove("hidden");
        pDataContainer.classList.add("hidden");
    }

});

popUp.addEventListener("click", (e) => {
    if (e.target.classList.contains("save-progress")) {
        localStorage.setItem("pData", JSON.stringify(priviousData));

        location.reload();
    };

    if (e.target.classList.contains("new-task")) {
        location.reload();
    }
});

if (priviousData) {
    for (let list in priviousData) {
        const pList = document.createElement("li");

        pList.textContent = priviousData[list];
        pTaskList.append(pList);
    }
}