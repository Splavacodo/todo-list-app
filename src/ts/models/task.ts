export class Task {
    private _id: string;
    private _name: string;
    private _description: string;
    private _dueDate: Date;
    private _priority: number;
    private _notes: string;
    private _parentId: string;

    constructor(id: string, name: string, description: string, dueDate: Date, priority: number, notes: string, parentId: string) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
        this._parentId = parentId;
    }

    get id(): string { return this._id; }

    get name(): string { return this._name; }

    set name(newName: string) { this._name = newName; }

    get description(): string { return this._description; }

    set description(newDescription: string) { this._description = newDescription; }

    get dueDate(): Date { return this._dueDate; }

    set dueDate(newDueDate: Date) { this._dueDate = newDueDate; }

    get priority(): number { return this._priority; }

    set priority(newPriority: number) { this._priority = newPriority; }

    get notes(): string { return this._notes; }

    set notes(newNotes: string) { this._notes = newNotes; }

    get parentId(): string { return this._parentId; }

    set parentId(newParentId: string) { this._parentId = newParentId; }
}
