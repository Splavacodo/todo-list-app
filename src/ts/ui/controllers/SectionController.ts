import { UIController } from "./UIController";
import { Section } from "../../models/Section";
import { Project } from "../../models/Project";
import { SectionView } from "../components/SectionView";
import { ProjectService } from "../../services/ProjectService";
import { SectionService } from "../../services/SectionService";

export class SectionController {
    private uiController: UIController; 
    private projectService: ProjectService;
    private sectionService: SectionService;

    constructor(uiController: UIController, projectService: ProjectService, sectionService: SectionService) {
        this.uiController = uiController;
        this.projectService = projectService;
        this.sectionService = sectionService;
    }

    renderProjectSections(project: Project) {
        const projectSections: Array<Section> = this.projectService.getProjectSections(project);
        
        for(let section of projectSections)
            SectionView.renderSection(section);

        const editSectionBtns: Array<HTMLButtonElement> = Array.from(document.querySelectorAll(".edit-section-btn"));
        const deleteSectionMenuOption: HTMLDivElement = document.querySelector(".delete-section-menu-option");

        editSectionBtns.forEach((editSectionBtn) => {
            editSectionBtn.addEventListener("click", (event) => {
                SectionView.renderProjectsInMoveToMenu(); 
                SectionView.placeEditSectionMenu(editSectionBtn);

                const parentSection: Section = this.sectionService.getSection(((editSectionBtn.parentNode) as HTMLElement).dataset["sectionId"]);

                (document.querySelector("#new-section-name") as HTMLInputElement).value = parentSection.title;
                (document.querySelector("#rename-section-dialog") as HTMLDialogElement).setAttribute("data-section-id", parentSection.id);
                deleteSectionMenuOption.setAttribute("data-section-id", parentSection.id);

                const renameSectionBtn: HTMLButtonElement = document.querySelector(".dialog-rename-section-btn");
            
                if (renameSectionBtn.hasAttribute("disabled"))
                    renameSectionBtn.toggleAttribute("disabled");

                event.stopPropagation();
            });
        });
    }

    placeMoveSectionToMenu(parentOption: HTMLDivElement) {
        SectionView.placeMoveSectionToMenu(parentOption);
    }
}
