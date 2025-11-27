import { Task } from "./Task";

export class Section {
    private _id: string;
    private _title: string;
    private _tasks: Array<Task>;
    private _parentId: string;

    constructor(id: string, title: string, tasks: Array<Task>, parentId: string) { 
        this._id = id;
        this._title = title;
        this._tasks = tasks;
        this._parentId = parentId;
    }

    get id(): string { return this._id; }

    get title(): string { return this._title; }

    set title(newTitle: string) { this._title = newTitle; }

    get tasks(): Array<Task> { return this._tasks; }

    get parentId(): string { return this._parentId; }

    set parentId(newParentId: string) { this._parentId = newParentId; }
}
