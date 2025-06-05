import { password, userName } from "../Utils/config";
import { getCredentialsByScenario } from "../Utils/ExclReader";
import test from "../testFixtures/fixture";

test.describe.parallel('Login Test', async () => {

  test("@smoke Valid Login Test", async ({ loginPage }) => {
    await loginPage.loginToHomePage(userName, password);
    await loginPage.verifyHomePage();
    await loginPage.verifyDashboard();

  });

  test('@reg Login with invalid mail', async ({ loginPage }) => {
    const creds = await getCredentialsByScenario('invalid cred');
    await loginPage.loginToHomePage(creds.username, creds.password);
    await loginPage.verifyInvalidCredatialMessage();

  });

  test('@reg Login with empty username', async ({ loginPage }) => {
    const creds = await getCredentialsByScenario('empty username');
    await loginPage.loginToHomePage(creds.username, creds.password);
    await loginPage.verifyRequireFieldMessage();
  });

  test('@reg Login with empty password', async ({ loginPage }) => {
    const creds = await getCredentialsByScenario('empty password');
    await loginPage.loginToHomePage(creds.username, creds.password);
    await loginPage.verifyRequireFieldMessage();
  });

  test('@smoke Verify that the dashboard loads correctly after login', async ({ loginPage }) => {
    await loginPage.loginToHomePage(userName, password);
    await loginPage.verifyDashboard();
    await loginPage.confirmkeywidgets();

  })

  test('@smoke Confirm the user can log out properly', async ({ loginPage }) => {
    await loginPage.loginToHomePage(userName, password);
    await loginPage.logout();
    await loginPage.verifyConformLogout();

  })

  test('@reg Login with empty password and empty username', async ({ loginPage }) => {
    const creds = await getCredentialsByScenario('both empty');
    await loginPage.loginToHomePage(creds.username, creds.password);
    await loginPage.verifyRequireFieldMessage();
  });


});
