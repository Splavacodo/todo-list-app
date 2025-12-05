import { UIController } from "./UIController";
import { Section } from "../../models/Section";
import { Project } from "../../models/Project";
import { SectionView } from "../components/SectionView";

export class SectionController {
    private uiController: UIController; 

    constructor(uiController: UIController) {
        this.uiController = uiController;
    }

    renderProjectSections(project: Project) {
        const projectSections: Array<Section> = project.children.filter((childElement) => childElement instanceof Section);
        
        for(let section of projectSections)
            SectionView.renderSection(section);
    }
}
