chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request && request.action) {
        switch (request.action) {
            case 'clickRelevantAll':
                handleButtonClick('btnRelevantAll', sendResponse);
                break;
            case 'clickIrrelevantAll':
                handleButtonClick(sendResponse); // Updated for 'Irrelevant' buttons
                break;
            default:
                console.error('Unknown action:', request.action);
                sendResponse({ success: false, error: 'Unknown action' });
        }
    } else {
        console.error('Invalid message received:', request);
        sendResponse({ success: false, error: 'Invalid message structure' });
    }
    return true; // Indicates an async response
});

// Updated helper function to handle clicking all buttons with the same ID
function handleButtonClick(sendResponse) {
    const buttons = document.querySelectorAll('[id="btnIrrelevent"]'); // Handles multiple elements with same ID
    if (buttons.length > 0) {
        buttons.forEach(button => button.click());
        console.log(`All buttons with ID 'btnIrrelevent' clicked successfully.`);
        sendResponse({ success: true, message: `All buttons with ID 'btnIrrelevent' clicked.` });
    } else {
        console.error(`No buttons with ID 'btnIrrelevent' found.`);
        sendResponse({ success: false, error: `No buttons with ID 'btnIrrelevent' found.` });
    }
}
