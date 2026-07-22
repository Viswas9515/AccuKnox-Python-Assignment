const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Delete User', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.clickAdmin();

    // Create a new user
    await adminPage.clickAdd();
    const username = await adminPage.fillUserDetails();

    // Go back to Admin page
    await dashboardPage.clickAdmin();

    // Search for the newly created user
    await adminPage.searchUser(username);

    // Delete the user
    await adminPage.clickDelete();
    await adminPage.confirmDelete();

    // Verify deletion
    await expect(page.locator('.oxd-toast')).toContainText('Successfully Deleted');
});