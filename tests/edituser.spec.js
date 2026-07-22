const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Edit User', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // Go to Admin page
    await dashboardPage.clickAdmin();

    // Search the user
    await adminPage.searchUser('fabian1784708611533');

    // Click Edit
    await adminPage.clickEdit();

    // Change Status to Disabled
    await adminPage.updateUserStatus();

    // Verify success message
    await expect(page.locator('.oxd-toast'))
        .toContainText('Successfully Updated');
});