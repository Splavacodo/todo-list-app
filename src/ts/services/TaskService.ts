import { Task } from "../models/Task"; 
import { StorageManager } from "../storage/StorageManager";

export class TaskService {
    private tasks: Record<string, Task>;

    constructor() {
        this.tasks = {};
    }

    addTasksFromJson(tasksJson: string): void {
        for(let taskObj of JSON.parse(tasksJson))
            this.addTask(taskObj);
    }

    addTask(task: Record<string, any>): void;
    addTask(task: Task): void {
        if (task instanceof Task) 
            this.tasks[task.id] = task;
        else {
            const taskId: string = task["_id"];
            const taskTitle: string = task["_title"];
            const taskDescription: string = task["_description"];
            const taskDueDate: string = task["_dueDate"];
            const taskPriority: number = task["_priority"]; 
            const taskNotes: string = task["_notes"];
            const parentId: string = task["_parentId"];

            this.tasks[taskId] = new Task(taskId, taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes, parentId);
        }
    }

    containsId(id: string): boolean { return id in this.tasks; }

    getTask(taskId: string): Task { return this.tasks[taskId]; }

    deleteTask(taskId: string): void { delete this.tasks[taskId]; }

    // Will be extending this class for more functionality later
}
