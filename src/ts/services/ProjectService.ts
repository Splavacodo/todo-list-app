import { Project } from "../models/Project";
import { Section } from "../models/Section";
import { Task } from "../models/Task"; 

import { StorageManager } from "../storage/StorageManager";

import { SectionService } from "../services/SectionService";
import { TaskService } from "./TaskService";

export class ProjectService {
    private projects: Record<string, Project>;
    private sectionService: SectionService;
    private taskService: TaskService;

    constructor(taskService: TaskService, sectionService: SectionService) {
        this.projects = {};
        this.taskService = taskService;
        this.sectionService = sectionService;
    }

    addProjectsFromJson(projectsJson: Array<string>): void {
        for(let projectJson of projectsJson)
            this.addProjectFromJson(projectJson);
    }

    private addProjectFromJson(projectJson: string): void {
        const project: Record<string, any> = JSON.parse(projectJson);
        
        const projectId: string = project["id"];
        const projectTitle: string = project["title"];
        const projectChildrenIds: Array<string> = project["childrenIds"];
        const projectChildren: Array<Section|Task> = this.getChildrenModels(projectChildrenIds);

        this.projects[projectId] = new Project(projectId, projectTitle, projectChildren);
    }

    private getChildrenModels(childrenIds: Array<string>): Array<Section|Task> {
        const children = [];

        for(let childId of childrenIds) {
            if (this.taskService.containsId(childId))
                children.push(this.taskService.getTask(childId));
            else
                children.push(this.sectionService.getSection(childId));
        }

        return children;
    }

    getProject(projectId: string): Project { return this.projects[projectId]; }

    getAllProjects(): Array<Project> {
        return Object.values(this.projects);
    }

    deleteProject(projectId: string): void { delete this.projects[projectId]; }

    // Will be extending this class for more functionality later
}
