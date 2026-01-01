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

    addProjectsFromJson(projectsJson: string): void {
        for(let projectObj of JSON.parse(projectsJson))
            this.addProject(projectObj);
    }

    private addProject(project: Record<string, any>): void {
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

    addTaskToProject(projectId: string, taskTitle: string, taskDescription: string, taskDueDate: string, taskPriority: number): void {
        const project: Project = this.projects[projectId];
        const newTask = new Task(crypto.randomUUID(), taskTitle, taskDescription, taskDueDate, taskPriority, "", projectId);

        project.children.push(newTask);
        this.taskService.addTask(newTask);
    }

    addSectionToProject(projectId: string, sectionTitle: string, placementIdx: number): void {
        const project: Project = this.projects[projectId];
        const newSection = new Section(crypto.randomUUID(), sectionTitle, [], project.id);

        project.children.splice(placementIdx, 0, newSection);
        this.sectionService.addSection(newSection);
    }

    addNewProject(projectName: string): void {
        const newProjetId: string = crypto.randomUUID();

        this.projects[newProjetId] = new Project(newProjetId, projectName, []);
    }

    getProjectLevelTasks(project: Project) {
        return project.children.filter((childElement) => childElement instanceof Task);
    }

    getProjectSections(project: Project) {
        return project.children.filter((childElement) => childElement instanceof Section);
    }

    deleteChildFromProject(projectId: string, childId: string) {
        const parentProject: Project = this.projects[projectId];

        if (this.sectionService.containsId(childId))
            parentProject.children.splice(parentProject.children.indexOf(this.sectionService.getSection(childId)), 1);
        else
            parentProject.children.splice(parentProject.children.indexOf(this.taskService.getTask(childId)), 1);
    }

    moveChildToProject(sourceProjectId: string, destinationProjectId: string, childId: string) {
        this.deleteChildFromProject(sourceProjectId, childId);

        const destinationProject: Project = this.projects[destinationProjectId];

        if (this.sectionService.containsId(childId)) {
            const childSection: Section = this.sectionService.getSection(childId);

            destinationProject.children.push(this.sectionService.getSection(childId));
            childSection.parentId = destinationProjectId;
        }
    }
}
