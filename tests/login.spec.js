const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Login to OrangeHRM', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);

});