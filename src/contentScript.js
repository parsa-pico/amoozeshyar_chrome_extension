import lastStatusConfirmStudentListHandler from './route_handlers/LastStatusConfirmStudentList/LastStatusConfirmStudentList';

const handlers = {
  'LastStatusConfirmStudentList': lastStatusConfirmStudentListHandler,
};

function main() {
  const form = getFormParam();
  if (!form) {
    return;
  }

  const handler = handlers[form];

  if (handler) {
    console.log('handler: ', form);
    handler();
  } else {
    console.log('no handler for this page');
  }
}
main();

function getFormParam() {
  const fullUrl = window.location.href;
  const urlParams = new URLSearchParams(fullUrl.split('?')[1]);
  const form = urlParams.get('form');

  if (!form) {
    console.log('form param not found');
    return null;
  }

  return form;
}
