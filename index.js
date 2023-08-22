// // Объявляем переменную jsonData в глобальной области видимости
// let jsonData;
// console.log("jsonData", jsonData);

// // Получаем ссылки на элементы select и вывода данных
// const makerSelect = document.getElementById("makerSelect"); // SELECT MAKER
// const modelSelect = document.getElementById("modelSelect"); // SELECT MODEL
// const yearSelect = document.getElementById("yearSelect"); // SELECT YEAR

// const outputDiv = document.getElementById("output"); // OUTPUT

// // Функция для фильтрации моделей на основе выбранного производителя
// async function filterModels() {
//   const selectedMaker = makerSelect.value;
//   // Очищаем предыдущие варианты выбора моделей
//   modelSelect.innerHTML = '<option value="">-- Все модели --</option>';

//   try {
//     // Загружаем данные из JSON-файла
//     const response = await fetch("data.json");
//     jsonData = await response.json();

//     // Фильтруем модели на основе выбранного производителя
//     const models = jsonData
//       .filter((item) => item.Maker === selectedMaker)
//       .map((item) => item.Model);
//     console.log("models:", models);

//     // Получаем уникальные модели для выбранного производителя
//     const uniqueModels = [...new Set(models)];
//     console.log(uniqueModels);

//     // Заполняем второй select уникальными моделями
//     uniqueModels.forEach((model) => {
//       const option = document.createElement("option");
//       option.text = model;
//       modelSelect.add(option);
//     });

//     // Отображаем отфильтрованные данные
//     displayData();
//   } catch (error) {
//     console.error("Ошибка при загрузке или обработке данных из JSON:", error);
//   }
// }

// // Функция для отображения выбранных данных
// function displayData() {
//   const selectedMaker = makerSelect.value;
//   const selectedModel = modelSelect.value;

//   // Фильтруем данные на основе выбранного производителя и модели
//   const filteredData = jsonData.filter(
//     (item) => item.Maker === selectedMaker && item.Model === selectedModel
//   );

//   // Генерируем HTML-код для вывода данных
//   let outputHTML = "<ul>";
//   filteredData.forEach((item) => {
//     outputHTML += `
//     <li>Maker: ${item.Maker}</li>
//     <li>Модель: ${item.Model}</li>
//     <li>Комментарии: ${item.Comments}</li>
//     <li>Год: ${item.Year}</li>`;
//   });
//   outputHTML += "</ul>";

//   // Выводим результат
//   outputDiv.innerHTML = outputHTML;
// }

// // Загружаем данные из JSON-файла и инициализируем первый select
// async function initialize() {
//   try {
//     // Загружаем данные из JSON-файла
//     const response = await fetch("data.json");
//     jsonData = await response.json();

//     // Извлекаем уникальных производителей из данных
//     const uniqueMakers = [...new Set(jsonData.map((item) => item.Maker))];

//     // Заполняем первый select уникальными производителями
//     uniqueMakers.forEach((maker) => {
//       const option = document.createElement("option");
//       option.text = maker;
//       makerSelect.add(option);
//     });

//     // Вызываем функцию filterModels для заполнения второго select и отображения данных
//     filterModels();
//   } catch (error) {
//     console.error("Ошибка при загрузке или обработке данных из JSON:", error);
//   }
// }

// // Вызываем функцию initialize для загрузки данных из JSON и настройки select-ов
// initialize();

////////////////

// Получаем ссылки на элементы select и вывода данных
const makerSelect = document.getElementById("makerSelect"); // SELECT MAKER
const modelSelect = document.getElementById("modelSelect"); // SELECT MODEL
const yearSelect = document.getElementById("yearSelect"); // SELECT YEAR

const outputDiv = document.getElementById("output"); // OUTPUT

let jsonData;

