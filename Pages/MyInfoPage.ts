import { BasePage } from "./BasePage";
import infoLocs from "../Page-Objects/MyInfoObjectPage"
import { expect, test } from "@playwright/test"

export class MyInfoPage extends BasePage {

  constructor(page) {
    super(page);
  }

  async OpenMyInfoModule() {
    await this.moduleSelect('My Info')
    await this.waitForPageReady();
  }

  generateRandomId(): string {
    const randomNum = Math.floor(100 + Math.random() * 900).toString();
    return `${randomNum}`;

  }

  async fillPersonalDetails(first, last, middle, id?: string, otherid?, num?, date?, nationalityy?, maritalstatuss?, dobb?, gender?) {
    id = this.generateRandomId();
    await this.click(infoLocs.personalDetails, 'Personal Details');
    await this.clickandfill(infoLocs.firstName, first, 'firstname');
    await this.clickandfill(infoLocs.middleName, middle, 'middlename');
    await this.clickandfill(infoLocs.lastName, last, 'lastname');
    await this.clickandfill(infoLocs.employeeId, id, 'employeid');
    await this.clickandfill(infoLocs.otherId, otherid, 'otherId');
    await this.clickandfill(infoLocs.drivingLicenseNum, num, 'license');
    await this.clickandfill(infoLocs.licenseData, date, 'licenseCalendar');
    await this.selectCustomDropdown(infoLocs.nationality, nationalityy, 'Nationality');
    await this.selectCustomDropdown(infoLocs.maritalStatus, maritalstatuss, 'Marital');
    await this.clickandfill(infoLocs.dob, dobb, 'dob');
    await this.selectGender(gender);
    await this.click(infoLocs.saveBtn, 'save');
  }

  async verifySuccessPopupMessage() {
    await this.expectVisible(infoLocs.successPopupMessage, 'saveMessage')
  }

  async verifyPersonalDetails(expectedName: string) {
    await this.page.reload();
    await this.expectToBe(infoLocs.verifyPersonalDetails, expectedName, 'Expected name');

  }

  async selectGender(gender: string) {
    await test.step(`Select gender: ${gender}`, async () => {
      if (gender.toLowerCase() === 'male') {
        await this.page.locator(infoLocs.maleCheckbox).check();
      } else if (gender.toLowerCase() === 'female') {
        await this.page.locator(infoLocs.femaleCheckbox).check();
      } else {
        throw new Error(`Invalid gender: "${gender}". Use "Male" or "Female".`);
      }
    });
  }

  generateRandomEmail(prefix: string = 'user'): string {
    const randomNum = Math.floor(Math.random() * 10000);
    return `${prefix}${randomNum}@example.com`;
  }

  async fillContactDetails(
    street11, street22, cityy, statee, postalcodee, countryy,
    homee, mobilee, workk,
    workemaill?: string, otheremaill?: string
  ) {
    workemaill = this.generateRandomEmail();
    otheremaill = this.generateRandomEmail();

    await this.click(infoLocs.contactDetails, 'ContactDetails');
    await this.clickandfill(infoLocs.street1, street11, 'street1');
    await this.clickandfill(infoLocs.street2, street22, 'street2');
    await this.clickandfill(infoLocs.city, cityy, 'city');
    await this.clickandfill(infoLocs.state, statee, 'state');
    await this.clickandfill(infoLocs.postalCode, postalcodee, 'postalCode');
    await this.selectCustomDropdown(infoLocs.country, countryy, 'country');
    await this.clickandfill(infoLocs.home, homee, 'home');
    await this.clickandfill(infoLocs.mobile, mobilee, 'mobile');
    await this.clickandfill(infoLocs.work, workk, 'work');
    await this.clickandfill(infoLocs.workEmail, workemaill, 'workEmail');
    await this.clickandfill(infoLocs.otherEmail, otheremaill, 'otherEmail');
    await this.click(infoLocs.saveBtn, 'save');
  }

  generateRandomContact(): { name: string, relation: string } {
    const people = [
      { name: 'Teja', relation: 'Brother' },
      { name: 'Kalyan', relation: 'Cousin' },
      { name: 'Bhavya', relation: 'Sister' },
      { name: 'Ganesh', relation: 'BestFriend' },
      { name: 'Shubash', relation: 'Colleague' },
      { name: 'Sanjosa', relation: 'Neighbor' },
      { name: 'Srihita', relation: 'friend' }

    ];
    const randomIndex = Math.floor(Math.random() * people.length);
    return people[randomIndex];

  }

  generateRandomPhoneNumber(): string {
    const prefix = '9'; //indian phone num starts from 9 we can change into 8 / 7 also
    const number = Math.floor(100000000 + Math.random() * 900000000); // Ensures 9-digit random
    return `${prefix}${number}`; // e.g., 9876543210
  }

  async fillEmergencyContacts() {
    const contact = this.generateRandomContact();
    const namee = contact.name
    const relation = contact.relation
    const mobilenum = this.generateRandomPhoneNumber();
    const homenum = this.generateRandomPhoneNumber();
    const worknum = this.generateRandomPhoneNumber();
    await this.click(infoLocs.emergencyContacts, 'Emergency Contacts ');
    await this.click(infoLocs.addContactBtn, 'Add Contact ');
    await this.clickandfill(infoLocs.name, namee, 'Name');
    await this.clickandfill(infoLocs.relationship, relation, 'Relationship');
    await this.clickandfill(infoLocs.homeTelephone, homenum, 'Home Telephone');
    await this.clickandfill(infoLocs.mobileNumber, mobilenum, 'Mobile Number');
    await this.clickandfill(infoLocs.workTelephone, worknum, 'Work Telephone');
    await this.click(infoLocs.saveBtn, 'Save ');
    return { namee, relation, mobilenum }

  }

  async verifyEmergencyContactAdded(namee: string, relation: string, mobilenum: string) {
    await this.click(infoLocs.emergencyContacts, 'Emergency Contacts ');
    await this.waitForPageReady();

    const rows = await this.page.locator('(//div[@role="table"])[1]//div[@role="row"]');
    const rowCount = await rows.count();

    let contactFound = false;

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = await row.locator('[role="cell"]');
      const cellCount = await cells.count();
      if (cellCount < 5) continue;

      const nameText = await cells.nth(1).innerText();
      const relationText = await cells.nth(2).innerText();
      const mobileText = await cells.nth(4).innerText();

      if (
        nameText.trim() === namee.trim() &&
        relationText.trim() === relation.trim() &&
        mobileText.trim() === mobilenum.trim()
      ) {
        contactFound = true;
        break;
      }
    }

    await test.step('Verify emergency contact is added', async () => {
      expect(contactFound).toBeTruthy();
    });
  }

  async addDependents(namee, relationn, dateofbirth) {
    const contact = this.generateRandomContact();
    await this.click(infoLocs.dependents, 'dependents');
    await this.click(infoLocs.addDependentsbtn, 'Add Contact ');
    await this.fill(infoLocs.name, contact.name, 'name');
    const normalizedInput = relationn.trim().toLowerCase();
    if (normalizedInput === 'child') {
      await this.selectCustomDropdown(infoLocs.relation, 'Child', 'relationship');
    } else {
      await this.selectCustomDropdown(infoLocs.relation, 'Other', 'relationship');
      await this.clickandfill(infoLocs.specifyRelation, contact.relation, 'specify relation');
    }
    await this.fill(infoLocs.dob, dateofbirth, 'dob')
    await this.click(infoLocs.saveBtn, 'save')
  }

}


