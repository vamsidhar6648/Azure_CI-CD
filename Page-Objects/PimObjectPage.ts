
const PimLocs = {
    pim: "//span[text()='PIM']",
    addEmployee: "//a[text()='Add Employee']",
    firstName: "input[name='firstName']",
    lastName: "input[name='lastName']",
    saveBtn: "button[type='submit']",
    successPopupMessage: "//p[contains(@class, 'oxd-text--toast-title')]",
    personalDetails: "//h6[text()='Personal Details']",
    employeeId: '//label[text()="Employee Id"]/../../div/input',
    recordsFound:"(//span[@class='oxd-text oxd-text--span'])[1]",
    employList:"//a[text()='Employee List']",
    employeeIdField: '//label[text()="Employee Id"]/../../div/input',
    searchBtn:"button[type='submit']",
    verifyUserId:"(//div[@class='oxd-table-cell oxd-padding-cell'])[2]",

};

export default PimLocs;


