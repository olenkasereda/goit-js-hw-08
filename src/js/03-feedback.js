import throttle from 'lodash.throttle'; // подключили библиотеку throttle

const form = document.querySelector('.feedback-form'); // отримали доступ до форми
const LOCALSTORAGE_KEY = 'feedback-form-state'; // ключ для збереження даних

/**
  |============================
  | вариант без гобальной переменной
  |============================
*/
form.addEventListener('input', throttle(saveMessage, 500)); // слушатель событий input на всю форму

updateOutput(); // вызов фу-ции обновить вывод (инициализируем форму    )

function saveMessage(evt) {
  //вся робота по проверке localStorage закрыта в этой ф-ии
  //ф=ция сохронить ввод
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY); // перем-я сохраняемая форма, читаем с ЛХ запись с ключем LOCALSTORAGE_KEY
  persistedForm = persistedForm ? JSON.parse(persistedForm) : {}; //тернарник: если в хранилище есть запись мы его дастаем перед этим parse, если нет- создаем пустой обьект
  persistedForm[evt.target.name] = evt.target.value; //записываем name и value изменяя в старых заптсях или вносим первый раз в пустой обьект
  console.log(persistedForm);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedForm)); //опять сохранили новую запись в ЛХ
}

function updateOutput() {
  // фу-ция обновить вывод, тт значение из ЛХ  хотим записать после обновления в инпуты
  let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY); //смотрим что есть в ЛХ  с ключем LOCALSTORAGE_KEY
  if (persistedForm) {
    // если что-то есть, то
    persistedForm = JSON.parse(persistedForm); //парсим то что есть (из строки в обьект)
    Object.entries(persistedForm).forEach(([name, value]) => {
      //перебераем через forEach все entries (песле деструктуризации это [name, value] обьекта persistedForm)
      form.elements[name].value = value; // свойство elements создает псевдоколлекцию( на form обращаемся к елесенту с именем name в его value записываем новое-текущее значения value в инпуте)
    }); // если в persistedForm ничего нету -ничего не делаем
    console.log(persistedForm);
  }
}

form.addEventListener('submit', evt => {
  // вешай слушателя на кнопку submit
  evt.preventDefault(); //збрасываем стандапртые настройки браузера
  form.reset(); //reset() восстанавливает стандартные значения всем элементам формы.
  localStorage.removeItem(LOCALSTORAGE_KEY); //удаляем из ЛХ сущест-ю запись
});

/**
  |============================
  | вариант з глобюальною переменной
  |============================
*/
// let selectedForm = {}; //// это обьект в кторый буду записывать значения которые я ввела в инпут

// form.addEventListener('input', throttle(saveMessage, 500));

// updateOutput();

// function saveMessage(evt) {
//   selectedForm[evt.target.name] = evt.target.value; ////в пустой обьект записываем имя и значение, или презаписываем новые если старое есть значение
//   console.log(selectedForm);
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(selectedForm)); ////записыввем изменнеия нашего обьекта selectedForm в localStorage
//   //form.reset();
// }

// function updateOutput() {
//   let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
//   if (persistedForm) {
//     persistedForm = JSON.parse(persistedForm);
//     Object.entries(persistedForm).forEach(([name, value]) => {
//       selectedForm[name] = value; //наполяняем ноши импуты изначально, чтоб не обнулялись, ведь глобально обьект пустой
//       form.elements[name].value = value;
//     });
//     console.log(persistedForm);
//   }
// }

// form.addEventListener('submit', evt => {
//   evt.preventDefault();
//   form.reset();
//   selectedForm = {}; ////каждый раз очищаем обьект при submit
//   localStorage.removeItem(LOCALSTORAGE_KEY);
//   console.log(selectedForm);
// });
