import fs from 'fs';
import path from "path";

export default function fillEmailTemplate(
    userName: string,
    userEmail: string,
    subject: string,
    message: string,
) {
    const templatePath = path.resolve(__dirname, './email_template/emptyTemplate.html');
    let template = '';
    try {
        template = fs.readFileSync(templatePath, 'utf8');
    } catch (err) {
        console.error('Error reading template file:', err);
        return '';
    }
    const formattedMessage = message.replace(/\n/g, '<br/>');

    template = replaceAllOccurrences(template, 'userName', userName || 'GuestUser');
    template = replaceAllOccurrences(template, 'userEmail', userEmail || 'not provided');
    template = replaceAllOccurrences(template, 'subject', subject || 'not provided');
    template = replaceAllOccurrences(template, 'message', formattedMessage || 'not provided');

    return template;
}

// Replace all occurrences of a placeholder in the template
function replaceAllOccurrences(template: string, placeholder: string, value: string) {
    const regex = new RegExp(`{{${placeholder}}}`, 'g');
    return template.replace(regex, value);
}