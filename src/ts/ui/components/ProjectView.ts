import "../../../styles/ProjectView.css";
import plusIconImg from "../../../images/plus.svg";
import editIconImg from "../../../images/dots-horizontal.svg";
import { Project } from "../../models/Project";

export class ProjectView {
    static renderInboxProjectContainer(project: Project) {
        const projectActions: HTMLDivElement = document.querySelector(".main-project-actions");

        const editProjectBtn: HTMLButtonElement = document.createElement("button");
        editProjectBtn.setAttribute("class", "main-edit-project-btn")

        const editIcon: HTMLImageElement = document.createElement("img");
        editIcon.src = editIconImg;
        editIcon.alt = "three hollow circles in a horizontal line spaced evenly";

        editProjectBtn.appendChild(editIcon);
        projectActions.appendChild(editProjectBtn);

        const projectTitle: HTMLElement = document.querySelector(".project-header");
        console.log(projectTitle);
        projectTitle.textContent = project.title;

        const addTaskBtn: HTMLButtonElement = document.createElement("button");
        addTaskBtn.setAttribute("class", "main-add-task-btn");

        const plusIcon: HTMLImageElement = document.createElement("img");
        plusIcon.src = plusIconImg;
        plusIcon.alt = "plus sign icon";

        const addTaskBtnText: HTMLDivElement = document.createElement("div");
        addTaskBtnText.textContent = "Add task";

        addTaskBtn.appendChild(plusIcon);
        addTaskBtn.appendChild(addTaskBtnText);

        const addSectionDiv: HTMLDivElement = document.createElement("div");
        addSectionDiv.setAttribute("class", "add-section");

        const addSectionText: HTMLSpanElement = document.createElement("span");
        addSectionText.setAttribute("class", "add-section-text");
        addSectionText.textContent = "Add section"; 

        addSectionDiv.appendChild(addSectionText);

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        projectContainer.appendChild(addTaskBtn);
        projectContainer.appendChild(addSectionDiv);
    }

    static resetProjectView(): void {
        const projectActions: HTMLDivElement = document.querySelector(".main-project-actions");
        projectActions.replaceChildren();

        const projectHeader: HTMLElement = document.querySelector(".project-header");
        projectHeader.textContent = "";

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        projectContainer.replaceChildren(projectContainer.firstElementChild);
    }
}
