const recruitLocs= {
  recruitment: "//span[text()='Recruitment']",
  addButton: "//button[.//i[contains(@class, 'bi-plus')]]",
  firstName: "input[name='firstName']",
  lastName: "input[name='lastName']",
  email: '//label[text()="Email"]/../../div/input',
  saveBtn: "button[type='submit']",
  successPopupMessage: "//p[contains(@class, 'oxd-text--toast-title')]",
  recruitmentPage: "//h6[text()='Recruitment']"
};

export default recruitLocs;
