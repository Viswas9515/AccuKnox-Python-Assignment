const { expect } = require('@playwright/test');

class DashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.adminMenu = page.getByRole('link', { name: 'Admin' });
    }

    async clickAdmin() {
        await this.adminMenu.click();
        await expect(this.page).toHaveURL(/.*admin\/viewSystemUsers/);
    }
}

module.exports = DashboardPage;