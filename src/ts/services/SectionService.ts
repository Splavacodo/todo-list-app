import { Section } from "../models/Section";
import { Task } from "../models/Task";

import { StorageManager } from "../storage/StorageManager";

import { TaskService } from "../services/TaskService";

export class SectionService {
    private sections: Record<string, Section>;
    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.sections = {};
        this.taskService = taskService;
    }

    addSectionsFromJson(sectionsJson: string): void {
        for(let sectionObj of JSON.parse(sectionsJson))
            this.addSection(sectionObj);
    }

    private addSection(section: Record<string, any>): void {
        const sectionId: string = section["id"];
        const sectionTitle: string = section["title"];
        const sectionTaskIds: Array<string> = section["taskIds"];
        const parentId: string = section["parentId"];
        const sectionTasks: Array<Task> = this.getTaskModels(sectionTaskIds);

        this.sections[sectionId] = new Section(sectionId, sectionTitle, sectionTasks, parentId);
    }

    private getTaskModels(sectionTaskIds: Array<string>): Array<Task> {
        const tasks: Array<Task> = [];

        for(let taskId of sectionTaskIds)
            tasks.push(this.taskService.getTask(taskId));

        return tasks;
    }

    containsId(id: string): boolean { return id in this.sections; }

    getSection(sectionId: string): Section { return this.sections[sectionId]; }

    deleteSection(sectionId: string): void { delete this.sections[sectionId]; }

    addTaskToSection(sectionId: string, taskTitle: string, taskDescription: string, taskDueDate: string, taskPriority: number) {
        const section: Section = this.sections[sectionId];
        const newTask: Task = new Task(crypto.randomUUID(), taskTitle, taskDescription, taskDueDate, taskPriority, "", sectionId);

        section.tasks.push(newTask);
    }
}
