const adminLocs = {
  username: '//label[text()="Username"]/../../div/input',
  verifyUsername: "(//div[@class='oxd-table-cell oxd-padding-cell'])[2]",
  search: 'button[type="submit"]',
  noRecordsLocator: "//span[text()='No Records Found']",
  userManagement: "//span[contains(text(),'User Management')]",
  user: "//a[text()='Users']"
};

export default adminLocs;
