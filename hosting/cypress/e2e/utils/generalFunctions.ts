export function generateRandomExerciseData(): { weight: number, duration: number } {
    return {
        weight: Math.floor(Math.random() * 500) + 1,
        duration: Math.floor(Math.random() * 300)
    }
}