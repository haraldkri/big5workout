import sanitizeHtml from "sanitize-html";

export function sanitizeUserInput(input: string) {
    return sanitizeHtml(input, {
        disallowedTagsMode: 'escape',
        allowedTags: [],
        allowedAttributes: false
    })
}