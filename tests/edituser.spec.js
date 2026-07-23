const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Edit User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.clickAdmin();

    await adminPage.searchUser('Admin');
    await adminPage.clickEdit();
    await adminPage.updateUserStatus();

    await expect(page).toHaveURL(/viewSystemUsers/);
});