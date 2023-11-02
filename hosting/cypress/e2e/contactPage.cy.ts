describe('profile page', () => {
    beforeEach(() => {
        cy.visit('/contact')
        cy.get('[data-cy=contact-page]').should('be.visible');
    })

    it('should send the email', () => {
        cy.get('[data-cy=email-input]').type(Cypress.env('email'));
        cy.get('[data-cy=topic-input]').type("Test topic");
        // type a long message
        cy.get('[data-cy=message-input]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc. Donec euismod, nisl eget aliquam luctus, nunc nunc aliquet nunc, nec aliquam nisl nunc sit amet nunc.");
        cy.get('[data-cy=send-message-button]').click();
        cy.get('[data-cy=success-notification]').should('be.visible');
    });
});