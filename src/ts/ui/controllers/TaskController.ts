import { UIController } from "./UIController";
import { TaskView } from "../components/TaskView";
import { Section } from "../../models/Section";
import checkedCheckboxImg from "../../../images/check-circle-outline.svg";
import uncheckedCheckboxImg from "../../../images/checkbox-blank-circle-outline.svg";
import { Task } from "../../models/Task";

export class TaskController {
    private uiController: UIController;

    constructor(uiController: UIController) {
        this.uiController = uiController;
    }

    renderSectionTasks(section: Section) {
        for(let task of section.tasks)
            TaskView.renderTaskToParent(task, task.parentId);
        
        this.setupCheckboxEventListeners();
    }

    renderProjectTask(task: Task) {
        TaskView.renderTaskToParent(task, task.parentId);
        
        this.setupCheckboxEventListeners();
    }

    private setupCheckboxEventListeners(): void {
        const taskCheckboxes: Array<HTMLButtonElement> = Array.from(document.querySelectorAll(".task-checkbox"));

        for(let checkbox of taskCheckboxes) {
            checkbox.addEventListener("mouseenter", () => {
                (checkbox.firstElementChild as HTMLImageElement).src = checkedCheckboxImg;
            });

            checkbox.addEventListener("mouseleave", () => {
                (checkbox.firstElementChild as HTMLImageElement).src = uncheckedCheckboxImg;
            })
        }
    }
}
