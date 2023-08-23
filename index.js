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
  modelSelect.innerHTML = '<option value="">-- All models --</option>';
  yearSelect.innerHTML = '<option value="">-- All years --</option>';
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
  yearSelect.innerHTML = '<option value="">-- All years --</option>';
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
    <li><span class="first-info">Type of Ignition:</span> <span class="second-info">${item["Type of Ignition"]}</li>
    <li><span class="first-info">Type of Key:</span> <span class="second-info">${item["Type of Key"]}</li>

    <li><span class="first-info">No Buttons:</span> <span class="second-info">${item["No Buttons"]}</span></li>
    <li><span class="first-info">Price All Keys Lost:</span> <span class="second-info">${item["Price All Keys Lost"]}</span></li>
    <li><span class="first-info">Price Add a Key:</span> <span class="second-info">${item["Price Add a Key"]}</span></li>
    <li><span class="first-info">Price Program Only:</span> <span class="second-info">${item["Price Program Only"]}</span></li>
    <li><span class="first-info">Dealer Price:</span> <span class="second-info">${item["Dealer Price"]}</span></li>

    <li><span class="first-info">Dealer Program:</span> <span class="second-info">${item["Dealer Program"]}</span></li>
    <li><span class="first-info">Dealer Emergency Blade:</span> <span class="second-info">${item["Dealer Emergency Blade"]}</span></li>

    <li><span class="first-info">Secure Locks Parts:</span> <span class="second-info">${item["Secure Locks Parts"]}</span></li>
    <li><span class="first-info">Link:</span><span class="second-info">
    <a href="${item["Link"]}" target="_blank">Visit link</a></span>
    </li>
    <li><span class="first-info">Comments:</span> <span class="second-info">${item["Comments"]}</span></li>




    </br>`;
  });
  outputHTML += "</ul>";

  outputDiv.innerHTML = outputHTML;
}

// Вызываем функцию initialize для загрузки данных из JSON и настройки select-ов
initialize();
1;
