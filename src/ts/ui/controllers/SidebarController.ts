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

        document.querySelector("#sidebar-inbox-btn").addEventListener("click", () => {
            // TODO: Setup a function in UIController to switch to a project view
            console.log("sidebar inbox button clicked");
        });
    }

    renderSidebarProject(project: Project, projectIdx: string): void {
        SidebarView.renderProject(project, projectIdx);
    }
}
