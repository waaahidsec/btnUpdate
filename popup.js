document.addEventListener('DOMContentLoaded', function () {
    const btnRelevant = document.getElementById('btnRelevant');
    const btnIrrelevant = document.getElementById('btnIrrelevent');
    const btnUpdateExtension = document.getElementById('btnUpdateExtension');

    // Handle Relevant All button click
    if (btnRelevant) {
        btnRelevant.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'clickRelevantAll' }, (response) => {
                    if (response && response.success) {
                        console.log(response.message);
                    } else {
                        console.error('Error clicking RelevantAll:', response.error || 'Unknown error');
                    }
                });
            });
        });
    }

    // Handle Irrelevant All button click
    if (btnIrrelevant) {
        btnIrrelevant.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'clickIrrelevantAll' }, (response) => {
                    if (response && response.success) {
                        console.log(response.message);
                    } else {
                        console.error('Error clicking IrrelevantAll:', response.error || 'Unknown error');
                    }
                });
            });
        });
    }

    // Handle Update button click
    if (btnUpdateExtension) {
        btnUpdateExtension.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: clickButtonMultipleTimes
                }, () => {
                    console.log('Update button clicked multiple times.');
                });
            });
        });
    }

    // Function to click the 'Update' button multiple times
    function clickButtonMultipleTimes() {
        const totalClicks = 5;  // Number of times to click
        let clicks = 0;

        function clickButton() {
            const button = document.getElementById('btnUpdate');
            if (button) {
                button.click();
                console.log(`Update button clicked ${clicks + 1} times.`);
            } else {
                console.error('Update button not found.');
            }
        }

        function performClick() {
            if (clicks < totalClicks) {
                clickButton();
                clicks++;
                requestAnimationFrame(performClick);
            } else {
                console.log('Finished clicking the Update button.');
            }
        }

        performClick();
    }
});
