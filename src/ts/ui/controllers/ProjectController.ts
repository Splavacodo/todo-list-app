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

    renderInboxProjectContainer(): void {
        const inboxBtn: HTMLButtonElement = document.querySelector("#sidebar-inbox-btn");
        const inboxProject: Project = this.projectService.getProject(inboxBtn.dataset.projectId);
        
        ProjectView.renderInboxProjectContainer(inboxProject);
    }

    renderMyProjects(): void {
        ProjectView.renderMyProjects();
    }

    renderUserProject(project: Project): void {
        ProjectView.renderProject(project);
    }

    resetProjectContainer(): void {
        ProjectView.resetProjectView();
    }

    setupAddTaskDivEventListeners() {
        const addTaskBtns: Array<Element> = Array.from(document.getElementsByClassName("main-add-task-btn"));
        const projectContainer: HTMLDivElement = document.querySelector(".project-container");

        addTaskBtns.forEach((addTaskBtn) => {
            addTaskBtn.addEventListener("click", () => {
                projectContainer.replaceChild(ProjectView.getAddTaskForm(), addTaskBtn);
                this.uiController.renderTaskPlacementOptions();

                const dueDateButton: HTMLButtonElement = document.querySelector(".task-due-date-btn");
                const dueDateInput: HTMLInputElement = document.querySelector("#task-due-date");

                dueDateInput.style.width = String(dueDateButton.offsetWidth) + "px";
                dueDateInput.style.height = String(dueDateButton.offsetHeight) + "px";

                const priorityBtn: HTMLButtonElement = document.querySelector(".task-priority-btn");
                const prioritySelection: HTMLSelectElement = document.querySelector("#main-task-priority-selection");

                prioritySelection.style.width = String(priorityBtn.offsetWidth) + "px";
                prioritySelection.style.height = String(priorityBtn.offsetHeight) + "px";

                const taskPlacementBtn: HTMLButtonElement = document.querySelector(".task-placement-btn");
                const taskPlacementSelection: HTMLSelectElement = document.querySelector("#task-placement-selection");

                taskPlacementSelection.style.width = String(taskPlacementBtn.offsetWidth) + "px";
                taskPlacementSelection.style.height = String(taskPlacementBtn.offsetHeight) + "px";

                this.setupMainAddTaskFormEventListeners();
            });
        });
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

        const selectedTaskPlacementId: string = taskPlacementSelection.options[taskPlacementSelection.selectedIndex].value;
        const selectedProjectId: string = (document.querySelector(".selected-project") as HTMLElement).dataset["projectId"];
        const selectedProject: Project = this.projectService.getProject(selectedProjectId);

        taskPlacementBtnText.textContent = selectedProject.title;

        for(let child of Array.from(document.querySelector("#task-placement-selection").children)) {
            if (child.hasAttribute("selected")) {
                child.toggleAttribute("selected");
                break;
            }
        }

        document.querySelector(`option[value="${selectedProject.id}"]`).setAttribute("selected", "");

        const mainAddTaskForm: HTMLFormElement = document.querySelector(".main-add-task-form");

        addTaskBtn.addEventListener("click", (event) => {
            event.preventDefault();

            if (this.sectionService.containsId(selectedTaskPlacementId)) {
                this.sectionService.addTaskToSection(selectedTaskPlacementId, taskTitle.value, taskDescription.value, dueDateInput.value, prioritySelection.selectedIndex + 1);

                const parentSection: Section = this.sectionService.getSection(selectedTaskPlacementId);

                if (parentSection.parentId === selectedProjectId && selectedProject.title === "Inbox")
                    this.uiController.renderInboxProject();
                else if (parentSection.parentId === selectedProjectId)
                    this.renderUserProject(selectedProject);
            }
            else {
                this.projectService.addTaskToProject(selectedTaskPlacementId, taskTitle.value, taskDescription.value, dueDateInput.value, prioritySelection.selectedIndex + 1);

                if (selectedTaskPlacementId === selectedProjectId && selectedProject.title === "Inbox")
                    this.uiController.renderInboxProject();
                else if (selectedTaskPlacementId === selectedProjectId)
                    this.renderUserProject(selectedProject);
            }

            taskDescription.value = "";
            dueDateText.textContent = "Date";
            priorityBtnText.textContent = "Priority";
            priorityBtn.setAttribute("task-priority", "4");
            addTaskBtn.toggleAttribute("disabled"); 
        });

        const cancelTaskBtn: HTMLButtonElement = document.querySelector(".cancel-task-btn");
        const projectContainer: HTMLDivElement = document.querySelector(".project-container");

        cancelTaskBtn.addEventListener("click", (event) => {
            event.preventDefault();

            projectContainer.replaceChild(ProjectView.getAddTaskButton(), mainAddTaskForm);
        });
    }

    getAddTaskForm(): HTMLFormElement {
        return ProjectView.getAddTaskForm();
    }

    getAddTaskButton(): HTMLButtonElement {
        return ProjectView.getAddTaskButton();
    }
}
