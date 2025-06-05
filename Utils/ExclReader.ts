import ExcelJS from 'exceljs';
import path from 'path';
import { filepath } from './config';

type Credentials = {
  username: string;
  password: string;
};

export async function getCredentialsByScenario(scenarioName: string): Promise<Credentials> {

  const filePath = path.resolve(filepath);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet(2);
  if (!sheet) {
    throw new Error('No sheet found in the Excel file');
  }

  let result: Credentials | null = null;

  sheet.eachRow((row, rowNum) => {
    if (rowNum === 1) return; // skip header
    const scenario = row.getCell(1).text.trim().toLowerCase();
    if (scenario === scenarioName.trim().toLowerCase()) {
      result = {
        username: row.getCell(2).text,
        password: row.getCell(3).text
      };
    }
  });

  if (!result) throw new Error(`No credentials found for scenario: ${scenarioName}`);
  return result;
}   
