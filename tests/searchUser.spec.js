const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const AdminPage = require('../pages/AdminPage');

test('Search User', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // Go to Admin page
    await dashboardPage.clickAdmin();

    // Search the user
    await adminPage.searchUser('fabian1784640209005');

    // Wait for search results
    await page.waitForTimeout(3000);
});