// Загружаем данные из JSON-файла и инициализируем первый select
async function initialize() {
  try {
    const response = await fetch("data.json");
    jsonData = await response.json();

    const uniqueMakers = [...new Set(jsonData.map((item) => item.Maker))];
    uniqueMakers.forEach((maker) => {
      const option = document.createElement("option");
      option.text = maker;
      makerSelect.add(option);
    });

    // Вызываем функцию filterModels для заполнения второго select после выбора производителя
    makerSelect.addEventListener("change", filterModels);
  } catch (error) {
    console.error("Ошибка при загрузке или обработке данных из JSON:", error);
  }
}

// Функция для фильтрации моделей на основе выбранного производителя
function filterModels() {
  const selectedMaker = makerSelect.value;

  // Очищаем предыдущие варианты выбора моделей и годов
  modelSelect.innerHTML = '<option value="">-- Все модели --</option>';
  yearSelect.innerHTML = '<option value="">-- Все годы --</option>';
  outputDiv.innerHTML = ""; // Очищаем вывод данных

  if (selectedMaker) {
    const filteredModels = jsonData.filter(
      (item) => item.Maker === selectedMaker
    );
    const uniqueModels = [...new Set(filteredModels.map((item) => item.Model))];

    uniqueModels.forEach((model) => {
      const option = document.createElement("option");
      option.text = model;
      modelSelect.add(option);
    });
  }

  // Вызываем функцию filterYears для заполнения третьего select после выбора модели
  modelSelect.addEventListener("change", filterYears);
}

// Функция для фильтрации годов на основе выбранного производителя и модели
function filterYears() {
  const selectedMaker = makerSelect.value;
  const selectedModel = modelSelect.value;

  // Очищаем предыдущие варианты выбора годов и вывод данных
  yearSelect.innerHTML = '<option value="">-- Все годы --</option>';
  outputDiv.innerHTML = ""; // Очищаем вывод данных

  if (selectedModel) {
    const filteredYears = jsonData.filter(
      (item) => item.Maker === selectedMaker && item.Model === selectedModel
    );
    const uniqueYears = [...new Set(filteredYears.map((item) => item.Year))];

    uniqueYears.forEach((year) => {
      const option = document.createElement("option");
      option.text = year;
      yearSelect.add(option);
    });
  }

  // Вызываем функцию displayData для вывода данных при выборе года
  yearSelect.addEventListener("change", displayData);
}

// Функция для отображения выбранных данных
function displayData() {
  const selectedMaker = makerSelect.value;
  const selectedModel = modelSelect.value;
  const selectedYear = yearSelect.value;

  // Фильтруем данные на основе выбранных значений
  const filteredData = jsonData.filter(
    (item) =>
      (!selectedMaker || item.Maker === selectedMaker) &&
      (!selectedModel || item.Model === selectedModel) &&
      (!selectedYear || item.Year === selectedYear)
  );

  let outputHTML = "<ul>";
  filteredData.forEach((item) => {
    outputHTML += `
    <li class="main-info">${item.Maker} - ${item.Model} - ${item.Year}</li>
    <li>Type of Ignition: ${item["Type of Ignition"]}</li>
    <li>Type of Key: ${item["Type of Key"]}</li>

    <li>No. Buttons: ${item["No. Buttons"]}</li>
    <li>Price All Keys Lost: ${item["Price All Keys Lost"]}</li>
    <li>Price Add a Key: ${item["Price Add a Key"]}</li>
    <li>Price Program Only: ${item["Price Program Only"]}</li>
    <li>Dealer Price: ${item["Dealer Price"]}</li>

    <li>Parts: ${item["Parts"]}</li>
    <li>Link:
    <a href="${item["Link"]}" target="_blank">Visit link</a>
    </li>
    <li>Comments: ${item["Comments"]}</li>




    </br>`;
  });
  outputHTML += "</ul>";

  outputDiv.innerHTML = outputHTML;
}

// Вызываем функцию initialize для загрузки данных из JSON и настройки select-ов
initialize();
1;
