export class StorageManager {
    static getLocalProjects() {
        return "projects" in localStorage ? localStorage.getItem("projects") : {};
    }

    static getLocalSections() {
        return "sections" in localStorage ? localStorage.getItem("sections") : {};
    }

    static getLocalTasks() {
        return "tasks" in localStorage ? localStorage.getItem("tasks") : {};
    }

    static init() {
        if (!("user" in localStorage)) {
            localStorage["user"] = "someUser";
            localStorage["projects"] = JSON.stringify([{
                "id": crypto.randomUUID(),
                "title": "Welcome &#128075",
                "childrenIds": []
            }]); 
        }
    }
}
