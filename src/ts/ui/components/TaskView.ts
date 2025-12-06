import "../../../styles/TaskView.css";
import checkboxImg from "../../../images/checkbox-blank-circle-outline.svg";
import editTaskImg from "../../../images/pencil-outline.svg";
import trashOutlineImg from "../../../images/trash-can-outline.svg"
import { Task } from "../../models/Task";

export class TaskView {
    static renderTask(task: Task) {
        const taskContainer: HTMLLIElement = document.createElement("li");
        taskContainer.setAttribute("class", "task");

        const taskCheckbox: HTMLButtonElement = document.createElement("button");
        taskCheckbox.setAttribute("class", "task-checkbox");

        const checkboxIcon: HTMLImageElement = document.createElement("img");
        checkboxIcon.setAttribute("class", "task-checkbox-icon");
        checkboxIcon.src = checkboxImg;
        checkboxIcon.alt = "circle outline icon for checkbox";

        taskCheckbox.appendChild(checkboxIcon);

        const taskInfo: HTMLDivElement = document.createElement("div");
        taskInfo.setAttribute("class", "task-info");

        const taskTitle: HTMLDivElement = document.createElement("div");
        taskTitle.setAttribute("class", "task-title");
        taskTitle.textContent = task.title;

        const taskDescription: HTMLDivElement = document.createElement("div");
        taskDescription.setAttribute("class", "task-description");
        taskDescription.textContent = task.description;

        const taskDueDateDiv: HTMLDivElement = document.createElement("div");
        taskDueDateDiv.setAttribute("class", "task-due-date");

        if (task.dueDate !== "none") {
            const taskDueDate: Date = new Date(task.dueDate);

            switch(taskDueDate.getMonth()) {
                case 0:
                    taskDueDateDiv.textContent += "Jan";
                    break;
                case 1:
                    taskDueDateDiv.textContent += "Feb";
                    break;
                case 2:
                    taskDueDateDiv.textContent += "Mar";
                    break;
                case 3:
                    taskDueDateDiv.textContent += "Apr";
                    break;
                case 4:
                    taskDueDateDiv.textContent += "May";
                    break;
                case 5:
                    taskDueDateDiv.textContent += "June";
                    break;
                case 6:
                    taskDueDateDiv.textContent += "Jul";
                    break;
                case 7:
                    taskDueDateDiv.textContent += "Aug";
                    break;
                case 8:
                    taskDueDateDiv.textContent += "Sep";
                    break;
                case 9:
                    taskDueDateDiv.textContent += "Oct";
                    break;
                case 10:
                    taskDueDateDiv.textContent += "Nov";
                    break;
                case 11:
                    taskDueDateDiv.textContent += "Dec";
                    break;
            }

            taskDueDateDiv.textContent += taskDueDate.getDay();
            taskDueDateDiv.style.marginTop = "4px";
        }

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDescription);
        taskInfo.appendChild(taskDueDateDiv);

        const editTaskBtn: HTMLButtonElement = document.createElement("button");
        editTaskBtn.setAttribute("class", "edit-task-btn");

        const editTaskBtnIcon: HTMLImageElement = document.createElement("img");
        editTaskBtnIcon.setAttribute("class", "edit-task-btn-icon");
        editTaskBtnIcon.src = editTaskImg;
        editTaskBtnIcon.alt = "icon of a pencil outline";

        editTaskBtn.appendChild(editTaskBtnIcon);

        const deleteTaskBtn: HTMLButtonElement = document.createElement("button");
        deleteTaskBtn.setAttribute("class", "delete-task-btn");

        const deleteTaskBtnIcon: HTMLImageElement = document.createElement("img");
        deleteTaskBtnIcon.setAttribute("class", "delete-task-btn-icon");
        deleteTaskBtnIcon.src = trashOutlineImg;
        deleteTaskBtnIcon.alt = "icon of trashcan outline";

        deleteTaskBtn.appendChild(deleteTaskBtnIcon);

        taskContainer.appendChild(taskCheckbox);
        taskContainer.appendChild(taskInfo);
        taskContainer.appendChild(editTaskBtn);
        taskContainer.appendChild(deleteTaskBtn);

        const tasksList = document.querySelector(".tasks-list");
        tasksList.appendChild(taskContainer);
    }
}
