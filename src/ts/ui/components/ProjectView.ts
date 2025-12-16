import "../../../styles/ProjectView.css";
import plusIconImg from "../../../images/plus.svg";
import editIconImg from "../../../images/dots-horizontal.svg";
import projectIconImg from "../../../images/pound.svg";
import { Project } from "../../models/Project";

export class ProjectView {
    static renderInboxProjectContainer(project: Project) {
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
        projectTitle.setAttribute("data-project-id", project.id);

        const tasksList = document.createElement("ul");
        tasksList.setAttribute("class", "project-tasks-list");
        tasksList.setAttribute("data-parent-id", project.id);

        const addTaskBtn: HTMLButtonElement = document.createElement("button");
        addTaskBtn.setAttribute("class", "main-add-task-btn");

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

        const taskPlacementBtnText: HTMLButtonElement = document.querySelector(".task-placement-text");
        taskPlacementBtnText.textContent = project.title;

        for(let child of Array.from(document.querySelector("#task-placement-selection").children)) {
            if (child.hasAttribute("selected")) {
                child.toggleAttribute("selected");
                break;
            }
        }

        document.querySelector(`option[value="${project.id}"]`).setAttribute("selected", "");
    }

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
}
