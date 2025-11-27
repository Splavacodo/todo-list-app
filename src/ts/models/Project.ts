import { Section } from "./Section";
import { Task } from "./Task";

export class Project {
    private _id: string;
    private _title: string;
    private _children: Array<Section|Task>;

    constructor(id: string, title: string, children: Array<Section|Task>) {
        this._id = id;
        this._title = title;
        this._children = children;
    }

    get id(): string { return this._id; }

    get title(): string { return this._title; }

    set title(newTitle: string) { this._title = newTitle; }

    get children(): Array<Section|Task> { return this._children };
}
