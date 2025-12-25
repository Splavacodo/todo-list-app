import { ProjectService } from "../../services/ProjectService";
import { SectionService } from "../../services/SectionService";
import { TaskService } from "../../services/TaskService";

import { SidebarController } from "./SidebarController";
import { ProjectController } from "./ProjectController";
import { SectionController } from "./SectionController";
import { TaskController } from "./TaskController";

import { Project } from "../../models/Project";
import { Section } from "../../models/Section";
import { Task } from "../../models/Task";

export class UIController {
    private taskService: TaskService;
    private sectionService: SectionService;
    private projectService: ProjectService;
    private sidebarController: SidebarController;
    private projectController: ProjectController;
    private sectionController: SectionController;
    private taskController: TaskController;

    constructor(taskService: TaskService, sectionService: SectionService, projectService: ProjectService) {
        this.taskService = taskService;
        this.sectionService = sectionService;
        this.projectService = projectService;

        this.sidebarController = new SidebarController(this, this.projectService);
        this.sidebarController.setupEventListeners();

        this.projectController = new ProjectController(this, projectService, sectionService);

        this.sectionController = new SectionController(this, projectService);

        this.taskController = new TaskController(this);
    }

    renderSidebarProjects(): void {
        const projects: Array<Project> = this.projectService.getAllProjects();

        const inboxBtn = document.querySelector("#sidebar-inbox-btn");
        inboxBtn.setAttribute("data-project-id", projects[0].id);

        const projectsList: HTMLUListElement = document.querySelector(".projects-list");
        projectsList.replaceChildren();

        for(let i = 1; i < projects.length; i++)
            this.sidebarController.renderSidebarProject(projects[i], i.toString());
    }

    renderInboxProject(): void {
        const inboxBtn: HTMLButtonElement = document.querySelector("#sidebar-inbox-btn");
        const inboxProject: Project = this.projectService.getProject(inboxBtn.dataset.projectId);

        this.renderProject(inboxProject);
    }

    renderMyProjects(): void {
        this.projectController.resetProjectContainer();
        this.projectController.renderMyProjects();
        this.projectController.setupMyProjectsPageEventListeners();
    }

    renderProject(project: Project): void {
        this.projectController.resetProjectContainer();
        this.projectController.renderProject(project);

        this.sectionController.renderProjectSections(project);

        const projectSections: Array<Section> = this.projectService.getProjectSections(project);

        for(let section of projectSections)
            this.taskController.renderSectionTasks(section);

        const projectTasks: Array<Task> = this.projectService.getProjectLevelTasks(project);

        for(let task of projectTasks)
            this.taskController.renderProjectTask(task);
    }

    renderTaskPlacementOptions() {
        const projects: Array<Project> = this.projectService.getAllProjects();
        const taskPlacementSelection: HTMLSelectElement = document.querySelector("#task-placement-selection");
        
        taskPlacementSelection.replaceChildren();

        for(const project of projects) {
            const projectOption: HTMLOptionElement = document.createElement("option");
            projectOption.textContent = project.title;
            projectOption.value = project.id;

            taskPlacementSelection.appendChild(projectOption);

            const projectSections: Array<Section> = this.projectService.getProjectSections(project);

            for(const section of projectSections) {
                const sectionOption: HTMLOptionElement = document.createElement("option");
                sectionOption.textContent = project.title + " / " + section.title;
                sectionOption.value = section.id;

                taskPlacementSelection.appendChild(sectionOption);
            }
        }
    }

    setupEventListeners() {
        this.setupAddTaskDialogEventListerners();
        this.setupAddProjectDialogEventListeners();
        this.setupRenameProjectEventListeners();
    }

