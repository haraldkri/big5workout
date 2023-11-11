describe('Login Redirect', () => {
    afterEach(() => {
        //cy.logout()
    })

    it('should show landing page initially', () => {
        // Visit the home page or any protected route
        cy.visit('/');

        // Assert that all necessary elements are visible
        cy.get('[data-cy=landing-page]').should('be.visible');
        cy.get('[data-cy=landing-page-title]').should('be.visible');
        cy.get('[data-cy=login-button]').should('be.visible');
        cy.get('[data-cy=landing-page-info]').should('be.visible');
        cy.get('[data-cy=imprint-button]').should('be.visible');
        cy.get('[data-cy=privacy-policy-button]').should('be.visible');
        cy.get('[data-cy=contact-button]').should('be.visible');
    });

    it('should open the pages required by law - imprint, privacy policy, contact', () => {
        // Assert that all necessary elements on the imprint page are visible
        cy.visit('/');
        cy.get('[data-cy=imprint-button]').click();

        cy.get('[data-cy=imprint-page]').should('be.visible');
        cy.get('[data-node-key=imprint] [role=tab][aria-selected=true]').should("be.visible");
        cy.get('[data-cy="official-info"]').should('be.visible');
        cy.get('[data-cy=usage-info]').should('be.visible');
        cy.get('[data-cy=credit-info]').should('be.visible');
        cy.get('[data-cy=copyright-info]').should('be.visible');

        // Assert that all necessary elements on the privacy policy page are visible
        cy.visit('/');
        cy.get('[data-cy=privacy-policy-button]').click();
        cy.get('[data-cy=privacy-policy-page]').should('be.visible');
        cy.get('[data-node-key=privacy-policy] [role=tab][aria-selected=true]').should("be.visible");
        cy.get('[data-cy=data-info]').should('be.visible');
        cy.get('[data-cy=cookies-info]').should('be.visible');
        cy.get('[data-cy=disclosure-of-information-info]').should('be.visible');

        // Assert that all necessary elements on the contact page are visible
        cy.visit('/');
        cy.get('[data-cy=contact-button]').click();
        cy.get('[data-cy=contact-page]').should('be.visible');
        cy.get('[data-node-key=contact] [role=tab][aria-selected=true]').should("be.visible");
        cy.get('[data-cy=input-info]').should('be.visible');
        cy.get('[data-cy=email-input]').should('be.visible');
        cy.get('[data-cy=subject-input]').should('be.visible');
        cy.get('[data-cy=message-input]').should('be.visible');
    })

    it.only('should log in the user', () => {
        cy.visit('/')

        cy.get('[data-cy=login-button]').should("be.visible");
        cy.login();
        cy.visit('/app/workout');

        cy.get('[data-cy=landing-page]').should('not.exist');
        cy.get('[data-cy=workout-select-page]').should('be.visible');
        cy.get('[data-cy=page-header]').should('be.visible');
        cy.get('[data-cy=page-header] [data-cy=workout-title]').should('be.visible');
        cy.get('[data-cy=page-header] [data-cy=application-logo]').should('be.visible');
        cy.get('[data-cy=start-workout-button]').should("be.visible");
        cy.get('[data-cy=bottom-navigation]').should('be.visible');
        cy.get('[data-cy=bottom-navigation] [data-node-key=workout]').should('be.visible');
        cy.get('[data-cy=bottom-navigation] [data-node-key=workout]').should('be.selected');
        cy.get('[data-cy=bottom-navigation] [data-node-key=profile]').should('be.visible');

        cy.get('[data-cy=bottom-navigation] [data-node-key=profile]').click();
        cy.get('[data-cy=profile-page]').should('be.visible');
        cy.get('[data-cy=bottom-navigation] [data-node-key=profile]').should('be.selected');
        cy.get('[data-cy=data-export-button]').should('be.visible');
        cy.get('[data-cy=logout-button]').should('be.visible');
        cy.get('[data-cy=contact-button]').should('be.visible');
        cy.get('[data-cy=delete-profile-button]').should('be.visible');
    })
});