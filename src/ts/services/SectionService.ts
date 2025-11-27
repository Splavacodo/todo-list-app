import { Section } from "../models/Section";
import { StorageManager } from "../storage/StorageManager";

export class SectionService {
    private _sections: Record<string, Section>;
    private _storageManager: StorageManager;

    constructor(storageManager: StorageManager) {
        this._sections = {};
        this._storageManager = StorageManager;
    }

    addSectionFromJson(sectionJson: string): void {
        let section: Section = JSON.parse(sectionJson);

        this._sections[section.id] = section;
    }

    getTask(sectionId: string): Section { return this._sections[sectionId]; }

    deleteTask(sectionId: string): void { delete this._sections[sectionId]; }

    // Will be extending this class for more functionality later
}
