import lastStatusConfirmStudentListHandler from './route_handlers/LastStatusConfirmStudentList';

function main() {
  const handlers = {
    'LastStatusConfirmStudentList': lastStatusConfirmStudentListHandler,
  };
  const fullUrl = window.location.href;
  const urlParams = new URLSearchParams(fullUrl.split('?')[1]);
  const form = urlParams.get('form');

  if (!form) {
    console.log('from param not found');
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
