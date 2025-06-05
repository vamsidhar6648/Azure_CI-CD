//adminLocs=admin module locators

import { BasePage } from "./BasePage";
import adminLocs from "../Page-Objects/AdminObjectPage";
export class adminPage extends BasePage {
    constructor(page) {
        super(page)
    }
    
    async findUserInAdminModule(usernamee) {
        await this.moduleSelect('admin')
        await this.clickandfill(adminLocs.username, usernamee, 'userame')
        await this.click(adminLocs.search, 'search')
        await this.expectVisible(adminLocs.verifyUsername, 'username')

    }

    async verifyNoRecorsFound(usernamee) {
        await this.moduleSelect('admin')
        await this.click(adminLocs.userManagement, 'usermangment');
        await this.click(adminLocs.user, 'user Option')
        await this.clickandfill(adminLocs.username, usernamee, 'userame')
        await this.click(adminLocs.search, 'search')
        await this.expectVisible(adminLocs.noRecordsLocator, 'No Records Found')

    }
}