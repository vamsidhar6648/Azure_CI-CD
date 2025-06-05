import formDetails from '../test-data/formDetails.json';

export async function getPersonalDetails(index: 0) {
  return formDetails[index].personalDetails;
}

export async function getContactDetails(index: 0) {
  return formDetails[index].contactDetails;
}

export async function emergencyContactDetails(index: 0) {
  return formDetails[index].emergencyContactDetails;
}

export async function addDependents(index: 0) {
  return formDetails[index].addDependents;

}
