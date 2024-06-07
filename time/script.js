// script.js

function getCurrentTimestamp() {
    const now = Date.now(); // Get current timestamp in milliseconds (13 digits)
    const isoDate = new Date(now).toISOString();
    const currentTimestampElement = document.getElementById('currentTimestamp');
    const currentISOElement = document.getElementById('currentISO');

    currentTimestampElement.innerText = `Current Timestamp: ${now}`;
    currentISOElement.innerText = `Current ISO8601: ${isoDate}`;

    // Copy the current timestamp to clipboard
    navigator.clipboard.writeText(now).then(() => {

    }).catch(err => {
        alert('Failed to copy timestamp.');
    });
}

function convertToHuman() {
    const timestampInput = document.getElementById('timestamp').value;
    const result = document.getElementById('result');

    if (timestampInput) {
        const date = new Date(parseInt(timestampInput));
        result.innerText = `Human Readable Date: ${date.toISOString()}`;
    } else {
        result.innerText = 'Please enter a valid Unix timestamp.';
    }
}

function convertToTimestamp() {
    const dateInput = document.getElementById('date').value;
    const result = document.getElementById('result');

    if (dateInput) {
        const timestamp = new Date(dateInput).getTime();
        result.innerText = `Unix Timestamp: ${timestamp}`;
    } else {
        result.innerText = 'Please enter a valid date.';
    }
}
