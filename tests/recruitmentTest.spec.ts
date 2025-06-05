
import test from "../testFixtures/fixture";

test('@reg Navigate to Recruitment Page', async ({ recruitment }) => {
  await recruitment.verifyRecrutementPage();

})

test('@smoke Ensure a new candidate can be added', async ({ recruitment }) => {
  const firstname = 'admin';
  const lastname = 'admin';
  const email = 'admin@gmail.com'
  await recruitment.addCandidateInRec(firstname, lastname, email);
  await recruitment.verifyCandidateAdded();
})