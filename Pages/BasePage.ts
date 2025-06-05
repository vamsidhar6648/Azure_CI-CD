import { commonActions } from "../Utils/WebActions";
//import{adminObject}from"../Page-Objects/AdminObjectPage"
export class BasePage extends commonActions {
    constructor(page) {
        super(page)
    }
    async openPage() {
        await super.openApplication();

    }
}

