const { exec } = require("child_process");

function runBatch() {
    return new Promise((resolve, reject) => {
        exec("uploadFile.bat", (error, stdout, stderr) => {
            if (error) {
                reject(`Error when running batch ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`Batch script error: ${stderr}`);
                return;
            }
            console.log(stdout);
            resolve("File copied successfully!");
        });
    });
};
module.exports = runBatch;