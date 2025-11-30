import "../../../styles/SidebarView.css";
import projectIconImg from "../../../images/pound.svg"; 
import editIcon from "../../../images/dots-horizontal.svg";
import { Project } from "../../models/Project";

export class SidebarView {
    static renderProject(project: Project, projectIdx: string) {
        const projectItem: HTMLLIElement = document.createElement("li");
        projectItem.setAttribute("class", "project");
        projectItem.setAttribute("data-project-idx", projectIdx); 

        const projectIcon: HTMLImageElement = document.createElement("img");
        projectIcon.setAttribute("class", "project-icon");
        projectIcon.src = projectIconImg;
        projectIcon.alt = "pound symbol icon";

        const projectTitle: HTMLDivElement = document.createElement("div");
        projectTitle.setAttribute("class", "project-title");
        projectTitle.textContent = project.title;

        const editProjectBtn: HTMLButtonElement = document.createElement("button");
        editProjectBtn.setAttribute("id", "edit-project-btn");

        const editProjectIcon: HTMLImageElement = document.createElement("img");
        editProjectIcon.setAttribute("class", "project-edit-icon");
        editProjectIcon.src = editIcon;
        editProjectIcon.alt = "three hollow circles in a horizontal line spaced evenly";

        editProjectBtn.appendChild(editProjectIcon);

        projectItem.appendChild(projectIcon);
        projectItem.appendChild(projectTitle);
        projectItem.appendChild(editProjectBtn);

        const projectsList: HTMLUListElement = document.querySelector(".projects-list");
        projectsList.appendChild(projectItem);
    }
}
