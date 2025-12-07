import { UIController } from "./UIController";
import { SidebarView } from "../components/SidebarView"; 
import { Project } from "../../models/Project";

export class SidebarController {
    private uiController: UIController;

    constructor(uiController: UIController) {
        this.uiController = uiController;
    }

    setupEventListeners(): void {
        document.querySelector("#sidebar-add-task-btn").addEventListener("click", () => {
            // TODO: Create and add a modal view to DOM for creating a new task
            console.log("sidebar add task btn clicked");
        });

        const sidebarProjectsToggleBtn: HTMLButtonElement = document.querySelector("#sidebar-toggle-view-projects-btn");

        sidebarProjectsToggleBtn.addEventListener("click", () => {
            if (sidebarProjectsToggleBtn.classList.contains("toggle-on")) {
                sidebarProjectsToggleBtn.classList.remove("toggle-on");
                sidebarProjectsToggleBtn.classList.add("toggle-off");
            }
            else {
                sidebarProjectsToggleBtn.classList.add("toggle-on");
                sidebarProjectsToggleBtn.classList.remove("toggle-off");
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
    }

    renderSidebarProject(project: Project, projectIdx: string): void {
        SidebarView.renderProject(project, projectIdx);

        const newProject = document.querySelector(`[data-project-idx="${projectIdx}"]`);

        newProject.addEventListener("click", () => {
            this.revertElementSelection();
            newProject.classList.add("selected-project");

            this.uiController.renderUserProject(project);
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
