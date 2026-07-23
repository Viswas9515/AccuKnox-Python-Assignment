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

    // 1. Create temporary user
    await adminPage.clickAdd();
    const createdUser = await adminPage.fillUserDetails();

    // 2. Search and delete created user
    await adminPage.searchUser(createdUser);
    await adminPage.clickDelete();
    await adminPage.confirmDelete();

    // 3. Search user again to confirm deletion
    await adminPage.searchUser(createdUser);
    await expect(page.locator('.orangehrm-paper-container')).toContainText('No Records Found');
});