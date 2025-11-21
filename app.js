let who = "me"; // default
let selected = null;

function setWho(value) {
    who = value;
    renderCalendar(currentMonth, currentYear);
}

document.getElementById("whoStarts").addEventListener("change", (e) => {
    setWho(e.target.value);
});

// Calendar engine ------------------------------------
const calendarGrid = document.getElementById("calendarGrid");
const calTitle = document.getElementById("calTitle");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

document.getElementById("prevMonth").onclick = () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentMonth, currentYear);
};

document.getElementById("nextMonth").onclick = () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar(currentMonth, currentYear);
};

function renderCalendar(month, year) {

    calendarGrid.innerHTML = "";
    calTitle.innerText = `${year} – ${monthName(month)}`;

    let first = new Date(year, month, 1).getDay();
    if (first === 0) first = 7;

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill blanks
    for (let i = 1; i < first; i++) {
        let cell = document.createElement("div");
        cell.className = "calendar-day disabled-day";
        calendarGrid.appendChild(cell);
    }

    // Fill days
    for (let d = 1; d <= daysInMonth; d++) {
        let cell = document.createElement("div");
        cell.className = "calendar-day";
        cell.innerText = d;

        let date = new Date(year, month, d);
        let day = date.getDay(); // 1 = Monday, 3 = Wed

        let allowedDay = (who === "me" && day === 1) || (who === "coworker" && day === 3);

        if (allowedDay) {
            cell.classList.add("allowed-day");
            cell.onclick = () => selectDate(date, cell);
        } else {
            cell.classList.add("disabled-day");
        }

        calendarGrid.appendChild(cell);
    }
}

function selectDate(date, cell) {
    if (selected) selected.classList.remove("selected-day");

    selected = cell;
    cell.classList.add("selected-day");

    document.getElementById("selectedDate").innerHTML =
        `Selected: <b>${date.toISOString().split("T")[0]}</b>`;
}

function monthName(n) {
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][n];
}

renderCalendar(currentMonth, currentYear);
