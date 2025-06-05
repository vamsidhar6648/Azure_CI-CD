import { test as fixture } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { MyInfoPage } from "../Pages/MyInfoPage";
import { Pimpage } from "../Pages/PimPage";
import { Recruitment } from "../Pages/RecruitmentPage.ts";
import { userName, password } from "../Utils/config";
import { adminPage } from "../Pages/AdminPage";


const test = fixture.extend<{
    loginPage: LoginPage;
    commonLoginPage: LoginPage;
    myInfoPage: MyInfoPage;
    pimpage: Pimpage;
    recruitment: Recruitment;
    adminpage:adminPage;

}>({
    commonLoginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginToHomePage(userName, password);
        await use(loginPage);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    myInfoPage: async ({ commonLoginPage, page }, use) => {
        const myInfoPage = new MyInfoPage(page);
        await use(myInfoPage);
    },
    pimpage: async ({ commonLoginPage, page }, use) => {
        const pimpage = new Pimpage(page);
        await use(pimpage)
    },
    recruitment: async ({ commonLoginPage, page }, use) => {
        const recruitment = new Recruitment(page);
        await use(recruitment)
    },
    adminpage:async({commonLoginPage,page},use)=>{
        const adminpage=new adminPage(page);
        await use(adminpage)

    }
});
export default test;