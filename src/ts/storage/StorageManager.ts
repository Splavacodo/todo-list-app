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
            localStorage["user"] = "someUser";
            localStorage["projects"] = JSON.stringify(
                [
                    {
                        "id": "inbox",
                        "title": "Inbox",
                        "childrenIds": []
                    },
                    {
                        "id": crypto.randomUUID(),
                        "title": "Welcome &#128075",
                        "childrenIds": []
                    }
                ]
            ); 
        }
    }
}
