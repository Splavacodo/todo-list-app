import { Task } from "../models/Task"; 
import { StorageManager } from "../storage/StorageManager";

export class TaskService {
    private tasks: Record<string, Task>;
    private storageManager: StorageManager;

    constructor(storageManager: StorageManager) {
        this.tasks = {};
        this.storageManager = storageManager;
    }

    addTaskFromJson(taskJson: string): void {
        const task: Record<string, any> = JSON.parse(taskJson);

        const taskId: string = task["id"];
        const taskTitle: string = task["title"];
        const taskDescription: string = task["description"];
        const taskDueDate: Date = task["dueDate"];
        const taskPriority: number = task["priority"]; 
        const taskNotes: string = task["notes"];
        const parentId: string = task["parentId"];

        this.tasks[taskId] = new Task(taskId, taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes, parentId);
    }

    containsId(id: string): boolean { return id in this.tasks; }

    getTask(taskId: string): Task { return this.tasks[taskId]; }

    deleteTask(taskId: string): void { delete this.tasks[taskId]; }

    // Will be extending this class for more functionality later
}
