import test from "../testFixtures/fixture";
import { getPersonalDetails, getContactDetails, addDependents } from "../Utils/jsonDataReader";

test.describe.parallel(async () => {

  test.beforeEach(async ({ myInfoPage }) => {
    await myInfoPage.OpenMyInfoModule();
  })
  test('@reg - Fill PersonalDetails at MyInfo Module', async ({ myInfoPage }) => {

    const input = await getPersonalDetails(0);

    await myInfoPage.fillPersonalDetails(input.firstname,input.middlename,input.lastname,input.id,input.otherid,input.num,input.date,input.nation,input.maritalstatus,input.dob,input.gender);
    await myInfoPage.verifySuccessPopupMessage();
    await myInfoPage.verifyPersonalDetails(`${input.firstname} ${input.middlename}`);

  });

  test('@reg - Fill ContactDetails at MyInfo Module', async ({ myInfoPage }) => {

    const input = await getContactDetails(0);

    await myInfoPage.fillContactDetails(input.street1,input.street2,input.city,input.state,input.postalcode,input.country,input.home,input.mobile,input.work,input.workemail,input.otheremail);
    await myInfoPage.verifySuccessPopupMessage();

  })

test('@reg - Fill EmergencyContactDetails at MyInfo Module', async ({ myInfoPage }) => {

  const { namee, relation, mobilenum } = await myInfoPage.fillEmergencyContacts();
  await myInfoPage.verifySuccessPopupMessage();
  await myInfoPage.verifyEmergencyContactAdded(namee, relation, mobilenum);

});


  test('@reg addDependents at my info module', async ({ myInfoPage }) => {

    const input = await addDependents(0)
    
    await myInfoPage.addDependents(input.name, input.relation, input.dob);
    await myInfoPage.verifySuccessPopupMessage();

  })

})
