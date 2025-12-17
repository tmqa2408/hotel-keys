const defaultGuests = [
    { name: "Петр Иванов", room: "112" },
    { name: "Иван Петров", room: "110а" },
    { name: "Иван Соболев", room: "110б" },
    { name: "Елена Кудрявая", room: "201" },
    { name: "Илья Кудыкин", room: "200а" }
];

let guests = JSON.parse(localStorage.getItem("guests"));

if (!guests) {
    guests = defaultGuests;
    localStorage.setItem("guests", JSON.stringify(guests));
}


const list = document.getElementById("guestList");
const search = document.getElementById("search");

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
            li.onclick = () => {
                if (confirm("Удалить постояльца?")) {
                    guests.splice(i, 1);
                    save();
                }
            };
            list.appendChild(li);
        });
}

function save() {
    localStorage.setItem("guests", JSON.stringify(guests));
    render();
}

document.getElementById("addBtn").onclick = () => {
    const name = prompt("Имя и фамилия");
    const room = prompt("Номер комнаты");

    if (name && room) {
        guests.push({ name, room });
        save();
    }
};

search.oninput = render;

render();
