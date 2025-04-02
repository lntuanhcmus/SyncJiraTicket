# 🚀 Automation Workflow for Exporting and Syncing Data

## 📌 Overview
This automation workflow consists of three main steps:
1. **Export Data from Jira** using Selenium.
2. **Copy and Rename CSV File** to Google Drive.
3. **Update Google Sheets** using Google Apps Script API.

Each step runs sequentially, ensuring that data is processed correctly.

---

## 🛠️ Installation
### 1️⃣ Clone the Repository
```sh
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```env
JIRA_DOMAIN=<JIRA_DOMAIN>
DOWNLOAD_FOLDER=<DOWNLOAD_FOLDER>
FILE_PREFIX=<FILE_PREFIX>
JIRA_QUERY=<JIRA_QUERY>
UPDATE_SHEET_API_APP_SCRIPT=<UPDATE_SHEET_API_APP_SCRIPT>
```
---

## 🔄 Workflow Steps
### 1️⃣ **Export CSV from Jira**
- Uses **Selenium** to log in manually.
- Waits until the **System Dashboard** (`<h1>`) appears.
- Automatically exports the latest CSV file.

### 2️⃣ **Move and Rename File**
- Deletes old CSV files matching `BE Jira * .csv`.
- Copies the newly exported file to Google Drive.
- Renames it to `[Export]_BE_Jira.csv`.

### 3️⃣ **Update Google Sheet**
- Calls Google Apps Script API to process and update Google Sheets.
- Returns a response (`Done`) on successful completion.

---

## 🚀 Running the Automation
To start the full workflow, run:
```sh
node automation.js or npm start
```

This will:
1. Export data from Jira.
2. Copy and rename the file in Google Drive.
3. Trigger an API to update Google Sheets.

Each step logs success or failure messages.

---

## 🛠️ Debugging
- **Check Logs**: All steps print logs in the terminal.
- **Verify File Path**: Ensure correct paths in `.env`.
- **Selenium Issues**: Ensure Jira page structure is unchanged.
- **Google Drive Sync**: Wait **5-10 seconds** before calling API.

---

## 📌 Notes
- **Manual login** is required for Jira at the start.
- **Ensure Google Drive syncs** before updating Google Sheets.
- **Use Git Ignore** to exclude `.env` and sensitive files:
  ```plaintext
  .env
  node_modules/
  *.log
  ```

---

## 📜 License
This project is for internal use. Modify and extend as needed.

---

🎯 **Developed by:** Tuan Le

