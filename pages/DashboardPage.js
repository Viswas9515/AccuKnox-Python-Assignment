class DashboardPage {
    constructor(page) {
        this.page = page;
        this.adminMenu = page.getByRole('link', { name: 'Admin' });
    }

    async clickAdmin() {
        await this.adminMenu.click();

        // Wait until the Admin page has loaded
        await this.page.waitForURL(/admin/);
    }
}

module.exports = DashboardPage;