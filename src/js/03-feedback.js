import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form'); // отримали доступ до форми

const LOCALSTORAGE_KEY = 'feedback-form-state'; // ключ для збереження даних
let selectedForm = {};

form.addEventListener('input', throttle(saveMessage, 500));

updateOutput();

function saveMessage(evt) {
  selectedForm[evt.target.name] = evt.target.value;
  console.log(selectedForm);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(selectedForm));
  //form.reset();
}

function updateOutput() {
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if (persistedForm) {
    persistedForm = JSON.parse(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
      selectedForm[name] = value;
      form.elements[name].value = value;
    });
    console.log(persistedForm);
  }
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  form.reset();
  selectedForm = {};
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(selectedForm);
});
