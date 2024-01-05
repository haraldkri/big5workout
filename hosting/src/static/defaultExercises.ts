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