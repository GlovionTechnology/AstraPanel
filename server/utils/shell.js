// server/utils/shell.js
// This function represents the "Skeleton's hands". 
// Commands come from the Brain (Cloud) or Local Logic, and this executes them.

const { exec } = require('child_process');
const util = require('util');

// Convert exec to Promise so we can use 'await' (Modern Way)
const execPromise = util.promisify(exec);

const runCommand = async (command) => {
    try {
        // Run the command
        const { stdout, stderr } = await execPromise(command);
        
        // If there's a warning, log it but don't stop
        if (stderr) {
            console.warn(`⚠️ Command Warning: ${stderr}`);
        }

        return stdout.trim(); // Return clean output
    } catch (error) {
        console.error(`❌ Execution Failed: ${command}`);
        throw new Error(error.message); // Inform controller that it failed
    }
};

module.exports = runCommand;
