import "../../../styles/ProjectView.css";
import plusIconImg from "../../../images/plus.svg";
import editIconImg from "../../../images/dots-horizontal.svg";
import projectIconImg from "../../../images/pound.svg";
import calenderIconImg from "../../../images/calendar-range.svg";
import flagIconImg from "../../../images/flag-variant-outline.svg";
import menuDownIconImg from "../../../images/menu-down.svg";
import { Project } from "../../models/Project";

export class ProjectView {
    static resetProjectView(): void {
        const projectActions: HTMLDivElement = document.querySelector(".main-project-actions");
        projectActions.replaceChildren();

        const projectHeader: HTMLElement = document.querySelector(".project-header");
        projectHeader.textContent = "";

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        projectContainer.replaceChildren(projectContainer.firstElementChild);
    }

    static renderMyProjects() {
        const projectTitle: HTMLElement = document.querySelector(".project-header");
        projectTitle.textContent = "My Projects";

        const projectsBtnContainer: HTMLDivElement = document.createElement("div");
        projectsBtnContainer.setAttribute("class", "add-project-btn-container");

        const addProjectBtn: HTMLButtonElement = document.createElement("button");
        addProjectBtn.setAttribute("class", "add-project-btn");

        const plusIcon: HTMLImageElement = document.createElement("img");
        plusIcon.src = plusIconImg;
        plusIcon.alt = "plus sign icon";

        const addProjectBtnText: HTMLDivElement = document.createElement("div");
        addProjectBtnText.textContent = "Add project";

        addProjectBtn.appendChild(plusIcon);
        addProjectBtn.appendChild(addProjectBtnText);

        projectsBtnContainer.appendChild(addProjectBtn);
        
        const projectsListHeader: HTMLDivElement = document.createElement("div");
        projectsListHeader.setAttribute("class", "projects-list-header");

        const numProjects: number = document.querySelector(".projects-list").children.length;
        projectsListHeader.textContent = numProjects + (numProjects == 1 ? " project": " projects");

        const projects: Array<Element> = Array.from(document.querySelector(".projects-list").children);

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        projectContainer.appendChild(projectsBtnContainer);
        projectContainer.appendChild(projectsListHeader);

        for(let project of projects) {
            const projectCard = document.createElement("div");
            projectCard.setAttribute("class", "project-card");
            projectCard.setAttribute("data-project-idx", (project as HTMLElement).dataset.projectIdx); 
            projectCard.setAttribute("data-project-id", (project as HTMLElement).dataset.projectId);

            const projectIcon: HTMLImageElement = document.createElement("img");
            projectIcon.setAttribute("class", "project-card-icon");
            projectIcon.src = projectIconImg;
            projectIcon.alt = "pound symbol icon";

            const projectTitle: HTMLDivElement = document.createElement("div");
            projectTitle.setAttribute("class", "project-card-title");
            projectTitle.textContent = project.textContent;

            const editProjectBtn: HTMLButtonElement = document.createElement("button");
            editProjectBtn.setAttribute("id", "edit-project-card-btn");

            const editProjectIcon: HTMLImageElement = document.createElement("img");
            editProjectIcon.setAttribute("class", "project-card-edit-icon");
            editProjectIcon.src = editIconImg;
            editProjectIcon.alt = "three hollow circles in a horizontal line spaced evenly";

            editProjectBtn.appendChild(editProjectIcon);

            projectCard.appendChild(projectIcon);
            projectCard.appendChild(projectTitle);
            projectCard.appendChild(editProjectBtn);

            projectContainer.appendChild(projectCard);
        }

        const taskPlacementBtnText: HTMLButtonElement = document.querySelector(".task-placement-text");
        taskPlacementBtnText.textContent = "Inbox";
        
        const inboxProjectId: string = (document.querySelector("#sidebar-inbox-btn") as HTMLButtonElement).dataset["projectId"];

        for(let child of Array.from(document.querySelector("#task-placement-selection").children)) {
            if (child.hasAttribute("selected")) {
                child.toggleAttribute("selected");
                break;
            }
        }

        document.querySelector(`option[value="${inboxProjectId}"]`).setAttribute("selected", "");
    }

