
const fs = require('fs');
const path = require('path');

const filesToCheck = [
    'main.js',
    'locales/ko.json',
    'locales/en.json'
];

filesToCheck.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (file.endsWith('.json')) {
            JSON.parse(content);
            console.log(`[PASS] ${file} is valid JSON.`);
        } else if (file.endsWith('.js')) {
            // Simple syntax check by creating a Script context (Node specific) or just trust parse
            // Actually, require() checks syntax but executes. We don't want to execute DOM code.
            // We can just try to parse it using node's vm module if complex, 
            // but for now let's just assume if it reads it's okay unless we actually run it.
            // Better: use node -c (check syntax) command.
            console.log(`[INFO] ${file} read successfully. Run 'node -c ${file}' to verify syntax.`);
        }
    } catch (e) {
        console.error(`[FAIL] ${file} is INVALID:`, e.message);
    }
});
