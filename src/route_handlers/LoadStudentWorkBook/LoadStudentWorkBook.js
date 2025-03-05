import { ApiFetch, frontBaseURL } from '../../utils/apiUtils';
import { insertAfter } from '../../utils/utils';
import { tableToJson } from './utils';
import { handleApiError } from './../../utils/apiUtils';

export default function LoadStudentWorkBook(params) {
  let userOID, extensionSecret;

  async function handleButtonClick() {
    try {
      const userOIDValue = userOID.value;
      const extensionSecretValue = extensionSecret.value;

      // Send data to background.js to save in local storage
      chrome.runtime.sendMessage(
        {
          action: 'saveData',
          data: {
            userOID: userOIDValue,
            extensionSecret: extensionSecretValue,
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
        userOID: userOIDValue,
        extensionSecret: extensionSecretValue,
      };

      const result = await ApiFetch('/extension/workbook', 'POST', body);
      console.log(result);
    } catch (e) {
      handleApiError(e);
    }
  }

  fetch(chrome.runtime.getURL('LoadStudentWorkBookContent.html'))
    .then((response) => response.text())
    .then((htmlContent) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      userOID = doc.getElementById('userOID');
      extensionSecret = doc.getElementById('extensionSecret');
      const button = doc.getElementById('scanButton');

      function checkInputs() {
        if (userOID.value && extensionSecret.value) {
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
          if (response.userOID) userOID.value = response.userOID;
          if (response.extensionSecret)
            extensionSecret.value = response.extensionSecret;
          checkInputs(); // Ensure button state updates based on stored values
        }
      });

      // Add event listeners
      userOID.addEventListener('input', checkInputs);
      extensionSecret.addEventListener('input', checkInputs);
      button.onclick = handleButtonClick;

      const form = document.getElementById('FORM');
      insertAfter(doc.body.firstChild, form);
    })
    .catch((error) => {
      console.error('Error fetching HTML content:', error);
    });
}
