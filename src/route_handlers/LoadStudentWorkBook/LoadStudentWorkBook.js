import { ApiFetch, frontBaseURL } from '../../utils/apiUtils';
import { insertAfter } from '../../utils/utils';
import { tableToJson } from './utils';
import { handleApiError } from './../../utils/apiUtils';

export default function LoadStudentWorkBook(params) {
  let extensionTokenInput;

  async function handleButtonClick() {
    try {
      const extensionTokenValue = extensionTokenInput.value;

      // Send data to background.js to save in local storage
      chrome.runtime.sendMessage(
        {
          action: 'saveData',
          data: {
            extensionToken: extensionTokenValue,
          },
        },
        (response) => {
          if (response && response.status === 'success') {
            console.log('Data saved successfully.');
          }
        }
      );

      let index = 0;
      const semesters = [];
      while (true) {
        let table = document.getElementById(`panel__0${index}`);
        if (!table) break;
        let tableJson = tableToJson(table);
        semesters.push(tableJson);
        index++;
      }

      const body = {
        semesters,
      };
      const headers = { extension_access_token: extensionTokenValue };
      const result = await ApiFetch(
        '/extension/workbook',
        'POST',
        body,
        headers
      );
      console.log(result);
      alert('انجام شد');
    } catch (e) {
      handleApiError(e);
    }
  }

  fetch(chrome.runtime.getURL('LoadStudentWorkBookContent.html'))
    .then((response) => response.text())
    .then((htmlContent) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      extensionTokenInput = doc.getElementById('amoozeshBugUserOID');
      const button = doc.getElementById('amoozeshBugScanButton');

      function checkInputs() {
        if (extensionTokenInput.value) {
          button.disabled = false;
          button.classList.add('amoozeshBug-scan-button', 'enabled');
        } else {
          button.disabled = true;
          button.classList.remove('enabled');
        }
      }

      // Fetch stored credentials from background.js
      chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
        if (response) {
          if (response.extensionToken)
            extensionTokenInput.value = response.extensionToken;
          checkInputs(); // Ensure button state updates based on stored values
        }
      });

      extensionTokenInput.addEventListener('input', checkInputs);
      button.onclick = handleButtonClick;

      const form = document.getElementById('FORM');
      insertAfter(doc.body.firstChild, form);
    })
    .catch((error) => {
      console.error('Error fetching HTML content:', error);
    });
}
