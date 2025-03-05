import ConfirmStudent from './route_handlers/ConfirmStudent/ConfirmStudent';
import LoadStudentWorkBook from './route_handlers/LoadStudentWorkBook/LoadStudentWorkBook';

const handlers = {
  'ConfirmStudent': ConfirmStudent,
  'LoadStudentWorkBook': LoadStudentWorkBook,
};

function main() {
  const form = getPageSubject();
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

function getPageSubject() {
  const fullUrl = window.location.href;
  const urlParams = new URLSearchParams(fullUrl.split('?')[1]);
  const subject = urlParams.get('subject');

  if (!subject) {
    console.log('form param not found');
    return null;
  }

  return subject;
}
