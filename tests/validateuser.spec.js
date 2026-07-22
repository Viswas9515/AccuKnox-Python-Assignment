const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Validate Updated User', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // Open Admin
    await dashboardPage.clickAdmin();

    // Add User
    await adminPage.clickAdd();
    const username = await adminPage.fillUserDetails();

    // Go back to Admin page
    await dashboardPage.clickAdmin();

    // Search User
    await adminPage.searchUser(username);

    // Edit User
    await adminPage.clickEdit();
    await adminPage.updateUserStatus();

    // Verify success message
    await expect(page.locator('.oxd-toast'))
        .toContainText('Successfully Updated');
});