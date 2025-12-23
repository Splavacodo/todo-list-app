import "../styles/main.css";

import { ProjectService } from "./services/ProjectService";
import { SectionService } from "./services/SectionService";
import { TaskService } from "./services/TaskService";
import { StorageManager } from "./storage/StorageManager"; 
import { UIController } from "./ui/controllers/UIController";

function init() {
    StorageManager.init(); 

    const taskService = new TaskService();
    taskService.addTasksFromJson(StorageManager.getLocalTasks());

    const sectionService = new SectionService(taskService);
    sectionService.addSectionsFromJson(StorageManager.getLocalSections());

    const projectService = new ProjectService(taskService, sectionService);
    projectService.addProjectsFromJson(StorageManager.getLocalProjects());

    const uiController = new UIController(taskService, sectionService, projectService); 
    uiController.setupEventListeners();
    uiController.renderSidebarProjects();
    uiController.renderTaskPlacementOptions();
    uiController.renderInboxProject();
    uiController.setupProjectContainerEventListeners();
}

init();
