import { sanitizeUserInput } from './sanitizeUserInput'; // Update with the correct path to your file

describe('sanitizeUserInput function', () => {
    it('should sanitize HTML tags from input', () => {
        const inputWithHtml = '<p>Hello, <b>World</b>!</p>';
        const sanitizedInput = sanitizeUserInput(inputWithHtml);
        const expectedOutput = '&lt;p&gt;Hello, &lt;b&gt;World&lt;/b&gt;!&lt;/p&gt;';

        expect(sanitizedInput).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const emptyInput = '';
        const sanitizedInput = sanitizeUserInput(emptyInput);
        const expectedOutput = '';

        expect(sanitizedInput).toEqual(expectedOutput);
    });

    it('should sanitize potentially malicious input', () => {
        const maliciousInput = '<script>alert("Hello, I am a script!");</script>';
        const sanitizedInput = sanitizeUserInput(maliciousInput);
        const expectedOutput = '&lt;script&gt;alert("Hello, I am a script!");&lt;/script&gt;';

        expect(sanitizedInput).toEqual(expectedOutput);
    });

    // Add more test cases as needed
});
