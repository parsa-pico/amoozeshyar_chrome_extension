
document.getElementById("alertButton").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) return;

        // Inject the content script dynamically
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content-script.js"]
        }, () => {
            // Send a message to the content script after injection
            chrome.tabs.sendMessage(tabs[0].id, { action: "showAlert" });
        });
    });
});
