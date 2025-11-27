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
        let task: Task = JSON.parse(taskJson);

        this.tasks[task.id] = task;
    }

    containsId(id: string): boolean { return id in this.tasks; }

    getTask(taskId: string): Task { return this.tasks[taskId]; }

    deleteTask(taskId: string): void { delete this.tasks[taskId]; }

    // Will be extending this class for more functionality later
}
