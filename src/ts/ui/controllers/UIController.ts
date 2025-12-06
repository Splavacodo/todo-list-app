import { ProjectService } from "../../services/ProjectService";
import { SectionService } from "../../services/SectionService";
import { TaskService } from "../../services/TaskService";

import { SidebarController } from "./SidebarController";
import { ProjectController } from "./ProjectController";
import { SectionController } from "./SectionController";
import { TaskController } from "./TaskController";

import { Project } from "../../models/Project";
import { Section } from "../../models/Section";

export class UIController {
    private taskService: TaskService;
    private sectionService: SectionService;
    private projectService: ProjectService;
    private sidebarController: SidebarController;
    private projectController: ProjectController;
    private sectionController: SectionController;
    private taskController: TaskController;

    constructor(taskService: TaskService, sectionService: SectionService, projectService: ProjectService) {
        this.taskService = taskService;
        this.sectionService = sectionService;
        this.projectService = projectService;

        this.sidebarController = new SidebarController(this);
        this.sidebarController.setupEventListeners();

        this.projectController = new ProjectController(this);

        this.sectionController = new SectionController(this);

        this.taskController = new TaskController(this);
    }

    renderSidebarProjects(): void {
        const projects: Array<Project> = this.projectService.getAllProjects();

        const inboxBtn = document.querySelector("#sidebar-inbox-btn");
        inboxBtn.setAttribute("data-project-id", projects[0].id);

        for(let i = 1; i < projects.length; i++)
            this.sidebarController.renderSidebarProject(projects[i], i.toString());
    }

    renderInboxProject(): void {
        this.projectController.resetProjectContainer(); 
        
        const inboxBtn: HTMLButtonElement = document.querySelector("#sidebar-inbox-btn");
        const inboxProject: Project = this.projectService.getProject(inboxBtn.dataset.projectId);
        this.projectController.renderInboxProjectContainer(inboxProject);
    }

    renderMyProjects(): void {
        this.projectController.resetProjectContainer();
        this.projectController.renderMyProjects();
    }

    renderUserProject(project: Project): void {
        this.projectController.resetProjectContainer();
        this.projectController.renderUserProject(project);

        this.sectionController.renderProjectSections(project);

        const projectSections: Array<Section> = project.children.filter((childElement) => childElement instanceof Section);

        for(let section of projectSections)
            this.taskController.renderSectionTasks(section);
    }
}
