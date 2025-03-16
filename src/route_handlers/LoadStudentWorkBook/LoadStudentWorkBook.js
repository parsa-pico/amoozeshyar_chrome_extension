import { ApiFetch, frontBaseURL } from '../../utils/apiUtils';
import { insertAfter } from '../../utils/utils';
import { tableToJson } from './utils';
import { handleApiError } from './../../utils/apiUtils';
import HTML_File from '../../html/LoadStudentWorkBookContent.html'; // Imported HTML file

export default function LoadStudentWorkBook(params) {
  let extensionTokenInput;

  async function handleButtonClick() {
    try {
      const extensionTokenValue = extensionTokenInput.value;

      // Extract semester tables
      let index = 0;
      const semesters = [];
      while (true) {
        let table = document.getElementById(`panel__0${index}`);
        if (!table) break;
        let tableJson = tableToJson(table);
        semesters.push(tableJson);
        index++;
      }
      const lastSemesterTable = document.getElementById(`panel__1${index - 1}`);
      console.log('index', index);
      console.log('p', `panel__1${index}`);
      console.log('lastSemesterTable', lastSemesterTable);
      const lastSemesterStatus = lastSemesterTable.querySelector(
        'input[name="field(termStatus)"]'
      ).value;
      // Prepare the request body and headers
      const body = {
        semesters,
        lastSemesterStatus,
      };
      const headers = { extension_access_token: extensionTokenValue };

      // Make the API request
      const result = await ApiFetch(
        '/extension/workbook',
        'POST',
        body,
        headers
      );
      alert('انجام شد');

      // Open a new window with the specified URL
      window.open(
        `${frontBaseURL}/account/panel/charts/my-chart?gotoEditCourses=True`,
        '_blank'
      );
    } catch (e) {
      handleApiError(e);
    }
  }

  // Use the imported HTML content directly
  const htmlContent = HTML_File.replace('{{frontBaseURL}}', frontBaseURL);

  // Parse the HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Get references to the input and button elements
  extensionTokenInput = doc.getElementById('amoozeshBugUserOID');
  const button = doc.getElementById('amoozeshBugScanButton');

  // Function to enable/disable the button based on input
  function checkInputs() {
    if (extensionTokenInput.value) {
      button.disabled = false;
      button.classList.add('amoozeshBug-scan-button', 'enabled');
    } else {
      button.disabled = true;
      button.classList.remove('enabled');
    }
  }

  // Add event listeners
  extensionTokenInput.addEventListener('input', checkInputs);
  button.onclick = handleButtonClick;

  // Insert the parsed HTML into the DOM
  const form = document.getElementById('FORM');
  insertAfter(doc.body.firstChild, form);
}
