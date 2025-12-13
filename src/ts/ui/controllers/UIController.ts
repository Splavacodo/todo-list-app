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

        this.sidebarController = new SidebarController(this);
        this.sidebarController.setupEventListeners();

        this.projectController = new ProjectController(this);

        this.sectionController = new SectionController(this);

        this.taskController = new TaskController(this);
    }

    renderSidebarProjects(): void {
        const projects: Array<Project> = this.projectService.getAllProjects();

        const inboxBtn = document.querySelector("#sidebar-inbox-btn");
        inboxBtn.setAttribute("data-project-id", projects[0].id);

        for(let i = 1; i < projects.length; i++)
            this.sidebarController.renderSidebarProject(projects[i], i.toString());
    }

    renderInboxProject(): void {
        this.projectController.resetProjectContainer(); 
        
        const inboxBtn: HTMLButtonElement = document.querySelector("#sidebar-inbox-btn");
        const inboxProject: Project = this.projectService.getProject(inboxBtn.dataset.projectId);
        this.projectController.renderInboxProjectContainer(inboxProject);
    }

    renderMyProjects(): void {
        this.projectController.resetProjectContainer();
        this.projectController.renderMyProjects();
    }

    renderUserProject(project: Project): void {
        this.projectController.resetProjectContainer();
        this.projectController.renderUserProject(project);

        this.sectionController.renderProjectSections(project);

        const projectSections: Array<Section> = project.children.filter((childElement) => childElement instanceof Section);

        for(let section of projectSections)
            this.taskController.renderSectionTasks(section);

        const projectTasks: Array<Task> = project.children.filter((childElement) => childElement instanceof Task);

        for(let task of projectTasks)
            this.taskController.renderProjectTask(task);
    }

    renderTaskPlacementOptions() {
        const projects: Array<Project> = this.projectService.getAllProjects();
        const taskPlacementSelection: HTMLSelectElement = document.querySelector("#task-placement-selection");

        for(const project of projects) {
            const projectOption: HTMLOptionElement = document.createElement("option");
            projectOption.textContent = project.title;
            projectOption.value = project.id;

            taskPlacementSelection.appendChild(projectOption);

            const projectSections: Array<Section> = project.children.filter((childElement) => childElement instanceof Section);

            for(const section of projectSections) {
                const sectionOption: HTMLOptionElement = document.createElement("option");
                sectionOption.textContent = "/ " + section.title;
                sectionOption.value = section.id;

                taskPlacementSelection.appendChild(sectionOption);
            }
        }
    }

    setupEventListeners() {
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

            (document.querySelector(".add-task-form") as HTMLFormElement).reset();

            taskDescription.value = "";
            dueDateText.textContent = "Date";
            priorityBtnText.textContent = "Priority";
            priorityBtn.setAttribute("task-priority", "4");
            addTaskBtn.toggleAttribute("disabled"); 

            (document.querySelector("#add-task-dialog") as HTMLDialogElement).close();
        });
    }
}