    static renderProject(project: Project): void {
        const projectActions: HTMLDivElement = document.querySelector(".main-project-actions");

        const editProjectBtn: HTMLButtonElement = document.createElement("button");
        editProjectBtn.setAttribute("class", "main-edit-project-btn")

        const editIcon: HTMLImageElement = document.createElement("img");
        editIcon.src = editIconImg;
        editIcon.alt = "three hollow circles in a horizontal line spaced evenly";

        editProjectBtn.appendChild(editIcon);
        projectActions.appendChild(editProjectBtn);

        const projectTitle: HTMLElement = document.querySelector(".project-header");
        projectTitle.textContent = project.title;
        projectTitle.setAttribute("data-parent-id", project.id);

        const tasksList = document.createElement("ul");
        tasksList.setAttribute("class", "project-tasks-list");
        tasksList.setAttribute("data-parent-id", project.id);

        const addTaskBtn: HTMLButtonElement = document.createElement("button");
        addTaskBtn.setAttribute("class", "main-add-task-btn");
        addTaskBtn.setAttribute("data-parent-id", project.id);

        const plusIcon: HTMLImageElement = document.createElement("img");
        plusIcon.src = plusIconImg;
        plusIcon.alt = "plus sign icon";

        const addTaskBtnText: HTMLDivElement = document.createElement("div");
        addTaskBtnText.textContent = "Add task";

        addTaskBtn.appendChild(plusIcon);
        addTaskBtn.appendChild(addTaskBtnText);

        const addSectionDiv: HTMLDivElement = document.createElement("div");
        addSectionDiv.setAttribute("class", "add-section");

        const addSectionText: HTMLSpanElement = document.createElement("span");
        addSectionText.setAttribute("class", "add-section-text");
        addSectionText.textContent = "Add section"; 

        addSectionDiv.appendChild(addSectionText);

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        projectContainer.appendChild(tasksList);
        projectContainer.appendChild(addTaskBtn);
        projectContainer.appendChild(addSectionDiv);

        const taskPlacementBtnText: HTMLDivElement = document.querySelector(".task-placement-text");
        taskPlacementBtnText.textContent = project.title;

        for(let child of Array.from(document.querySelector("#task-placement-selection").children)) {
            if (child.hasAttribute("selected")) {
                child.toggleAttribute("selected");
                break;
            }
        }

        document.querySelector(`option[value="${project.id}"]`).setAttribute("selected", "");
    }

