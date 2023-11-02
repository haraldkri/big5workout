import {inputExerciseData} from "./utils/cypressFunctions";
import {generateRandomExerciseData} from "./utils/generalFunctions";

describe('record workout', () => {
    beforeEach(() => {
        cy.visit('/workout')
        cy.login();
        cy.get('[data-cy=workout-page]').should('be.visible');
    })
    afterEach(() => {
        cy.logout()
    })

    it('should record workout', () => {
        // Start workout
        cy.get('[data-cy=start-workout-button]').should("be.visible");
        cy.get('[data-cy=start-workout-button]').click();
        cy.get('[data-cy=workout-exercise-list]').should('be.visible');
        let exerciseData: { weight: number, duration: number }[] = [];

        // Input random workout data for each exercise
        cy.get('[data-cy=workout-exercise]').each(($el, _index, _$list) => {
            const data = generateRandomExerciseData();
            exerciseData.push(data)
            inputExerciseData($el, data.weight, data.duration);
        })

        // Finish workout
        cy.get('[data-cy=finish-workout-button]').click();
        cy.get('[data-cy=workout-result-success]').should('be.visible');

        // Check that the new values are displayed in the new workout
        cy.get('[data-cy=start-workout-button]').click();
        cy.get('[data-cy=workout-exercise]').each(($el, index, _$list) => {
            cy.wrap($el).get('[data-cy=weight-input]').should('have.value', exerciseData[index].weight);
            cy.wrap($el).get('[data-cy=duration-input]').should('have.value', exerciseData[index].duration);
        })
    });
});