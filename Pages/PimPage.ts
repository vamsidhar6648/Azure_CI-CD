import { BasePage } from "./BasePage";
import PimLocs from "../Page-Objects/PimObjectPage"
export class Pimpage extends BasePage {
  constructor(page) {
    super(page);
  }

  async addEmployeeinPim(firstnamee, lastNamee) {
    await this.moduleSelect('pim');
    await this.click(PimLocs.addEmployee, 'addEmployee');
    await this.clickandfill(PimLocs.firstName, firstnamee, 'firstName');
    await this.clickandfill(PimLocs.lastName, lastNamee, 'lastName');
    const employeeIdLocator = this.page.locator(PimLocs.employeeId);
    const employeeId = await employeeIdLocator.inputValue();
    await this.click(PimLocs.saveBtn, 'save');
    return employeeId;  
  }

  async verifyEmployeeAdded(employeeId) {
    
    await this.expectVisible(PimLocs.successPopupMessage, 'employeeAdded Successfully');
    await this.wait(PimLocs.employList);
    await this.click(PimLocs.employList,'employee list');
    await this.clickandfill(PimLocs.employeeIdField, employeeId); 
    await this.click(PimLocs.searchBtn,'search');
    await this.expectToBe(PimLocs.verifyUserId,employeeId,'Verify User Id');
  }
}
