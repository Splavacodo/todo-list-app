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
            // TODO: Create and add a modal view to DOM for creating a new task
            console.log("sidebar add task btn clicked");
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
    }

    renderSidebarProject(project: Project, projectIdx: string): void {
        SidebarView.renderProject(project, projectIdx);

        const newProject = document.querySelector(`[data-project-idx="${projectIdx}"]`);

        newProject.addEventListener("click", () => {
            this.revertElementSelection();
            newProject.classList.add("selected-project");

            this.uiController.renderUserProject(project);
        });

        const editProjectBtn: HTMLButtonElement = document.querySelector(".edit-project-btn");

        editProjectBtn.addEventListener("click", (event) => {
            const editProjectMenu: HTMLDivElement = document.querySelector(".sidebar-edit-project-menu");

            if (editProjectMenu.style.display === "flex")
                editProjectMenu.style.display = "none";
            else {
                SidebarView.placeEditProjectMenu(editProjectBtn);
                event.stopPropagation();
            }
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
