class AdminPage {
    constructor(page) {
        this.page = page;

        // Add User
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.userRole = page.locator('.oxd-select-text').first();
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' });
        this.status = page.locator('.oxd-select-text').nth(1);
        this.username = page.locator('input').nth(2);
        this.password = page.locator('input[type="password"]').first();
        this.confirmPassword = page.locator('input[type="password"]').nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });

        // Search User
        this.searchUsername = page.locator('.oxd-input').nth(1);
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    // Click Add Button
    async clickAdd() {
        await this.addButton.click();
    }

    // Fill User Details
    async fillUserDetails() {

        await this.userRole.click();
        await this.page.getByRole('option', { name: 'Admin' }).click();

        await this.employeeName.fill('a');
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        await this.status.click();
        await this.page.getByRole('option', { name: 'Enabled' }).click();

        const username = 'fabian' + Date.now();

        await this.username.fill(username);
        await this.password.fill('Admin@123');
        await this.confirmPassword.fill('Admin@123');

        await this.saveButton.click();

        // Wait for success message
        await this.page.waitForSelector('.oxd-toast', { timeout: 10000 });

        return username;
    }

    // Search User
    async searchUser(username) {
        await this.searchUsername.fill(username);
        await this.searchButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Click Edit
    async clickEdit() {
        await this.page.locator('button.oxd-icon-button:has(i.bi-pencil-fill)').first().click();
    }

    // Update User Status to Disabled
    async updateUserStatus() {

        await this.status.click();
        await this.page.getByRole('option', { name: 'Disabled' }).click();

        await this.saveButton.click();

        await this.page.waitForSelector('.oxd-toast', { timeout: 10000 });
    }

    // Click Delete
    async clickDelete() {
        await this.page.locator('button.oxd-icon-button:has(i.bi-trash)').first().click();
    }

    // Confirm Delete
    async confirmDelete() {
        await this.page.getByRole('button', { name: /Yes, Delete/i }).click();
    }
}

module.exports = AdminPage;