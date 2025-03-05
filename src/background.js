// background.js (Service Worker)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Amoozeshyar Help Tool extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveData') {
    // Handle saving data (e.g., save to IndexedDB)
    console.log('Saving data:', message.data);
    sendResponse({ status: 'success' });
  }
});