    static getAddTaskForm(): HTMLFormElement {
        const addTaskForm = document.createElement('form');
        addTaskForm.setAttribute("class", "main-add-task-form");

        const formTopHalf = document.createElement('div');
        formTopHalf.setAttribute("class", "main-form-top-half");

        const taskNameInput = document.createElement('input');
        taskNameInput.type = 'text';
        taskNameInput.name = 'task-name';
        taskNameInput.id = 'main-task-name';
        taskNameInput.placeholder = 'Task name';
        taskNameInput.autocomplete = 'off';

        const taskDescriptionTextarea = document.createElement('textarea');
        taskDescriptionTextarea.setAttribute("class", "main-text-area");
        taskDescriptionTextarea.name = 'task-description';
        taskDescriptionTextarea.id = 'task-description';
        taskDescriptionTextarea.rows = 1;
        taskDescriptionTextarea.setAttribute('form', 'add-task-form');
        taskDescriptionTextarea.placeholder = 'Description';
        taskDescriptionTextarea.maxLength = 500;

        const taskSettingActions = document.createElement('div');
        taskSettingActions.setAttribute("class", "task-setting-actions");

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.type = 'date';
        taskDueDateInput.name = 'task-due-date';
        taskDueDateInput.id = 'task-due-date';

        const taskDueDateBtn = document.createElement('button');
        taskDueDateBtn.setAttribute("class", "task-due-date-btn");

        const dueDateIcon = document.createElement('img');
        dueDateIcon.src = calenderIconImg;
        dueDateIcon.alt = 'icon of a calender';
        dueDateIcon.setAttribute("class", "task-due-date-icon");

        const dueDateText = document.createElement('div');
        dueDateText.setAttribute("class", "task-due-date-text");
        dueDateText.textContent = 'Date';

        taskDueDateBtn.appendChild(dueDateIcon);
        taskDueDateBtn.appendChild(dueDateText);

        const taskPrioritySelection = document.createElement('select');
        taskPrioritySelection.name = 'task-priority-selection';
        taskPrioritySelection.id = 'main-task-priority-selection';

        const priority1 = document.createElement('option');
        priority1.value = 'priority-1';
        priority1.textContent = 'Priority 1';

        const priority2 = document.createElement('option');
        priority2.value = 'priority-2';
        priority2.textContent = 'Priority 2';

        const priority3 = document.createElement('option');
        priority3.value = 'priority-3';
        priority3.textContent = 'Priority 3';

        const priority4 = document.createElement('option');
        priority4.value = 'priority-4';
        priority4.textContent = 'Priority 4';
        priority4.selected = true;

        taskPrioritySelection.appendChild(priority1);
        taskPrioritySelection.appendChild(priority2);
        taskPrioritySelection.appendChild(priority3);
        taskPrioritySelection.appendChild(priority4);

        const taskPriorityBtn = document.createElement('button');
        taskPriorityBtn.setAttribute("class", "task-priority-btn");
        taskPriorityBtn.setAttribute('task-priority', '4');

        const priorityIcon = document.createElement('img');
        priorityIcon.src = flagIconImg
        priorityIcon.alt = 'icon of a flag';
        priorityIcon.setAttribute("class", "task-priority-icon");

        const priorityText = document.createElement('div');
        priorityText.setAttribute("class", "task-priority-text");
        priorityText.textContent = 'Priority';

        taskPriorityBtn.appendChild(priorityIcon);
        taskPriorityBtn.appendChild(priorityText);

        taskSettingActions.appendChild(taskDueDateInput);
        taskSettingActions.appendChild(taskDueDateBtn);
        taskSettingActions.appendChild(taskPrioritySelection);
        taskSettingActions.appendChild(taskPriorityBtn);

        formTopHalf.appendChild(taskNameInput);
        formTopHalf.appendChild(taskDescriptionTextarea);
        formTopHalf.appendChild(taskSettingActions);

        const formBottomHalf = document.createElement('div');
        formBottomHalf.setAttribute("class", "main-form-bottom-half");

        const taskSubmissionActions = document.createElement('div');
        taskSubmissionActions.setAttribute("class", "task-submission-actions");

        const taskPlacementSelection = document.createElement('select');
        taskPlacementSelection.name = 'task-placement-selection';
        taskPlacementSelection.id = 'task-placement-selection';

        const taskPlacementBtn = document.createElement('button');
        taskPlacementBtn.setAttribute("class", "task-placement-btn");

        const placementText = document.createElement('div');
        placementText.setAttribute("class", "task-placement-text");

        const placementIcon = document.createElement('img');
        placementIcon.setAttribute("class", "task-placement-menu-icon");
        placementIcon.src = menuDownIconImg;
        placementIcon.alt = 'small arrow pointing down';

        taskPlacementBtn.appendChild(placementText);
        taskPlacementBtn.appendChild(placementIcon);

        const cancelBtn = document.createElement('button');
        cancelBtn.setAttribute("class", "cancel-task-btn");
        cancelBtn.textContent = 'Cancel';

        const addTaskBtn = document.createElement('button');
        addTaskBtn.setAttribute("class", "dialog-add-task-btn");
        addTaskBtn.disabled = true;
        addTaskBtn.textContent = 'Add task';

        taskSubmissionActions.appendChild(taskPlacementSelection);
        taskSubmissionActions.appendChild(taskPlacementBtn);
        taskSubmissionActions.appendChild(cancelBtn);
        taskSubmissionActions.appendChild(addTaskBtn);

        formBottomHalf.appendChild(taskSubmissionActions);

        addTaskForm.appendChild(formTopHalf);
        addTaskForm.appendChild(formBottomHalf);

        return addTaskForm; 
    }

    static getAddTaskButton(parentId: string): HTMLButtonElement {
        const addTaskBtn: HTMLButtonElement = document.createElement("button");
        addTaskBtn.setAttribute("class", "main-add-task-btn");
        addTaskBtn.setAttribute("data-parent-id", parentId);

        const plusIcon: HTMLImageElement = document.createElement("img");
        plusIcon.src = plusIconImg;
        plusIcon.alt = "plus sign icon";

        const addTaskBtnText: HTMLDivElement = document.createElement("div");
        addTaskBtnText.textContent = "Add task";

        addTaskBtn.appendChild(plusIcon);
        addTaskBtn.appendChild(addTaskBtnText);

        return addTaskBtn;
    }
}
