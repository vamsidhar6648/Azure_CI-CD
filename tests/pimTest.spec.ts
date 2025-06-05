
import test from "../testFixtures/fixture";

test('@smoke Ensure a new employee can be added', async ({ pimpage }) => {
  const firstname = 'admin';
  const lastname = 'admin';
  const employeeId = await pimpage.addEmployeeinPim(firstname,lastname);
  await pimpage.verifyEmployeeAdded(employeeId);
})


