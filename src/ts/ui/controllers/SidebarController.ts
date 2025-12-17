import { UIController } from "./UIController";
import { SidebarView } from "../components/SidebarView"; 
import { Project } from "../../models/Project";

export class SidebarController {
    private uiController: UIController;

    constructor(uiController: UIController) {
        this.uiController = uiController;

        SidebarView.renderEditProjectMenu();
    }

    setupEventListeners(): void {
        document.querySelector("#sidebar-add-task-btn").addEventListener("click", () => {
            (document.querySelector("#add-task-dialog") as HTMLDialogElement).showModal();

            const dueDateButton: HTMLButtonElement = document.querySelector(".task-due-date-btn");
            const dueDateInput: HTMLInputElement = document.querySelector("#task-due-date");

            dueDateInput.style.width = String(dueDateButton.offsetWidth) + "px";
            dueDateInput.style.height = String(dueDateButton.offsetHeight) + "px";

            const priorityBtn: HTMLButtonElement = document.querySelector(".task-priority-btn");
            const prioritySelection: HTMLSelectElement = document.querySelector("#task-priority-selection");

            prioritySelection.style.width = String(priorityBtn.offsetWidth) + "px";
            prioritySelection.style.height = String(priorityBtn.offsetHeight) + "px";

            const taskPlacementBtn: HTMLButtonElement = document.querySelector(".task-placement-btn");
            const taskPlacementSelection: HTMLSelectElement = document.querySelector("#task-placement-selection");

            taskPlacementSelection.style.width = String(taskPlacementBtn.offsetWidth) + "px";
            taskPlacementSelection.style.height = String(taskPlacementBtn.offsetHeight) + "px";
        });

        const sidebarProjectsToggleBtn: HTMLButtonElement = document.querySelector("#sidebar-toggle-view-projects-btn");

        sidebarProjectsToggleBtn.addEventListener("click", () => {
            const projectsList: HTMLUListElement = document.querySelector(".projects-list");

            if (sidebarProjectsToggleBtn.classList.contains("toggle-on")) {
                sidebarProjectsToggleBtn.classList.remove("toggle-on");
                sidebarProjectsToggleBtn.classList.add("toggle-off");

                projectsList.classList.remove("off");
            }
            else {
                sidebarProjectsToggleBtn.classList.add("toggle-on");
                sidebarProjectsToggleBtn.classList.remove("toggle-off");

                projectsList.classList.add("off");
            }
        });

        const inboxBtn = document.querySelector("#sidebar-inbox-btn");

        inboxBtn.addEventListener("click", () => {
            this.revertElementSelection();
            inboxBtn.classList.add("selected-project");

            this.uiController.renderInboxProject();
        });

        const projectsHeader = document.querySelector(".projects-header");

        projectsHeader.addEventListener("click", () => {
            this.revertElementSelection();
            projectsHeader.classList.add("selected-project");

            this.uiController.renderMyProjects();
        });

        const appBody = document.querySelector("body");

        appBody.addEventListener("click", () => {
            const editProjectMenu: HTMLDivElement = document.querySelector(".sidebar-edit-project-menu");
            editProjectMenu.style.display = "none";
        });

        document.querySelector("#sidebar-add-project-btn").addEventListener("click", () => {
            (document.querySelector("#add-project-dialog") as HTMLDialogElement).showModal();
        });

        const renameProjectOption: HTMLDivElement = document.querySelector(".rename-menu-option");

        renameProjectOption.addEventListener("click", () => {
            (document.querySelector("#rename-project-dialog") as HTMLDialogElement).showModal();
        });
    }

    renderSidebarProject(project: Project, projectIdx: string): void {
        SidebarView.renderProject(project, projectIdx);

        const newProject = document.querySelector(`[data-project-idx="${projectIdx}"]`);

        newProject.addEventListener("click", () => {
            this.revertElementSelection();
            newProject.classList.add("selected-project");

            this.uiController.renderUserProject(project);
        });

        const editProjectBtn: HTMLButtonElement = document.querySelector(`[data-project-idx="${projectIdx}"] > .edit-project-btn`);

        editProjectBtn.addEventListener("click", (event) => {
            const editProjectMenu: HTMLDivElement = document.querySelector(".sidebar-edit-project-menu");

            if (editProjectMenu.style.display === "flex")
                editProjectMenu.style.display = "none";
            else {
                SidebarView.placeEditProjectMenu(editProjectBtn);
                event.stopPropagation();
            }

            (document.querySelector("#new-project-name") as HTMLInputElement).value = project.title;
            (document.querySelector("#rename-project-dialog") as HTMLDialogElement).setAttribute("data-project-id", project.id);
        
            const renameProjectBtn: HTMLButtonElement = document.querySelector(".dialog-rename-project-btn");
            
            if (renameProjectBtn.hasAttribute("disabled"))
                renameProjectBtn.toggleAttribute("disabled");
        });
    }

    private revertElementSelection(): void {
        const sidebarProjects: Array<HTMLElement> = Array.from(document.querySelectorAll(".selectable"));

        for(const sidebarProject of sidebarProjects) {
            if (sidebarProject.classList.contains("selected-project")) {
                sidebarProject.classList.remove("selected-project"); 
                break;
            }
        }
    }
}
