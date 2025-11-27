import { Section } from "../models/Section";
import { StorageManager } from "../storage/StorageManager";

export class SectionService {
    private sections: Record<string, Section>;
    private storageManager: StorageManager;

    constructor(storageManager: StorageManager) {
        this.sections = {};
        this.storageManager = storageManager;
    }

    addSectionFromJson(sectionJson: string): void {
        let section: Section = JSON.parse(sectionJson);

        this.sections[section.id] = section;
    }

    getSection(sectionId: string): Section { return this.sections[sectionId]; }

    deleteSection(sectionId: string): void { delete this.sections[sectionId]; }

    // Will be extending this class for more functionality later
}
