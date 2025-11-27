import { Section } from "./Section";
import { Task } from "./Task";

export class Project {
    private _id: string;
    private _name: string;
    private _children: Array<Section|Task>;

    constructor(id: string, name: string, children: Array<Section|Task>) {
        this._id = id;
        this._name = name;
        this._children = children;
    }

    get id(): string { return this._id; }

    get name(): string { return this._name; }

    set name(newName: string) { this._name = newName; }

    get children(): Array<Section|Task> { return this._children };
}
