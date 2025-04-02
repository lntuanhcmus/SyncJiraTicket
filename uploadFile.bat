@echo off

rem Path to the folder containing the CSV file
set "SOURCE_FOLDER=C:\Users\leanh\Downloads"  rem Replace with the path to the folder containing the CSV file

rem Path to the Google Drive folder
set "DESTINATION_FOLDER=G:\My Drive\Kiosk\"  rem Replace with the path to the Google Drive folder

rem Original file name and new file name
set "FILE_NAME=BE Jira"  rem Original file name
set "NEW_NAME=[Export]_BE_Jira.csv"  rem New file name

rem Full path to the new file
set "DESTINATION_FILE=%DESTINATION_FOLDER%\%NEW_NAME%"

rem Check if the destination file exists
if exist "%DESTINATION_FILE%" (
    echo File %NEW_NAME% already exists. Deleting old file...
    del "%DESTINATION_FILE%"
    echo Old file has been deleted.
)

rem Find files with the format "BE Jira *"
for %%f in ("%SOURCE_FOLDER%\%FILE_NAME%*.csv") do (
    echo Found file: %%f
    rem Copy the file to the Google Drive folder with the new name
    copy "%%f" "%DESTINATION_FILE%"
    echo File copied to Google Drive with the name: %NEW_NAME%
)

echo Finished copying file to Google Drive!