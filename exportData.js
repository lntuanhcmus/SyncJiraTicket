const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require("path");
require('dotenv').config();

const DOWNLOAD_FOLDER = process.env.DOWNLOAD_FOLDER; // Thư mục chứa file tải về
const FILE_PREFIX = process.env.FILE_PREFIX; // Tên file bắt đầu với chuỗi này
const JIRA_DOMAIN = process.env.JIRA_DOMAIN;

async function deleteOldFiles() {
    try {
        const files = fs.readdirSync(DOWNLOAD_FOLDER);
        files.forEach(file => {
            if (file.startsWith(FILE_PREFIX) && file.endsWith(".csv")) {
                const filePath = path.join(DOWNLOAD_FOLDER, file);
                fs.unlinkSync(filePath);
                console.log(`Deleted old file: ${file}`);
            }
        });
    } catch (error) {
        console.error("Error when deleting old file:", error);
    }
}
async function exportData() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Bước 1: Xóa file cũ trước khi export
        console.log("Deleting old CSV files...");
        await deleteOldFiles();

        // Mở Jira nhưng không tự động login
        await driver.get(JIRA_DOMAIN);

        await driver.wait(
            until.elementLocated(By.xpath("//h1[contains(text(), 'System Dashboard')]")),
            60000 // Chờ tối đa 60 giây
        );

        // Tiếp tục đến trang chứa danh sách công việc
        await driver.get(`${JIRA_DOMAIN}/projects/POT3008`);

        let link = await driver.wait(
            until.elementLocated(By.linkText("View all issues and filters")), 
            10000
        );

        await driver.wait(until.elementIsVisible(link), 5000);

        await link.click();

        await driver.wait(until.elementLocated(By.id('advanced-search')), 10000);
        let advancedSearch = await driver.findElement(By.id('advanced-search')); // Thay selector nếu khác
        
        await advancedSearch.clear();
        
        await advancedSearch.sendKeys(process.env.JIRA_QUERY); 
        
        await driver.sleep(1000); // Chờ dropdown mở
        await driver.wait(until.elementLocated(By.className("search-button")), 10000);
        await driver.findElement(By.className("search-button")).click();

        await driver.sleep(3000); // Chờ dropdown mở
        
        // Click nút Export
        await driver.wait(until.elementLocated(By.id("AJS_DROPDOWN__74")), 10000);
        await driver.findElement(By.id("AJS_DROPDOWN__74")).click();

        await driver.sleep(3000); // Chờ dropdown mở

        // Chọn định dạng file muốn export (VD: CSV)
        
        await driver.wait(until.elementLocated(By.id("allCsvFields")), 10000);
        await driver.findElement(By.id("allCsvFields")).click();
        

        await driver.wait(until.elementLocated(By.id("csv-export-dialog-export-button")), 10000);
        await driver.findElement(By.id("csv-export-dialog-export-button")).click();

        console.log("File export requested, waiting for download...");

    } catch (error) {
        console.error("Error:", error);
    } finally {
    }
};

module.exports = exportData;