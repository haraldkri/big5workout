import {ReactNode} from "react";

export type PropsWithChildren<P = unknown> = P & { children: ReactNode };

export type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode };

export type ExerciseValue = {
    weight?: number,
    duration?: number,
}

export type WorkoutWithId = Workout & {
    id: string,
}

export type Exercise = {
    createdAt?: number,
    id: string,
    name: {
        de: string,
        en: string
    },
    exerciseLink: string,
    previewImage: {
        srcUrl: string,
        storageUrl: string,
    },
    images: {
        srcUrl: string,
        storageUrl: string,
    }[]
}

export type Workout = {
    id: string,
    name: {
        de: string,
        en: string,
    },
    exerciseIds: string[],
    createdAt: number,
    lastUsed: number,
}