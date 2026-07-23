const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Add New User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.clickAdmin();

    await adminPage.clickAdd();
    const createdUsername = await adminPage.fillUserDetails();
    console.log('Created User:', createdUsername);

    await expect(page).toHaveURL(/viewSystemUsers/);
});