import { UIController } from "./UIController";
import { ProjectView } from "../components/ProjectView";
import { Project } from "../../models/Project";
import { Section } from "../../models/Section"; 
import { ProjectService } from "../../services/ProjectService";
import { SectionService } from "../../services/SectionService";

export class ProjectController {
    private uiController: UIController;
    private projectService: ProjectService;
    private sectionService: SectionService;

    constructor(uiController: UIController, projectService: ProjectService, sectionService: SectionService) {
        this.uiController = uiController;
        this.projectService = projectService;
        this.sectionService = sectionService;
    }

    renderMyProjects(): void {
        ProjectView.renderMyProjects();
    }

    renderProject(project: Project): void {
        ProjectView.renderProject(project);
    }

    resetProjectContainer(): void {
        ProjectView.resetProjectView();
    }

    setupMainAddTaskFormEventListeners() {
        const taskDescription: HTMLTextAreaElement = document.querySelector('#task-description');
        const MAX_ROWS = 10;

        taskDescription.addEventListener('input', () => {
            const lines = taskDescription.value.split('\n');
            
            if (lines.length > MAX_ROWS) {
                taskDescription.value = lines.slice(0, MAX_ROWS).join('\n');
                taskDescription.setSelectionRange(taskDescription.value.length, taskDescription.value.length);
            }

            const numRows = Math.min(lines.length, MAX_ROWS);
            taskDescription.rows = Math.max(1, numRows);
        });

        const dueDateInput: HTMLInputElement = document.querySelector("#task-due-date");
        const dueDateButton: HTMLButtonElement = document.querySelector(".task-due-date-btn");
        const dueDateText: HTMLDivElement = document.querySelector(".task-due-date-text");

        dueDateButton.addEventListener("click", (event) => {
            dueDateInput.showPicker();
            event.preventDefault();
        });

        const today = new Date();

        const month = (today.getMonth() < 10) ? "0" + today.getMonth() + 1 : today.getMonth() + 1;
        const day = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();

        dueDateInput.min = today.getFullYear() + "-" + month + "-" + day;
        dueDateInput.max = (today.getFullYear() + 1) + "-" + month + "-" + day;

        dueDateInput.addEventListener("change", () => {
            if (dueDateInput.value === "") {
                dueDateText.textContent = "Date";
            }
            else {
                const selectedDate: Array<string> = dueDateInput.value.split("-");
                let selectedMonth: string = selectedDate[1];
                const selectedDay: string = selectedDate[2];

                switch (selectedMonth) {
                    case "01":
                        selectedMonth = "Jan";
                        break;
                    case "02":
                        selectedMonth = "Feb";
                        break;
                    case "03":
                        selectedMonth = "Mar";
                        break;
                    case "04":
                        selectedMonth = "Apr"; 
                        break;
                    case "05":
                        selectedMonth = "May";
                        break;
                    case "06":
                        selectedMonth = "Jun";
                        break;
                    case "07":
                        selectedMonth = "Jul";
                        break;
                    case "08":
                        selectedMonth = "Aug";
                        break;
                    case "09":
                        selectedMonth = "Sep";
                        break;
                    case "10":
                        selectedMonth = "Oct";
                        break;
                    case "11":
                        selectedMonth = "Nov";
                        break;
                    case "12":
                        selectedMonth = "Dec";
                        break;
                }

                dueDateText.textContent = selectedMonth + " " + selectedDay;
            }
        });

        const priorityBtn: HTMLButtonElement = document.querySelector(".task-priority-btn");
        const prioritySelection: HTMLSelectElement = document.querySelector("#main-task-priority-selection");
        const priorityBtnText: HTMLDivElement = document.querySelector(".task-priority-text");

        priorityBtn.addEventListener("click", (event) => {
            event.preventDefault();
            prioritySelection.showPicker();
        }); 

        prioritySelection.addEventListener("change", () => {
            const selection: string = prioritySelection.options[prioritySelection.selectedIndex].text;

            priorityBtnText.textContent = selection;
            priorityBtn.setAttribute("task-priority", String(prioritySelection.selectedIndex + 1));
        });

        const taskTitle: HTMLInputElement = document.querySelector("#main-task-name");
        const addTaskBtn: HTMLButtonElement = document.querySelector(".dialog-add-task-btn");

        taskTitle.addEventListener("input", () => {
            (taskTitle.value === "") ? addTaskBtn.toggleAttribute("disabled") : addTaskBtn.removeAttribute("disabled");
        });

        const taskPlacementBtn: HTMLButtonElement = document.querySelector(".task-placement-btn");
        const taskPlacementSelection: HTMLSelectElement = document.querySelector("#task-placement-selection");
        const taskPlacementBtnText: HTMLButtonElement = document.querySelector(".task-placement-text");

        taskPlacementBtn.addEventListener("click", (event) => {
            event.preventDefault();
            taskPlacementSelection.showPicker();
        });


        taskPlacementSelection.addEventListener("change", () => {
            taskPlacementBtnText.textContent = taskPlacementSelection.options[taskPlacementSelection.selectedIndex].textContent;
        });

        let selectedProjectId: string = (document.querySelector(".selected-project") as HTMLElement).dataset["projectId"];
        let selectedProject: Project = this.projectService.getProject(selectedProjectId);

        for(let child of Array.from(document.querySelector("#task-placement-selection").children)) {
            if (child.hasAttribute("selected")) {
                child.toggleAttribute("selected");
                break;
            }
        }

        const mainAddTaskForm: HTMLFormElement = document.querySelector(".main-add-task-form");
        const formParentId: string = mainAddTaskForm.dataset["parentId"];

        if (this.sectionService.containsId(formParentId)) {
            const parentSection: Section = this.sectionService.getSection(formParentId);

            taskPlacementBtnText.textContent = selectedProject.title + " / " + parentSection.title;
        }
        else
            taskPlacementBtnText.textContent = selectedProject.title;

        document.querySelector(`option[value="${formParentId}"]`).setAttribute("selected", "");

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");

        addTaskBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const selectedTaskPlacementId: string = taskPlacementSelection.options[taskPlacementSelection.selectedIndex].value;
            selectedProjectId = (document.querySelector(".selected-project") as HTMLElement).dataset["projectId"];
            selectedProject = this.projectService.getProject(selectedProjectId);

            if (this.sectionService.containsId(selectedTaskPlacementId)) {
                this.sectionService.addTaskToSection(selectedTaskPlacementId, taskTitle.value, taskDescription.value, dueDateInput.value, prioritySelection.selectedIndex + 1);

                const parentSection: Section = this.sectionService.getSection(selectedTaskPlacementId);

                if (parentSection.parentId === selectedProjectId && selectedProject.title === "Inbox")
                    this.uiController.renderInboxProject();
                else if (parentSection.parentId === selectedProjectId)
                    this.uiController.renderProject(selectedProject);
                else
                    projectContainer.replaceChild(this.getAddTaskButton(mainAddTaskForm.dataset["parentId"]), mainAddTaskForm);
            }
            else {
                this.projectService.addTaskToProject(selectedTaskPlacementId, taskTitle.value, taskDescription.value, dueDateInput.value, prioritySelection.selectedIndex + 1);

                if (selectedTaskPlacementId === selectedProjectId && selectedProject.title === "Inbox")
                    this.uiController.renderInboxProject();
                else if (selectedTaskPlacementId === selectedProjectId)
                    this.uiController.renderProject(selectedProject);
                else
                    projectContainer.replaceChild(this.getAddTaskButton(mainAddTaskForm.dataset["parentId"]), mainAddTaskForm);
            }
        });

        const cancelTaskBtn: HTMLButtonElement = document.querySelector(".cancel-task-btn");

        cancelTaskBtn.addEventListener("click", (event) => {
            event.preventDefault();

            projectContainer.replaceChild(this.getAddTaskButton(formParentId), mainAddTaskForm); 
        });
    }

    setupAddSectionFormEventListeners() {
        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        const addSectionForm: HTMLFormElement = document.querySelector(".add-section-form");
        const addSectionBtn: HTMLButtonElement = document.querySelector(".add-section-btn");

        addSectionBtn.addEventListener("click", (event) => {
            event.preventDefault();

            // const selectedProjectId = (document.querySelector(".selected-project") as HTMLElement).dataset["projectId"];
        });

        const cancelSectionBtn: HTMLButtonElement = document.querySelector(".cancel-section-btn");

        cancelSectionBtn.addEventListener("click", (event) => {
            event.preventDefault();

            projectContainer.replaceChild(this.getAddSectionDiv(addSectionForm.dataset["parentId"]), addSectionForm);
        });
    }

    getAddTaskForm(parentId: string): HTMLFormElement {
        return ProjectView.getAddTaskForm(parentId);
    }

    getAddTaskButton(parentId: string): HTMLButtonElement {
        return ProjectView.getAddTaskButton(parentId);
    }

    getAddSectionForm(parentId: string): HTMLFormElement {
        return ProjectView.getAddSectionForm(parentId);
    }

    getAddSectionDiv(parentId: string): HTMLDivElement {
        return ProjectView.getAddSectionDiv(parentId);
    }
}
