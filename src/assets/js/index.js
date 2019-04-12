import { MDCTextField } from '@material/textfield/index';

// Instantiation
// const textFields = document.querySelectorAll('.mdc-text-field');
// for (const textField of textFields) {
//   MDCTextField.attachTo(textField);
// }

const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
  return new MDCTextField(el)
});
