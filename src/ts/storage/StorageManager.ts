import { Project } from "../models/Project";
import { Task } from "../models/Task";

export class StorageManager {
    static getLocalProjects(): string {
        return "projects" in localStorage ? localStorage.getItem("projects") : "[]";
    }

    static getLocalSections(): string {
        return "sections" in localStorage ? localStorage.getItem("sections") : "[]";
    }

    static getLocalTasks(): string {
        return "tasks" in localStorage ? localStorage.getItem("tasks") : "[]";
    }

    static init() {
        if (!("user" in localStorage)) {
            const welcomeProjectId: string = crypto.randomUUID();
            const tipsSectionId: string = crypto.randomUUID();
            const deleteTaskId = crypto.randomUUID();

            localStorage["user"] = "someUser";

            localStorage["projects"] = JSON.stringify(
                [
                    {
                        "id": crypto.randomUUID(),
                        "title": "Inbox",
                        "childrenIds": []
                    },
                    {
                        "id": welcomeProjectId,
                        "title": "Welcome 👋",
                        "childrenIds": [deleteTaskId, tipsSectionId]
                    }
                ]
            ); 

            const taskDetailsId = crypto.randomUUID();
            const addingSectionsId = crypto.randomUUID();
            const addingTasksId = crypto.randomUUID();
            const addingProjectsId = crypto.randomUUID();

            localStorage["sections"] = JSON.stringify(
                [
                    {
                        "id": tipsSectionId,
                        "title": "A few tips to start",
                        "taskIds": [taskDetailsId, addingSectionsId, addingTasksId, addingProjectsId],
                        "parentId": welcomeProjectId
                    }
                ]
            );

            localStorage["tasks"] = JSON.stringify(
                [
                    {
                        _id: deleteTaskId,
                        _title: "Delete this task",
                        _description: "You can delete tasks by hovering over a task and clicking the trash button on the right",
                        _dueDate: "",
                        _priority: "4",
                        _notes: "",
                        _parentId: welcomeProjectId
                    },
                    {
                        _id: taskDetailsId,
                        _title: "Select this task to see more details",
                        _description: "Quick notes can go here in the description",
                        _dueDate: "",
                        _priority: "4",
                        _notes: "More detailed notes can go here in this notes section. You can set the due date or priority with drop downs on the right. A task can also be moved to a different project or section using the drop down on the right.",
                        _parentId: tipsSectionId
                    },
                    {
                        _id: addingSectionsId,
                        _title: "Organize this task into a new section",
                        _description: "Create a new section by selecting the three dots icon at the top of this project or by hovering above or below an existing section and then add section",
                        _dueDate: "",
                        _priority: "4",
                        _notes: "",
                        _parentId: tipsSectionId
                    },
                    {
                        _id: addingTasksId,
                        _title: "Add a task to a section or a project",
                        _description: "A task can be created by selecting the add task button anywhere inside a project or with the add task button in the sidebar",
                        _dueDate: "",
                        _priority: "4",
                        _notes: "",
                        _parentId: tipsSectionId
                    },
                    {
                        _id: addingProjectsId,
                        _title: "Create a new project",
                        _description: "Projects are created by selecting the plus icon when hovering over My Projects in the sidebar",
                        _dueDate: "",
                        _priority: "4",
                        _notes: "",
                        _parentId: tipsSectionId
                    }
                ]
            )
        }
    }

    static writeProjectToStorage(project: Project) {
        const localProjects: Array<Record<string, any>> = JSON.parse(localStorage.getItem("projects"));
        
        localProjects.push(project.toJSONObj());

        localStorage.setItem("projects", JSON.stringify(localProjects));
    }

    static writeTaskToStorage(task: Task) {
        const localTasks: Array<Record<string, any>> = JSON.parse(localStorage.getItem("tasks"));

        localTasks.push(task);
        
        localStorage.setItem("tasks", JSON.stringify(localTasks));
    }

    static writeTaskIdToSection(sectionId: string, childTaskId: string) {
        const localSections: Array<Record<string, any>> = JSON.parse(localStorage.getItem("sections"));
        const parentSectionJSON: Record<string, any> = localSections.find((section) => section["id"] === sectionId);
        const parentSectionIdx: number = localSections.indexOf(parentSectionJSON);

        parentSectionJSON["taskIds"].push(childTaskId);
        
        localSections[parentSectionIdx] = parentSectionJSON;
        
        localStorage.setItem("sections", JSON.stringify(localSections));
    }

    static writeTaskIdToProject(projectId: string, childTaskId: string) {
        const localProjects: Array<Record<string, any>> = JSON.parse(localStorage.getItem("projects"));
        const parentProjectJSON: Record<string, any> = localProjects.find((project) => project["id"] === projectId);
        const parentProjectIdx: number = localProjects.indexOf(parentProjectJSON);

        parentProjectJSON["childrenIds"].push(childTaskId);
        
        localProjects[parentProjectIdx] = parentProjectJSON;
        
        localStorage.setItem("projects", JSON.stringify(localProjects));
    }

    static updateProject(modifiedProject: Project) {
        const localProjects: Array<Record<string, any>> = JSON.parse(localStorage.getItem("projects"));
        const modifiedProjectIdx: number = localProjects.findIndex((project) => project["id"] === modifiedProject.id);

        localProjects[modifiedProjectIdx] = modifiedProject.toJSONObj();

        localStorage.setItem("projects", JSON.stringify(localProjects));
    }

    static removeProject(projectToRemoveId: string) {
        const localProjects: Array<Record<string, any>> = JSON.parse(localStorage.getItem("projects"));
        const removalIdx: number = localProjects.findIndex((project) => project["id"] === projectToRemoveId);

        localProjects.splice(removalIdx, 1);

        localStorage.setItem("projects", JSON.stringify(localProjects));
    }

    static updateTask(modifiedTask: Task) {
        const localTasks: Array<Record<string, any>> = JSON.parse(localStorage.getItem("tasks"));
        const modifiedTaskIdx: number = localTasks.findIndex((task) => task["_id"] === modifiedTask.id);

        localTasks[modifiedTaskIdx] = modifiedTask;

        localStorage.setItem("tasks", JSON.stringify(localTasks));
    }
}
