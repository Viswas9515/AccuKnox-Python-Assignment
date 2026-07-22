# AccuKnox User Management Tests

## Project Overview
This project automates the User Management module of OrangeHRM using Playwright with JavaScript and the Page Object Model (POM).

## Application Under Test
https://opensource-demo.orangehrmlive.com/

## Test Scenarios Automated
- Login
- Navigate to Admin Module
- Add a New User
- Search User
- Edit User Details
- Validate Updated Details
- Delete User

## Project Structure
```
pages/
tests/
test-data/
playwright.config.js
package.json
```

## Setup

```bash
npm install
npx playwright install
```

## Run All Tests

```bash
npx playwright test
```

## Run Chromium Only

```bash
npx playwright test --project=chromium
```

## Playwright Version

```bash
npx playwright --version
```

## Framework
- Playwright
- JavaScript
- Page Object Model (POM)

## Author
Viswas Pindi is text? 