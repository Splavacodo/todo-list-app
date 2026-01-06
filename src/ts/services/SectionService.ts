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

    addSection(section: Record<string, any>): void;
    addSection(section: Section): void {
        if (section instanceof Section) {
            this.sections[section.id] = section;
        }
        else {
            const sectionId: string = section["id"];
            const sectionTitle: string = section["title"];
            const sectionTaskIds: Array<string> = section["taskIds"];
            const parentId: string = section["parentId"];
            const sectionTasks: Array<Task> = this.getTaskModels(sectionTaskIds);

            this.sections[sectionId] = new Section(sectionId, sectionTitle, sectionTasks, parentId);
        }
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

    addTaskToSection(sectionId: string, taskTitle: string, taskDescription: string, taskDueDate: string, taskPriority: number): void {
        const section: Section = this.sections[sectionId];
        const newTask: Task = new Task(crypto.randomUUID(), taskTitle, taskDescription, taskDueDate, taskPriority, "", sectionId);

        section.tasks.push(newTask);
        this.taskService.addTask(newTask);

        StorageManager.writeTaskToStorage(newTask);
        StorageManager.writeTaskIdToSection(sectionId, newTask.id);
    }

    addTaskModelToSection(sectionId: string, task: Task): void { 
        this.sections[sectionId].tasks.push(task); 
        task.parentId = sectionId;
    }

    moveTaskToSection(sourceSectionId: string, destinationSectionId: string, taskId: string): void {
        const sourceSection: Section = this.sections[sourceSectionId];
        const destinationSection: Section = this.sections[destinationSectionId];
        const taskToMove: Task = this.taskService.getTask(taskId);
        
        sourceSection.tasks.splice(sourceSection.tasks.indexOf(taskToMove), 1);
        destinationSection.tasks.push(taskToMove);

        taskToMove.parentId = destinationSectionId;
    }

    deleteTaskFromSection(sectionId: string, taskToRemove: Task): void { 
        const parentSection = this.sections[sectionId];

        if (parentSection.tasks.includes(taskToRemove))
            parentSection.tasks.splice(parentSection.tasks.indexOf(taskToRemove), 1);
    }

    updateLocalStorageSection(modifiedSection: Section) {
        StorageManager.updateSection(modifiedSection);
    }
}
