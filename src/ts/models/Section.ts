import { Task } from "./Task";

export class Section {
    private _id: string;
    private _name: string;
    private _tasks: Array<Task>;
    private _parentId: string;

    constructor(id: string, name: string, tasks: Array<Task>, parentId: string) { 
        this._id = id;
        this._name = name;
        this._tasks = tasks;
        this._parentId = parentId;
    }

    get id(): string { return this._id; }

    get name(): string { return this._name; }

    set name(newName: string) { this._name = newName; }

    get tasks(): Array<Task> { return this._tasks; }

    get parentId(): string { return this._parentId; }

    set parentId(newParentId: string) { this._parentId = newParentId; }
}
