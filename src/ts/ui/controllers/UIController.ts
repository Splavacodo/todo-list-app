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
import { TaskView } from "../components/TaskView";

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

        this.projectController = new ProjectController(this, projectService, sectionService, taskService);

        this.sectionController = new SectionController(this, projectService, sectionService);

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
        this.setupRenameSectionEventListeners();
        this.setupEditMenuEventListeners();
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

    private setupRenameSectionEventListeners() {
        const newSectionNameInput: HTMLInputElement = document.querySelector("#new-section-name");
        const renameSectionBtn: HTMLButtonElement = document.querySelector(".dialog-rename-section-btn");

        newSectionNameInput.addEventListener("input", () => {
            (newSectionNameInput.value === "") ? renameSectionBtn.toggleAttribute("disabled") : renameSectionBtn.removeAttribute("disabled");
        });

        renameSectionBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const renameSectionDialog: HTMLDialogElement = document.querySelector("#rename-section-dialog");
            const sectionId: string = renameSectionDialog.dataset["sectionId"];
            const sectionToRename = this.sectionService.getSection(sectionId);
            
            sectionToRename.title = newSectionNameInput.value; 

            this.renderProjectUpdates();

            (document.querySelector("#rename-section-dialog") as HTMLDialogElement).close();
        });
    }

    renderProjectUpdates() {
        const selectedProject: HTMLElement = document.querySelector(".selected-project");
        const selectedProjectId: string = selectedProject.dataset["projectId"];

        this.renderSidebarProjects();
        this.renderTaskPlacementOptions();

        if (selectedProject.classList.contains("projects-header"))
            this.renderMyProjects();
        else if (this.projectService.getProject(selectedProjectId)) {
            this.renderProject(this.projectService.getProject(selectedProjectId));

            document.querySelector(`.selectable[data-project-id="${selectedProjectId}"]`).classList.add("selected-project");
        }
        else {
            document.querySelector("#sidebar-inbox-btn").classList.add("selected-project");

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
            else if (eventTarget.parentNode && (eventTarget.parentNode as HTMLElement).classList.contains("edit-task-btn"))
                eventTarget = (eventTarget.parentNode as HTMLElement);
            else if (eventTarget.parentNode && (eventTarget.parentNode as HTMLElement).classList.contains("task"))
                eventTarget = (eventTarget.parentNode as HTMLElement);
            else if (eventTarget.parentNode && (eventTarget.parentNode as HTMLElement).classList.contains("delete-task-btn"))
                eventTarget = (eventTarget.parentNode as HTMLElement);
            else if (eventTarget.parentNode && (eventTarget.parentNode as HTMLElement).classList.contains("task-checkbox"))
                eventTarget = (eventTarget.parentNode as HTMLElement);
            else if (eventTarget.parentNode.parentNode && (eventTarget.parentNode.parentNode as HTMLElement).classList.contains("task"))
                eventTarget = (eventTarget.parentNode.parentNode as HTMLElement);

            const mainAddTaskForm: HTMLFormElement = document.querySelector(".main-add-task-form");
            const addSectionForm: HTMLFormElement = document.querySelector(".add-section-form");
            const editTaskForm: HTMLFormElement = document.querySelector(".main-edit-task-form");

            if (eventTarget.classList.contains("main-add-task-btn")) {
                if (mainAddTaskForm)
                    projectContainer.replaceChild(this.projectController.getAddTaskButton(mainAddTaskForm.dataset["parentId"]), mainAddTaskForm);
                else if (addSectionForm)
                    projectContainer.replaceChild(this.projectController.getAddSectionDiv(addSectionForm.dataset["parentId"]), addSectionForm);
                else if(editTaskForm) {
                    const editTaskFormParentList: HTMLUListElement = (editTaskForm.parentNode as HTMLUListElement);
                    const taskEdited: Task = this.taskService.getTask(editTaskForm.dataset["parentId"]);
                    editTaskFormParentList.replaceChild(TaskView.createTaskContainer(taskEdited), editTaskForm);
                }
        
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
                else if(editTaskForm) {
                    const editTaskFormParentList: HTMLUListElement = (editTaskForm.parentNode as HTMLUListElement);
                    const taskEdited: Task = this.taskService.getTask(editTaskForm.dataset["parentId"]);
                    editTaskFormParentList.replaceChild(TaskView.createTaskContainer(taskEdited), editTaskForm);
                }

                projectContainer.replaceChild(this.projectController.getAddSectionForm(eventTarget.dataset["parentId"]), eventTarget);
                
                this.projectController.setupAddSectionFormEventListeners();
            }
            else if (eventTarget.classList.contains("edit-task-btn") || eventTarget.classList.contains("task")) {
                if (eventTarget.classList.contains("task"))
                    eventTarget = document.querySelector(`li[data-task-id="${eventTarget.dataset["taskId"]}"] > .edit-task-btn`);

                if (mainAddTaskForm) {
                    projectContainer.replaceChild(this.projectController.getAddTaskButton(mainAddTaskForm.dataset["parentId"]), mainAddTaskForm);
                }
                else if (addSectionForm)
                    projectContainer.replaceChild(this.projectController.getAddSectionDiv(addSectionForm.dataset["parentId"]), addSectionForm);
                else if(editTaskForm) {
                    const editTaskFormParentList: HTMLUListElement = (editTaskForm.parentNode as HTMLUListElement);
                    const taskEdited: Task = this.taskService.getTask(editTaskForm.dataset["parentId"]);
                    editTaskFormParentList.replaceChild(TaskView.createTaskContainer(taskEdited), editTaskForm);
                }

                const parentTaskElement: HTMLLIElement = (eventTarget.parentNode as HTMLLIElement);
                
                parentTaskElement.parentNode.replaceChild(this.projectController.getEditTaskForm(parentTaskElement.dataset["taskId"]), parentTaskElement);
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

                this.projectController.setupEditTaskFormEventListeners();

                const replacedTask: Task = this.taskService.getTask(parentTaskElement.dataset["taskId"]);

                const taskTitle: HTMLInputElement = document.querySelector("#main-task-name");
                const taskDescription: HTMLTextAreaElement = document.querySelector('#task-description');
                const priorityBtnText: HTMLDivElement = document.querySelector(".task-priority-text");
                const dueDateText: HTMLDivElement = document.querySelector(".task-due-date-text");

                taskTitle.value = replacedTask.title;
                taskDescription.value = replacedTask.description;
                dueDateInput.value = replacedTask.dueDate;
                prioritySelection.options[replacedTask.priority - 1].selected = true;
                priorityBtnText.textContent = prioritySelection.options[prioritySelection.selectedIndex].text;
                
                document.querySelector(".form-edit-task-btn").removeAttribute("disabled");

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
                
                priorityBtn.setAttribute("task-priority", String(prioritySelection.selectedIndex + 1));
            }
            else if (eventTarget.classList.contains("delete-task-btn") || eventTarget.classList.contains("task-checkbox")) {
                const taskLiElement: HTMLLIElement = (eventTarget.parentNode as HTMLLIElement);
                const taskToDelete: Task = this.taskService.getTask(taskLiElement.dataset["taskId"]);
                const selectedProject: HTMLDivElement = document.querySelector(".selected-project");

                if (this.sectionService.containsId(taskToDelete.parentId))
                    this.sectionService.deleteTaskFromSection(taskToDelete.parentId, taskToDelete);
                else
                    this.projectService.deleteChildFromProject(selectedProject.dataset["projectId"], taskToDelete.id);

                this.taskService.deleteTask(taskToDelete.id);

                this.renderProjectUpdates();
            }
        });
    }

    setupEditMenuEventListeners() {
        document.body.addEventListener("click", () => {
            const editProjectMenu: HTMLDivElement = document.querySelector(".sidebar-edit-project-menu");
            editProjectMenu.style.display = "none";

            const editInboxProjectMenu: HTMLDivElement = document.querySelector(".inbox-project-menu");
            editInboxProjectMenu.style.display = "none";

            const userProjectMenu: HTMLDivElement = document.querySelector(".user-project-menu");
            userProjectMenu.style.display = "none";

            const editSectionMenu: HTMLDivElement = document.querySelector(".edit-section-menu");
            editSectionMenu.style.display = "none";

            const moveSectionToMenu: HTMLDivElement = document.querySelector(".move-section-to-menu");
            moveSectionToMenu.style.display = "none";
        });

        const addSectionMenuOption: HTMLDivElement = document.querySelector(".add-section-menu-option");

        addSectionMenuOption.addEventListener("click", () => {
            document.querySelector(".add-section").dispatchEvent(new Event("click", { bubbles: true }));
        });

        const deleteProjectMenuOption: HTMLDivElement = document.querySelector(".delete-project-menu-option");

        deleteProjectMenuOption.addEventListener("click", () => {
            const projectToDelete: Project = this.projectService.getProject(deleteProjectMenuOption.dataset["projectId"]);
            const projectTasks: Array<Task> = this.projectService.getProjectLevelTasks(projectToDelete);
            const projectSections: Array<Section> = this.projectService.getProjectSections(projectToDelete);

            projectTasks.forEach((task) => this.taskService.deleteTask(task.id));
            
            projectSections.forEach((section) => {
                section.tasks.forEach((task) => this.taskService.deleteTask(task.id));
                this.sectionService.deleteSection(section.id);
            });

            this.projectService.deleteProject(deleteProjectMenuOption.dataset["projectId"]);
            this.renderProjectUpdates();
        });

        const renameProjectMenuOption: HTMLDivElement = document.querySelector(".rename-project-menu-option");

        renameProjectMenuOption.addEventListener("click", () => {
            (document.querySelector("#rename-project-dialog") as HTMLDialogElement).showModal();
        });

        const renameSectionMenuOption: HTMLDivElement = document.querySelector(".rename-section-menu-option");

        renameSectionMenuOption.addEventListener("click", () => {
            (document.querySelector("#rename-section-dialog") as HTMLDialogElement).showModal();
        });

        const deleteSectionMenuOption: HTMLDivElement = document.querySelector(".delete-section-menu-option");

        deleteSectionMenuOption.addEventListener("click", () => {
            const sectionToDelete: Section = this.sectionService.getSection(deleteSectionMenuOption.dataset["sectionId"]);
            
            const sectionTasks: Array<Task> = sectionToDelete.tasks;
            sectionTasks.forEach((task) => this.taskService.deleteTask(task.id));

            this.projectService.deleteChildFromProject(sectionToDelete.parentId, sectionToDelete.id);
            this.sectionService.deleteSection(sectionToDelete.id);

            this.renderProjectUpdates();
        });

        const moveSectionToOption: HTMLDivElement = document.querySelector(".move-to-menu-option");

        moveSectionToOption.addEventListener("click", (event) => {
            this.sectionController.placeMoveSectionToMenu(moveSectionToOption);

            event.stopPropagation();
        });

        const myProjectsOptionsHeader: HTMLDivElement = document.querySelector(".my-projects-options-header");

        myProjectsOptionsHeader.addEventListener("click", (event) => event.stopPropagation());

        const moveToInboxOption: HTMLDivElement = document.querySelector(".move-to-inbox-menu-option");
        moveToInboxOption.setAttribute("data-project-id", (document.querySelector("#sidebar-inbox-btn") as HTMLElement).dataset["projectId"]);

        moveToInboxOption.addEventListener("click", () => {
            const selectedProjectId: string = (document.querySelector(".selected-project") as HTMLElement).dataset["projectId"];
            const inboxProjectId: string = moveToInboxOption.dataset["projectId"];

            if (selectedProjectId === inboxProjectId)
                return;
            else
                this.projectService.moveChildToProject(selectedProjectId, inboxProjectId, moveSectionToOption.dataset["sectionId"]);

            this.renderProjectUpdates();
        });
    }
}
