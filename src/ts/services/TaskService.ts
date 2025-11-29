import { Task } from "../models/Task"; 
import { StorageManager } from "../storage/StorageManager";

export class TaskService {
    private tasks: Record<string, Task>;

    constructor() {
        this.tasks = {};
    }

    addTasksFromJson(tasksJson: string) {
        for(let taskObj of JSON.parse(tasksJson))
            this.addTaskFromJson(taskObj);
    }

    private addTaskFromJson(task: Record<string, any>): void {
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
