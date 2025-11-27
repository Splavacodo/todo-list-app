import { Section } from "../models/Section";
import { Task } from "../models/Task";

import { StorageManager } from "../storage/StorageManager";

import { TaskService } from "../services/TaskService";

export class SectionService {
    private sections: Record<string, Section>;
    private storageManager: StorageManager;
    private taskService: TaskService;

    constructor(taskService: TaskService, storageManager: StorageManager) {
        this.sections = {};
        this.storageManager = storageManager;
        this.taskService = taskService;
    }

    addSectionFromJson(sectionJson: string): void {
        const section: Record<string, any> = JSON.parse(sectionJson);

        const sectionId: string = section["id"];
        const sectionName: string = section["name"];
        const sectionTaskIds: Array<string> = section["taskIds"];
        const parentId: string = section["parentId"];
        const sectionTasks: Array<Task> = this.getTaskModels(sectionTaskIds);

        this.sections[sectionId] = new Section(sectionId, sectionName, sectionTasks, parentId);
    }

    private getTaskModels(sectionTaskIds: Array<string>): Array<Task> {
        const tasks: Array<Task> = [];

        for(let taskId of sectionTaskIds)
            tasks.push(this.taskService.getTask(taskId));

        return tasks;
    }

    getSection(sectionId: string): Section { return this.sections[sectionId]; }

    deleteSection(sectionId: string): void { delete this.sections[sectionId]; }

    // Will be extending this class for more functionality later
}
