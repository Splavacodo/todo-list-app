import "../../../styles/SectionView.css";
import downwardCaratImgIcon from "../../../images/chevron-down.svg";
import editImgIcon from "../../../images/dots-horizontal.svg";
import plusIconImg from "../../../images/plus.svg";
import { Section } from "../../models/Section";

export class SectionView {
    static renderSection(section: Section) {
        const sectionHeader: HTMLDivElement = document.createElement("div");
        sectionHeader.setAttribute("class", "section-header");
        sectionHeader.setAttribute("data-section-id", section.id);

        const sectionToggleBtn: HTMLButtonElement = document.createElement("button");
        sectionToggleBtn.setAttribute("class", "section-toggle-btn");

        const sectionToggleImg: HTMLImageElement = document.createElement("img");
        sectionToggleImg.setAttribute("class", "section-toggle-icon");
        sectionToggleImg.src = downwardCaratImgIcon;
        sectionToggleImg.alt = "downward arrow icon";

        sectionToggleBtn.appendChild(sectionToggleImg);

        const sectionTitle: HTMLDivElement = document.createElement("div");
        sectionTitle.setAttribute("class", "section-title");
        sectionTitle.textContent = section.title;

        const editSectionBtn: HTMLButtonElement = document.createElement("button");
        editSectionBtn.setAttribute("class", "edit-section-btn");

        const editSectionBtnImg: HTMLImageElement = document.createElement("img");
        editSectionBtnImg.setAttribute("class", "edit-section-btn-icon");
        editSectionBtnImg.src = editImgIcon;
        editSectionBtnImg.alt = "three hollow circles in a horizontal line spaced evenly";

        editSectionBtn.appendChild(editSectionBtnImg);

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

        sectionHeader.appendChild(sectionToggleBtn);
        sectionHeader.appendChild(sectionTitle);
        sectionHeader.appendChild(editSectionBtn);

        const projectContainer: HTMLDivElement = document.querySelector(".project-container");
        projectContainer.appendChild(sectionHeader);
        projectContainer.appendChild(addTaskBtn);
        projectContainer.appendChild(addSectionDiv);
    }
}
