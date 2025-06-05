import test from "../testFixtures/fixture";
test('@reg Search Username In Admin Module', async ({ adminpage }) => {
    const username = 'adminfive'
    await adminpage.findUserInAdminModule(username);
})

test('@reg Verify No Records Found Message', async ({ adminpage }) => {
    const username = 'fgh'
    await adminpage.verifyNoRecorsFound(username);

})