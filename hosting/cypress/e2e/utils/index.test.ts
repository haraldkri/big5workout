import {generateRandomExerciseData} from "./generalFunctions.ts";

describe('generateRandomExerciseData', () => {
    it('should generate valid random exercise data', () => {
        const exerciseData = generateRandomExerciseData();

        // Check if the object has 'weight' and 'duration' keys
        expect(exerciseData).toHaveProperty('weight');
        expect(exerciseData).toHaveProperty('duration');

        // Check if 'weight' is a number within the specified range
        expect(exerciseData.weight).toBeGreaterThanOrEqual(0);
        expect(exerciseData.weight).toBeLessThanOrEqual(500);

        // Check if 'duration' is a number within the specified range
        expect(exerciseData.duration).toBeGreaterThanOrEqual(0);
        expect(exerciseData.duration).toBeLessThanOrEqual(300);
    });
});
