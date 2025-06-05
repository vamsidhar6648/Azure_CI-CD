import { BasePage } from "./BasePage";
import recruitLocs from "../Page-Objects/RecruitmentObjectPage"
export class Recruitment extends BasePage {
    constructor(page) {
        super(page)
    }

    async addCandidateInRec(firstnamee, lastNamee, emaill) {
        await this.moduleSelect('recruitment')
        await this.click(recruitLocs.addButton, 'add');
        await this.clickandfill(recruitLocs.firstName, firstnamee, 'firstName')
        await this.clickandfill(recruitLocs.lastName, lastNamee, 'lastName')
        await this.clickandfill(recruitLocs.email, emaill, 'eamil')
        await this.click(recruitLocs.saveBtn, 'saveButton');

    }

    async verifyCandidateAdded() {
        await this.expectVisible(recruitLocs.successPopupMessage, 'candidateAdded Sucessfully')

    }

    async verifyRecrutementPage() {
        await this.moduleSelect('recruitment')
        await this.expectVisible(recruitLocs.recruitmentPage, 'recruitmentPage');
    }
}

