import { UIController } from "./UIController";
import { Section } from "../../models/Section";
import { Project } from "../../models/Project";
import { SectionView } from "../components/SectionView";
import { ProjectService } from "../../services/ProjectService";

export class SectionController {
    private uiController: UIController; 
    private projectService: ProjectService;

    constructor(uiController: UIController, projectService: ProjectService) {
        this.uiController = uiController;
        this.projectService = projectService;
    }

    renderProjectSections(project: Project) {
        const projectSections: Array<Section> = this.projectService.getProjectSections(project);
        
        for(let section of projectSections)
            SectionView.renderSection(section);
    }
}
