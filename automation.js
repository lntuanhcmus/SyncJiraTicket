const exportData = require("./exportData");
const runBatch = require("./runBatch");
const updateSheet = require("./updateSheet");

async function main() {
    try {
        console.log("Step 1: Exporting CSV from Jira...");
        let result1 = await exportData();
        console.log(result1);

        console.log(`Wait 5 seconds for file downloaded...`);
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log("Step 2: Copying file to Google Drive...");
        let result2 = await runBatch();
        console.log(result2);

        console.log(`Wait 30 seconds for file synchronization...`);
        await new Promise(resolve => setTimeout(resolve, 30000));

        console.log("Step 3: Updating data to Google Sheet...");
        let result3 = await updateSheet();
        console.log(result3);

        console.log("All steps have been successfully completed!");
    } catch (error) {
        console.error("Error in the process:", error);
    }
}

main();