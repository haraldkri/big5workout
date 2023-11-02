export function inputExerciseData(element: JQuery<HTMLElement>, weight: number, duration: number) {
    selectPickerWeightInput(element, weight);
    selectPickerDurationInput(element, duration)
}

export function selectPickerWeightInput(element: JQuery<HTMLElement>, value: number) {
    let values = value.toString().split('.');
    cy.wrap(element).get('[data-cy=weight-input]').click();
    cy.get('input-picker-modal').should('be.visible');
    cy.get('input-picker-modal').within(() => {
        cy.get(`[data-cy=picker-column-0] [data-cy=value-${values[0]}]`).scrollIntoView().click();

        if (values.length > 1) {
            cy.get(`[data-cy=picker-column-1] [data-cy=value-${values[1]}]`).scrollIntoView().click();
        }

        cy.get('[data-cy=picker-confirm-button]').click();
    })
}

export function selectPickerDurationInput(element: JQuery<HTMLElement>, value: number) {
    let valueMinutes = Math.floor(value / 60);
    let valueSeconds = value % 60;
    cy.wrap(element).get('[data-cy=duration-input]').click();
    cy.get('input-picker-modal').should('be.visible');
    cy.get('input-picker-modal').within(() => {
        cy.get(`[data-cy=picker-column-0] [data-cy=value-${valueMinutes}]`).scrollIntoView().click();
        cy.get(`[data-cy=picker-column-1] [data-cy=value-${valueSeconds}]`).scrollIntoView().click();


        cy.get('[data-cy=picker-confirm-button]').click();
    })
}