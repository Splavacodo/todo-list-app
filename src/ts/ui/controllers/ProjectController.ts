import { UIController } from "./UIController";
import { ProjectView } from "../components/ProjectView";
import { Project } from "../../models/Project";
import { ProjectService } from "../../services/ProjectService";

export class ProjectController {
    private uiController: UIController;
    private projectService: ProjectService;

    constructor(uiController: UIController, projectService: ProjectService) {
        this.uiController = uiController;
        this.projectService = projectService;
    }

    renderInboxProjectContainer(): void {
        const inboxBtn: HTMLButtonElement = document.querySelector("#sidebar-inbox-btn");
        const inboxProject: Project = this.projectService.getProject(inboxBtn.dataset.projectId);
        
        ProjectView.renderInboxProjectContainer(inboxProject);
    }

    renderMyProjects(): void {
        ProjectView.renderMyProjects();
    }

    renderUserProject(project: Project): void {
        ProjectView.renderProject(project);
    }

    resetProjectContainer(): void {
        ProjectView.resetProjectView();
    }
}
