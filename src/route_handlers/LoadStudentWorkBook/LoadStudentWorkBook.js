import { ApiFetch } from '../../utils/apiUtils';
import {
  getBeautifulContainer,
  getBeautifulTextInput,
  getDivLikeButton,
} from '../../utils/HtmlElements';
import { insertAfter } from '../../utils/utils';
import { tableToJson } from './utils';
import { handleApiError } from './../../utils/apiUtils';

export default function LoadStudentWorkBook(params) {
  // Declare the userOID and extensionSecret here so they can be used within the handleButtonClick function
  let userOID, extensionSecret;

  async function handleButtonClick() {
    try {
      // Get the values from the input fields
      const userOIDValue = userOID.value;
      const extensionSecretValue = extensionSecret.value;

      // Prepare the data from the tables
      let index = 0;
      const data = [];
      while (true) {
        let table = document.getElementById(`panel__0${index}`);
        if (!table) break;
        let tableJson = tableToJson(table);
        data.push(tableJson);
        index++;
      }
      const body = {
        data,
        userOID: userOIDValue,
        extensionSecret: extensionSecretValue,
      };
      const result = await ApiFetch(
        'http://127.0.0.1:8000/extension/workbook',
        'POST',
        body
      );

      // Send a message to the background script (if necessary)
      chrome.runtime.sendMessage({ action: 'saveData', data: 'someData' });
      console.log(result);
    } catch (e) {
      handleApiError(e);
    }
  }

  const container = getBeautifulContainer();

  // Create the button and disable it initially
  const button = getDivLikeButton('کارنامه رو اسکن کن');
  button.disabled = true; // Disable button initially
  button.style.backgroundColor = '#ccc'; // Change color to indicate disabled state
  button.onclick = handleButtonClick;

  const inputsContainer = document.createElement('div');
  inputsContainer.style.padding = '0 4rem';
  inputsContainer.style.marginBottom = '2rem';

  // Create the input fields and assign them to the userOID and extensionSecret variables
  userOID = getBeautifulTextInput('آیدی اکستنشن');
  extensionSecret = getBeautifulTextInput('رمز اکستنشن');

  // Function to check if both inputs are filled
  function checkInputs() {
    if (userOID.value && extensionSecret.value) {
      button.disabled = false;
      button.style.backgroundColor = '#4CAF50'; // Change color to indicate enabled state
    } else {
      button.disabled = true;
      button.style.backgroundColor = '#ccc'; // Change color back to disabled state
    }
  }

  // Add event listeners to inputs to enable/disable the button based on input values
  userOID.addEventListener('input', checkInputs);
  extensionSecret.addEventListener('input', checkInputs);

  // Append the inputs and button to the container
  inputsContainer.appendChild(userOID);
  inputsContainer.appendChild(extensionSecret);

  container.appendChild(inputsContainer);
  container.appendChild(button);

  const form = document.getElementById('FORM');
  insertAfter(container, form);
}
