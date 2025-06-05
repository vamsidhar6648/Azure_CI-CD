import { BasePage } from "./BasePage";
import loginLocs from "../Page-Objects/LoginObjectPage"

export class LoginPage extends BasePage {

  constructor(page) {
    super(page);
  }

  async loginToHomePage(username: string, password: string) {

    await super.openApplication();
    await this.fill(loginLocs.usernameField, username, 'username');
    await this.fill(loginLocs.passwordField, password, 'password', true);
    await this.click(loginLocs.loginBtn, 'login');
    await this.waitForPageReady();
  }

  async verifyHomePage() {
    await this.expectVisible(loginLocs.verifyHomepage, 'homepage');

  }

  async verifyDashboard() {
    await this.expectURL('https://hr.quality-matrix.us/web/index.php/dashboard/index', 'dashboard');


  }

  async confirmkeywidgets() {
    await this.expectVisible(loginLocs.timeAtWork, 'timeAtWork DashBoard');
    await this.expectVisible(loginLocs.myActions, 'myActions DashBoard');

  }

  async logout() {
    await this.click(loginLocs.profile, 'profile');
    await this.click(loginLocs.logoutBtn, 'logout');
  }

  async verifyConformLogout() {
    await this.expectVisible(loginLocs.loginPageTitle, 'login page');
    await this.expectVisible(loginLocs.forgotPassword,'forgot password')
  }

  async verifyLoginPage() {
    await this.expectURL('https://hr.quality-matrix.us/web/index.php/auth/login', 'login page');
    console.log('Login URL verified');
  }

  async verifyRequireFieldMessage() {
    await this.expectVisible(loginLocs.requiredField, 'errorMessage');
  }

  async verifyInvalidCredatialMessage() {
    await this.expectVisible(loginLocs.errorMessage, 'errorMessage');
  }

}
