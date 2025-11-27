import { Task } from "../models/task"; 
import { StorageManager } from "../storage/storageManager";

export class TaskService {
    private _tasks: Record<string, Task>;
    private _storageManager: StorageManager;

    constructor(storageManager: StorageManager) {
        this._tasks = {};
        this._storageManager = StorageManager;
    }

    addTaskFromJson(taskJson: string): void {
        let task: Task = JSON.parse(taskJson);

        this._tasks[task.id] = task;
    }

    getTask(taskId: string): Task { return this._tasks[taskId]; }

    deleteTask(taskId: string): void { delete this._tasks[taskId]; }

    // Will be extending this class for more functionality later
}
