import fs from 'fs';
import path from 'path';

async function globalSetup() { 
  const foldersToDelete = [
    path.join(__dirname, '..', 'allure-results'),
    path.join(__dirname, '..', 'allure-report'),
    path.join(__dirname, '..', 'allure-single-html-report'),
  ];

  for (const folder of foldersToDelete) {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log(`Deleted: ${folder}`);
    }
  }     //To Delete Allure Reports

  const filePath = path.join(__dirname, '..', 'allure-results', 'environment.properties');

  const localTime = new Date().toLocaleString(); // <-- System's local time

  const content = `
Browser=Chromium
ExecutionTime=${localTime}
Tester=QA Team
  `.trim();

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);

} //To Store This Data in Allure Environment

export default globalSetup;
