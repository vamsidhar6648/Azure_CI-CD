import { Page, test, expect, Locator } from "@playwright/test";
import { baseURL, screenshotfilepath } from "./config";


export class commonActions {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openApplication() {
    await test.step(`Open the login page `, async () => {
      await this.page.goto(baseURL);
    })
  }

  async click(selector, label?: string) {
    await test.step(`Clicked on "${label}" button`, async () => {
      try {
        await this.page.locator(selector).waitFor({ state: "visible" });
        await this.page.locator(selector).click();
      } catch (error) {
        console.error(`Element '${label}' was not clickable:`);
        throw new Error(`Failed to click on '${label}': ${error.message}`);
      }
    });
  }

  async fill(selector, input: string, label?: string, isSensitive: boolean = false) {
    const displayValue = isSensitive ? '*****' : `"${input}"`;
    await test.step(`Entered ${displayValue} into the "${label || 'input'}" text box `, async () => {
      try {
        await this.page.locator(selector).fill(input);
      } catch (error) {
        console.error(`Element '${label}' was not allow to fill:`);
        throw new Error(`Failed to enter text in '${label}' text box: ${error.message}`);

      }

    });
  }

  async clickandfill(selector, input: string, label?: string, isSensitive: boolean = false) {
    const displayValue = isSensitive ? '*****' : `"${input}"`;
    const element = this.page.locator(selector);

    await test.step(`Entered ${displayValue} into the "${label || 'input'}" field`, async () => {
      try {
        await element.waitFor({ state: 'visible' });
        await element.click();
        await element.fill(input);
      } catch (error) {
        console.error(`Failed to fill "${label}" field:`, error);
        throw new Error(`Error filling input "${label}": ${error.message}`);
      }
    });
  }

  async selectCustomDropdown(selector, optionText: string, label: string) {
    await this.click(selector, `${label} Dropdown`);
    const correctedOption = await this.capitalizeFirstLetter(optionText);
    const optionLocator = await this.page.locator(`//span[text()="${correctedOption}"]`);
    await test.step(`Select ${label}: "${correctedOption}" option`, async () => {
      await optionLocator.click();
    });
  }

  async toggleCheckbox(selector, check: boolean, label?: string) {
    await test.step(`${check ? 'Check' : 'Uncheck'} ${label || 'checkbox'}`, async () => {
      if (check) {
        await this.page.locator(selector).check();
      } else {
        await this.page.locator(selector).uncheck();
      }
    });
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');

  }

  async wait(selector: string) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
  }
  async takeElementScreenshot(selector: Locator, name: string) {
    const filepath = `${screenshotfilepath}${name}.png`;
    await test.step(`Take screenshot of element: "${name}"`, async () => {
      const imageBuffer = await selector.screenshot({ path: filepath });
      test.info().attachments.push({ name: `Element Screenshot - ${name}`, contentType: 'image/png', body: imageBuffer, });
    });
  }


  async takeScreenshot(selector, name: string) {
    const timestamp = Date.now();
    const filepath = `${screenshotfilepath}${name}_${timestamp}.png`;
    await test.step(`Capture full screenshot highlighting the expected element: "${name}"`, async () => {
      await this.page.locator(selector).evaluate((el) => {
        (el as HTMLElement).style.boxShadow = '0 0 0 3px red';
      });

      const screenshot = await this.page.screenshot({ path: filepath, fullPage: true });

      // Remove the red border after screenshot
      await this.page.locator(selector).evaluate((el) => {
        (el as HTMLElement).style.boxShadow = '';
      });

      // Attach to report
      test.info().attachments.push({ name: 'Full Screenshot with Highlight', contentType: 'image/png', body: screenshot });
    });
  }

  async HandleAlert(page: Page) {
    page.on("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      await dialog.dismiss();
    });
  }

  async expectVisible(selector, label = 'element') {
    await test.step(`Expect "${label}" to be visible`, async () => {
      try {
        await expect(this.page.locator(selector)).toBeVisible();
      } catch (error: any) {
        const playwrightErrorMessage = error.message.split("\n").slice(0, 3).join("\n");
        const customMessage = `Expect "${label}" to be visible, but it was not.\n Playwright Error: ${playwrightErrorMessage}`;
        throw new Error(customMessage);
      }
    })
  }


  async expectToBe(selector, expectedValue: string, label = 'element') {
    await test.step(`Expect ${label} to be "${expectedValue}"`, async () => {
      try {
        const actual = await this.page.locator(selector).textContent();
        expect(actual?.trim()).toBe(expectedValue);
      } catch (error: any) {
        const playwrightErrorMessage = error.message?.split("\n").slice(0, 3).join("\n");
        const customMessage = `Expect "${label}" to be "${expectedValue}", but it was not.\nPlaywright Error: ${playwrightErrorMessage}`;
        throw new Error(customMessage);
      }
    });
  }


  async capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  async expectURL(url: string, label = 'element') {
    await test.step(`Expect "${label}" to have URL "${url}"`, async () => {
      expect(this.page.url()).toBe(url);
    });
  }


  async dateFormatter(input: string): Promise<string> {
    const normalized = input.replace(/[/.\s]/g, '-');
    const parts = normalized.split('-').map(Number);

    let year: number, month: number, day: number;

    if (parts[0] > 31) {
      // yyyy-mm-dd
      [year, month, day] = parts;
    } else if (parts[2] > 31) {
      // dd-mm-yyyy
      [day, month, year] = parts;
    } else {
      // mm-dd-yyyy
      [month, day, year] = parts;
    }

    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const yyyy = String(year);
    return `${mm}-${dd}-${yyyy}`;
  }

  async moduleSelect(moduleName: string) {
    await test.step(`Select "${moduleName}" module from sidebar`, async () => {
      const modules = this.page.locator("//ul[@class='oxd-main-menu']//span");
      const count = await modules.count();
      for (let i = 0; i < count; i++) {
        const text = await modules.nth(i).textContent();

        if (text?.trim().toLowerCase() === moduleName.trim().toLowerCase()) {
          await modules.nth(i).click();
          return;
        }
      }

      throw new Error(` Module "${moduleName}" not found in the sidebar.`);
    })
  }

}

