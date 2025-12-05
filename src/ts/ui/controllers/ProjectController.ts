import { UIController } from "./UIController";
import { ProjectView } from "../components/ProjectView";
import { Project } from "../../models/Project";

export class ProjectController {
    private uiController: UIController;

    constructor(uiController: UIController) {
        this.uiController = uiController;
    }

    renderInboxProjectContainer(inboxProject: Project): void {
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
