import "../../../styles/TaskView.css";
import checkboxImg from "../../../images/checkbox-blank-circle-outline.svg";
import editTaskImg from "../../../images/pencil-outline.svg";
import trashOutlineImg from "../../../images/trash-can-outline.svg"
import { Task } from "../../models/Task";

export class TaskView {
    static renderTaskToParent(task: Task, parentId: string) {
        const tasksList = document.querySelector(`ul[data-parent-id="${parentId}"]`);
        tasksList.appendChild(this.createTaskContainer(task));
    }

    static createTaskContainer(task: Task): HTMLLIElement {
        const taskContainer: HTMLLIElement = document.createElement("li");
        taskContainer.setAttribute("class", "task");
        taskContainer.setAttribute("data-task-id", task.id);

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

        if (taskDescription.textContent !== "") {
            taskDescription.style.height = "1.5rem";
            taskTitle.style.marginBottom = "4px";
        }

        const taskDueDateDiv: HTMLDivElement = document.createElement("div");
        taskDueDateDiv.setAttribute("class", "task-due-date");

        if (task.dueDate !== "") {
            const dateComponents: Array<string> = task.dueDate.split("-");

            switch(dateComponents[1]) {
                case "01":
                    taskDueDateDiv.textContent += "Jan";
                    break;
                case "02":
                    taskDueDateDiv.textContent += "Feb";
                    break;
                case "03":
                    taskDueDateDiv.textContent += "Mar";
                    break;
                case "04":
                    taskDueDateDiv.textContent += "Apr";
                    break;
                case "05":
                    taskDueDateDiv.textContent += "May";
                    break;
                case "06":
                    taskDueDateDiv.textContent += "June";
                    break;
                case "07":
                    taskDueDateDiv.textContent += "Jul";
                    break;
                case "08":
                    taskDueDateDiv.textContent += "Aug";
                    break;
                case "09":
                    taskDueDateDiv.textContent += "Sep";
                    break;
                case "10":
                    taskDueDateDiv.textContent += "Oct";
                    break;
                case "11":
                    taskDueDateDiv.textContent += "Nov";
                    break;
                case "12":
                    taskDueDateDiv.textContent += "Dec";
                    break;
            }

            taskDueDateDiv.textContent += " " + dateComponents[2];
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

        return taskContainer;
    }
}
