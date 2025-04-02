const axios = require('axios');
require('dotenv').config();
// Thay bằng URL của Web App

async function updateSheet() {
    const url = process.env.UPDATE_SHEET_API_APP_SCRIPT; // Đặt URL của Google Apps Script Web App ở đây

    try {
        const response = await axios.get(url);
        console.log('Response from doGet:', response.data); // Hiển thị kết quả trả về từ Web App
    } catch (error) {
        console.error('Error calling doGet:', error.message); // Hiển thị lỗi nếu có
    }
}

module.exports = updateSheet;