export class Task {
    private _id: string;
    private _title: string;
    private _description: string;
    private _dueDate: string;
    private _priority: number;
    private _notes: string;
    private _parentId: string;

    constructor(id: string, title: string, description: string, dueDate: string, priority: number, notes: string, parentId: string) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
        this._parentId = parentId;
    }

    get id(): string { return this._id; }

    get title(): string { return this._title; }

    set title(newTitle: string) { this._title = newTitle; }

    get description(): string { return this._description; }

    set description(newDescription: string) { this._description = newDescription; }

    get dueDate(): string { return this._dueDate; }

    set dueDate(newDueDate: string) { this._dueDate = newDueDate; }

    get priority(): number { return this._priority; }

    set priority(newPriority: number) { this._priority = newPriority; }

    get notes(): string { return this._notes; }

    set notes(newNotes: string) { this._notes = newNotes; }

    get parentId(): string { return this._parentId; }

    set parentId(newParentId: string) { this._parentId = newParentId; }
}
