# Playwright Automation Framework (TypeScript)

A fast, scalable end-to-end testing framework using **Playwright** with **TypeScript**, built for clean architecture, reporting, and extensibility.


## Tech Stack

-  Playwright + TypeScript – Static typing and modern JS features.
-  Page Object Model – Reusable and clean test architecture.
-  Allure Reporting – Beautiful test reports with screenshots.
-  ExcelJS – Data-driven testing with Excel files.
-  Screenshots on Failure – Automatic screenshots upon test failure.
---

## Clone the repository

```cmd
git clone https://github.com/TeamQM/Playwright_with_TS.git
```

## Configuration Setup (Important)

> **Note:** This project requires a `config.ts` file inside the `Utils` folder. This file is excluded from version control via `.gitignore` for security reasons.

Create a file at:  
`Utils/config.ts`

And add the following structure:

```ts
export const baseURL = "";             // Base URL of the application under test
export const userName = "";            // Your username
export const password = "";            // Your password
export const screenshotfilepath = "";  // Path to save screenshots
export const filepath = "./test-data/passwords.xlsx";
```

### Install dependencies

```cmd
npm init playwright@latest
```

### Allure Instalation & Setup

```cmd
npm i -D @playwright/test allure-playwright
npm install --save-dev allure-commandline
```

### Allure-test-report

```cmd
npm run allure
```

### Allure-single-test-report

```cmd
npm run allure-single
```

### html-test-report

```cmd
npm run html
```

## Run Application

### Single Test Case(Login)

```cmd
npm run login
```

### Run All Tests

```cmd
npm run parallel       # Run all tests in parallel

npm run test:serial    # Run all tests sequentially in Chromium (one worker)
```

### Run Tests in Specific Browsers

```cmd
npm run chrome   # Run tests only in Chromium (Chrome)

npm run firefox  # Run tests only in Firefox

npm run safari   # Run tests only in WebKit (Safari)
```

### Smoke Suite

```cmd
npm run smoke-parallel   # Run all @smoke tests in parallel (default browser(s))

npm run smoke-serial     # Run all @smoke tests sequentially in Chromium only

npm run smoke            # Run all @smoke tests in Chromium (can be parallel)
```

### Regression Suite

```cmd
npm run reg-parallel     # Run all @reg tests in parallel (all configured browsers)

npm run reg-serial       # Run all @reg tests sequentially in Chromium only

npm run reg              # Run all @reg tests in Chromium (parallel)
```



