// background.js (Service Worker)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Amoozeshyar Help Tool extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveData') {
    chrome.storage.local.set(message.data, () => {
      console.log('Credentials saved securely.');
      sendResponse({ status: 'success' });
    });
    return true; // Keep message channel open for async response
  }

  if (message.action === 'getData') {
    chrome.storage.local.get(['extensionToken'], (result) => {
      sendResponse({
        extensionToken: result.extensionToken || '',
      });
    });
    return true; // Keep message channel open for async response
  }
});
