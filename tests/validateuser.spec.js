const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Validate Updated User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.clickAdmin();

    // 1. Create unique user
    await adminPage.clickAdd();
    const createdUser = await adminPage.fillUserDetails();

    // 2. Search and update user status to Disabled
    await adminPage.searchUser(createdUser);
    await adminPage.clickEdit();
    await adminPage.updateUserStatus();

    // 3. Search updated user and confirm Disabled status in results table
    await adminPage.searchUser(createdUser);
    await expect(adminPage.tableBody).toContainText('Disabled');
});