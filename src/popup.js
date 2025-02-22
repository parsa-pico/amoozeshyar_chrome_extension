document.getElementById('alertButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    alert('helllo');
  });
});
