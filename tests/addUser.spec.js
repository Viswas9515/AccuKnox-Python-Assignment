const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Add New User', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // Go to Admin
    await dashboardPage.clickAdmin();

    // Open Add User page
    await adminPage.clickAdd();

    // Fill details and save user
    const username = await adminPage.fillUserDetails();

    console.log('Created Username:', username);

    // Verify success message
    await expect(page.locator('.oxd-toast')).toContainText('Successfully Saved');

});