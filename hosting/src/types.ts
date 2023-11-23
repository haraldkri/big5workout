import {ReactNode} from "react";

export type PropsWithChildren<P = unknown> = P & { children: ReactNode };

export type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode };

export type ExerciseValue = {
    weight?: number,
    duration?: number,
}

export type Workout = {
    key: string,
    germanName: string,
    englishName: string,
    exerciseIds: string[],
    createdAt: number,
    lastUsed: number,
}

export type WorkoutWithId = Workout & {
    id: string,
}