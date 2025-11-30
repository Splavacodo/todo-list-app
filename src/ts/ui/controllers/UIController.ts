import { ProjectService } from "../../services/ProjectService";
import { SectionService } from "../../services/SectionService";
import { TaskService } from "../../services/TaskService";

import { SidebarController } from "./SidebarController";

import { Project } from "../../models/Project";

export class UIController {
    private taskService: TaskService;
    private sectionService: SectionService;
    private projectService: ProjectService;
    private sidebarController: SidebarController;

    constructor(taskService: TaskService, sectionService: SectionService, projectService: ProjectService) {
        this.taskService = taskService;
        this.sectionService = sectionService;
        this.projectService = projectService;

        this.sidebarController = new SidebarController(this);
        this.sidebarController.setupEventListeners();
    }

    renderSidebarProjects(): void {
        const projects: Array<Project> = this.projectService.getAllProjects();

        for(let i = 1; i < projects.length; i++)
            this.sidebarController.renderSidebarProject(projects[i], i.toString());
    }
}
