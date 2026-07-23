const { expect } = require('@playwright/test');

class AdminPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Buttons
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });

        // Add/Edit Form Inputs
        this.userRoleDropdown = page.locator('.oxd-select-text').first();
        this.statusDropdown = page.locator('.oxd-select-text').nth(1);
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');

        this.usernameInput = page.locator(
            '//label[text()="Username"]/ancestor::div[contains(@class,"oxd-input-group")]//input'
        );
        this.passwordInput = page.locator('input[type="password"]').first();
        this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);

        // Search Input
        this.searchUsernameInput = page.locator(
            '//label[text()="Username"]/ancestor::div[contains(@class,"oxd-input-group")]//input'
        );

        // Table & Confirmation Locators
        this.editButton = page.locator('button i.bi-pencil-fill').first();
        this.deleteButton = page.locator('button i.bi-trash').first();
        this.confirmDeleteButton = page.locator('.oxd-sheet button.oxd-button--label-danger');
        
        // Table Body & Toast Locators
        this.tableBody = page.locator('.oxd-table-body');
        this.toastMessage = page.locator('.oxd-toast');
    }

    async clickAdd() {
        await this.addButton.click();
        await expect(this.page).toHaveURL(/.*admin\/saveSystemUser/);
    }

    async fillUserDetails() {
        // 1. Role
        await this.userRoleDropdown.click();
        await this.page.getByRole('option', { name: 'Admin' }).click();

        // 2. Employee Name
        await this.employeeNameInput.fill('a');
        const optionItem = this.page.locator('.oxd-autocomplete-option span').first();
        await optionItem.waitFor({ state: 'visible', timeout: 10000 });
        await optionItem.click();

        // 3. Status
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: 'Enabled' }).click();

        // 4. Credentials
        const newUsername = 'user' + Date.now();
        await this.usernameInput.fill(newUsername);
        await this.passwordInput.fill('Admin@123');
        await this.confirmPasswordInput.fill('Admin@123');

        // 5. Save & wait for API
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/api/v2/admin/users') &&
                    (response.status() === 200 || response.status() === 201)
            ),
            this.saveButton.click()
        ]);

        await expect(this.page).toHaveURL(/.*admin\/viewSystemUsers/, { timeout: 15000 });
        return newUsername;
    }

    async searchUser(username) {
        await this.searchUsernameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchUsernameInput.fill('');
        await this.searchUsernameInput.fill(username);

        await Promise.all([
            this.page.waitForResponse((response) =>
                response.url().includes('/api/v2/admin/users')
            ),
            this.searchButton.click()
        ]);
    }

    async clickEdit() {
        await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.editButton.click();
    }

    async updateUserStatus() {
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: 'Disabled' }).click();

        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/api/v2/admin/users') &&
                    response.status() === 200
            ),
            this.saveButton.click()
        ]);

        await expect(this.page).toHaveURL(/.*admin\/viewSystemUsers/, { timeout: 15000 });
    }

    async clickDelete() {
        await this.deleteButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.deleteButton.click();
    }

    async confirmDelete() {
        await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 10000 });
        await Promise.all([
            this.page.waitForResponse((response) =>
                response.url().includes('/api/v2/admin/users')
            ),
            this.confirmDeleteButton.click()
        ]);
    }
}

module.exports = AdminPage;