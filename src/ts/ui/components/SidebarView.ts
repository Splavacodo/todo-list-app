import "../../../styles/SidebarView.css";
import projectIconImg from "../../../images/pound.svg"; 
import editIcon from "../../../images/dots-horizontal.svg";
import renameOptionIconImg from "../../../images/pencil-outline.svg";
import deleteOptionIconImg from "../../../images/trash-can-outline.svg";
import { Project } from "../../models/Project";

export class SidebarView {
    static renderProject(project: Project, projectIdx: string) {
        const projectItem: HTMLLIElement = document.createElement("li");
        projectItem.setAttribute("class", "selectable project");
        projectItem.setAttribute("data-project-idx", projectIdx); 
        projectItem.setAttribute("data-project-id", project.id);

        const projectIcon: HTMLImageElement = document.createElement("img");
        projectIcon.setAttribute("class", "project-icon");
        projectIcon.src = projectIconImg;
        projectIcon.alt = "pound symbol icon";

        const projectTitle: HTMLDivElement = document.createElement("div");
        projectTitle.setAttribute("class", "project-title");
        projectTitle.textContent = project.title;

        const editProjectBtn: HTMLButtonElement = document.createElement("button");
        editProjectBtn.setAttribute("class", "edit-project-btn");

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

    static renderEditProjectMenu() {
        const editProjectMenu: HTMLDivElement = document.createElement("div");
        editProjectMenu.setAttribute("class", "sidebar-edit-project-menu");

        const renameMenuOption: HTMLDivElement = document.createElement("div");
        renameMenuOption.setAttribute("class", "rename-menu-option");

        const renameOptionIcon: HTMLImageElement = document.createElement("img");
        renameOptionIcon.setAttribute("class", "rename-option-icon");
        renameOptionIcon.src = renameOptionIconImg;
        renameOptionIcon.alt = "icon of a pencil outline";

        const renameOptionText: HTMLDivElement = document.createElement("div");
        renameOptionText.setAttribute("class", "rename-option-text");
        renameOptionText.textContent = "Rename";

        renameMenuOption.appendChild(renameOptionIcon);
        renameMenuOption.appendChild(renameOptionText);

        const deleteMenuOption: HTMLDivElement = document.createElement("div");
        deleteMenuOption.setAttribute("class", "delete-menu-option");

        const deleteOptionIcon: HTMLImageElement = document.createElement("img");
        deleteOptionIcon.setAttribute("class", "delete-option-icon");
        deleteOptionIcon.src = deleteOptionIconImg;
        deleteOptionIcon.alt = "outline of trash can icon";

        const deleteOptionText: HTMLDivElement = document.createElement("div");
        deleteOptionText.setAttribute("class", "delete-option-text");
        deleteOptionText.textContent = "Delete";

        deleteMenuOption.appendChild(deleteOptionIcon);
        deleteMenuOption.appendChild(deleteOptionText);

        editProjectMenu.appendChild(renameMenuOption);
        editProjectMenu.appendChild(deleteMenuOption);

        document.body.appendChild(editProjectMenu);
    }

    static placeEditProjectMenu(parentButton: HTMLButtonElement) {
        const editProjectMenu: HTMLDivElement = document.querySelector(".sidebar-edit-project-menu");

        const editProjectBtnRect: DOMRect = parentButton.getBoundingClientRect();
        editProjectMenu.style.top = `${editProjectBtnRect.top - 6}px`;
        editProjectMenu.style.left = `${editProjectBtnRect.right + 8}px`;

        editProjectMenu.style.display = "flex";
    }
}
