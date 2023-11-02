describe('profile page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login();
        cy.get('[data-cy=workout-page]').should('be.visible');
        cy.get('[data-cy=bottom-navigation] [data-cy=profile-tab]').click();
    })

    afterEach(() => {
        cy.logout()
    })

    it('should export recorded data to google sheets', () => {
        cy.get('[data-cy=export-button]').click();
        // TODO: Assert that the data is exported to google sheets
        cy.get('[data-cy=success-notification]').should('be.visible');
    });

    it('should logout the user', () => {
        cy.get('[data-cy=logout-button]').click();
        cy.get('[data-cy=landing-page]').should('be.visible');
        cy.reload();
        cy.get('[data-cy=landing-page]').should('be.visible');
    })

    it('should open the contact form', () => {
        cy.get('[data-cy=contact-button]').click();
        cy.get('[data-cy=contact-page]').should('be.visible');
        // todo feature: email should be prefilled
    })

//    it('should delete the user profile', () => {
//        cy.get('[data-cy=delete-profile-button]').click();
//        cy.get('[data-cy=delete-profile-modal]').should('be.visible');
//        cy.get('[data-cy=delete-profile-modal] [data-cy=delete-button]').click();
//        todo funny feature: ask the user the delete modal 3 times (are you sure? really sure? really really sure?)
//        cy.get('[data-cy=success-notification]').should('be.visible');
//        cy.get('[data-cy=landing-page]').should('be.visible');
//        // todo research: check that the user is deleted from the database
//    })
});