    private setupAddTaskDialogEventListerners() {
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
        const prioritySelection: HTMLSelectElement = document.querySelector("#task-priority-selection");
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

        const taskTitle: HTMLInputElement = document.querySelector("#task-name");
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

        addTaskBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const selectedTaskPlacementId: string = taskPlacementSelection.options[taskPlacementSelection.selectedIndex].value;
            const selectedProjectId: string = (document.querySelector(".selected-project") as HTMLElement).dataset["projectId"];
            const selectedProject: Project = this.projectService.getProject(selectedProjectId);

            if (this.sectionService.containsId(selectedTaskPlacementId)) {
                this.sectionService.addTaskToSection(selectedTaskPlacementId, taskTitle.value, taskDescription.value, dueDateInput.value, prioritySelection.selectedIndex + 1);

                const parentSection: Section = this.sectionService.getSection(selectedTaskPlacementId);

                if (parentSection.parentId === selectedProjectId && selectedProject.title === "Inbox")
                    this.renderInboxProject();
                else if (parentSection.parentId === selectedProjectId)
                    this.renderProject(selectedProject);
            }
            else {
                this.projectService.addTaskToProject(selectedTaskPlacementId, taskTitle.value, taskDescription.value, dueDateInput.value, prioritySelection.selectedIndex + 1);

                if (selectedTaskPlacementId === selectedProjectId && selectedProject.title === "Inbox")
                    this.renderInboxProject();
                else if (selectedTaskPlacementId === selectedProjectId)
                    this.renderProject(selectedProject);
            }

            (document.querySelector(".add-task-form") as HTMLFormElement).reset();

            taskDescription.value = "";
            dueDateText.textContent = "Date";
            priorityBtnText.textContent = "Priority";
            priorityBtn.setAttribute("task-priority", "4");
            addTaskBtn.toggleAttribute("disabled"); 

            (document.querySelector("#add-task-dialog") as HTMLDialogElement).close();
        });
    }

    private setupAddProjectDialogEventListeners() {
        const projectTitle: HTMLInputElement = document.querySelector("#project-name");
        const addProjectBtn: HTMLButtonElement = document.querySelector(".dialog-add-project-btn");

        projectTitle.addEventListener("input", () => {
            (projectTitle.value === "") ? addProjectBtn.toggleAttribute("disabled") : addProjectBtn.removeAttribute("disabled");
        });

        addProjectBtn.addEventListener("click", (event) => {
            event.preventDefault();

            this.projectService.addNewProject(projectTitle.value);

            addProjectBtn.toggleAttribute("disabled");
            (document.querySelector(".add-project-form") as HTMLFormElement).reset();
            (document.querySelector("#add-project-dialog") as HTMLDialogElement).close();

            this.renderProjectUpdates();
        })
    }

    private setupRenameProjectEventListeners() {
        const newProjectNameInput: HTMLInputElement = document.querySelector("#new-project-name");
        const renameProjectBtn: HTMLButtonElement = document.querySelector(".dialog-rename-project-btn");

        newProjectNameInput.addEventListener("input", () => {
            (newProjectNameInput.value === "") ? renameProjectBtn.toggleAttribute("disabled") : renameProjectBtn.removeAttribute("disabled");
        });

        renameProjectBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const renameProjectDialog: HTMLDialogElement = document.querySelector("#rename-project-dialog");
            const projectId: string = renameProjectDialog.dataset["projectId"];
            const projectToRename = this.projectService.getProject(projectId);
            
            projectToRename.title = newProjectNameInput.value; 

            this.renderProjectUpdates();

            (document.querySelector("#rename-project-dialog") as HTMLDialogElement).close();
        });
    }

    renderProjectUpdates() {
        this.renderSidebarProjects();
        this.renderTaskPlacementOptions();

        const selectedProject: HTMLElement = document.querySelector(".selected-project");

        if (selectedProject && selectedProject.classList.contains("projects-header")) {
            this.renderMyProjects();
        }
        else {
            this.renderInboxProject();
        }
    }

    setupProjectContainerEventListeners() {
        const projectContainer: HTMLDivElement = document.querySelector(".project-container");

        projectContainer.addEventListener("click", (event) => {
            let eventTarget = event.target as HTMLElement;

            if (eventTarget.parentNode && (eventTarget.parentNode as HTMLElement).classList.contains("main-add-task-btn"))
                eventTarget = (eventTarget.parentNode as HTMLElement);  
            else if (eventTarget.parentNode && (eventTarget.parentNode as HTMLElement).classList.contains("add-section"))
                eventTarget = (eventTarget.parentNode as HTMLElement);

            const mainAddTaskForm: HTMLFormElement = document.querySelector(".main-add-task-form");
            const addSectionForm: HTMLFormElement = document.querySelector(".add-section-form");

            if (eventTarget.classList.contains("main-add-task-btn")) {
                if (mainAddTaskForm)
                    projectContainer.replaceChild(this.projectController.getAddTaskButton(mainAddTaskForm.dataset["parentId"]), mainAddTaskForm);
                else if (addSectionForm)
                    projectContainer.replaceChild(this.projectController.getAddSectionDiv(addSectionForm.dataset["parentId"]), addSectionForm);
        
                projectContainer.replaceChild(this.projectController.getAddTaskForm(eventTarget.dataset["parentId"]), eventTarget);
                this.renderTaskPlacementOptions();

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

                this.projectController.setupMainAddTaskFormEventListeners();
            }
            else if (eventTarget.classList.contains("add-section")) {
                if (mainAddTaskForm) {
                    projectContainer.replaceChild(this.projectController.getAddTaskButton(mainAddTaskForm.dataset["parentId"]), mainAddTaskForm);
                }
                else if (addSectionForm)
                    projectContainer.replaceChild(this.projectController.getAddSectionDiv(addSectionForm.dataset["parentId"]), addSectionForm);

                projectContainer.replaceChild(this.projectController.getAddSectionForm(eventTarget.dataset["parentId"]), eventTarget);
                
                this.projectController.setupAddSectionFormEventListeners();
            }
        });
    }
}
