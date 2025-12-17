// 🔐 PIN для удаления
const DELETE_PIN = "1234"; // ← можете изменить

// 📋 Дефолтный список (первый запуск)
const defaultGuests = [
    { name: "Петр Иванов", room: "112" },
    { name: "Иван Петров", room: "110а" },
    { name: "Иван Соболев", room: "110б" },
    { name: "Елена Кудрявая", room: "201" },
    { name: "Илья Кудыкин", room: "200а" }
];

// 🔄 Загрузка данных
let guests = JSON.parse(localStorage.getItem("guests"));

if (!guests) {
    guests = defaultGuests;
    save();
}

const list = document.getElementById("guestList");
const search = document.getElementById("search");

// 🔁 Отрисовка списка
function render() {
    list.innerHTML = "";
    const q = search.value.toLowerCase();

    guests
        .filter(g => g.name.toLowerCase().includes(q))
        .forEach((g, i) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${g.name}</span>
                <strong>${g.room}</strong>
            `;
            li.onclick = () => attemptDelete(i);
            list.appendChild(li);
        });
}

// 💾 Сохранение
function save() {
    localStorage.setItem("guests", JSON.stringify(guests));
    render();
}

// ➕ Добавление
document.getElementById("addBtn").onclick = () => {
    const name = prompt("Имя и фамилия");
    const room = prompt("Номер комнаты");

    if (name && room) {
        guests.push({ name, room });
        save();
    }
};

// 🔐 Удаление с PIN
function attemptDelete(index) {
    const pin = prompt("Введите PIN для удаления");

    if (pin === DELETE_PIN) {
        guests.splice(index, 1);
        save();
    } else {
        alert("Неверный PIN");
    }
}

// 📥 Импорт списка
document.getElementById("importBtn").onclick = () => {
    const data = prompt(
        "Вставьте список в формате JSON.\n⚠️ Текущий список будет ЗАМЕНЁН"
    );

    if (!data) return;

    try {
        const parsed = JSON.parse(data);

        if (!Array.isArray(parsed)) {
            throw new Error();
        }

        guests = parsed;
        save();
        alert("Список успешно импортирован");
    } catch {
        alert("Ошибка формата. Проверьте данные.");
    }
};

search.oninput = render;
render();
