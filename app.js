// ===============================
//  SHIFT ROTATION GENERATOR
// ===============================

// RULES:
// 1) Work period = 1–6 weeks
// 2) Rest period CANNOT be > worked weeks
// 3) Next work start must follow correct weekday (Mon for you, Wed for coworker)
// 4) Show: leave date + next work start + next person arrival

document.getElementById("generateBtn").addEventListener("click", () => {
    const who = document.getElementById("whoStarts").value;
    const dateValue = document.getElementById("startDate").value;
    const error = document.getElementById("error");

    if (error) error.textContent = "";

    if (!dateValue) {
        if (error) error.textContent = "Please choose a start date.";
        return;
    }

    const date = new Date(dateValue);
    const day = date.getDay(); // Monday=1, Wednesday=3

    if (who === "me" && day !== 1) {
        if (error) error.textContent = "❌ You must select a MONDAY.";
        return;
    }

    if (who === "coworker" && day !== 3) {
        if (error) error.textContent = "❌ Coworker must start on WEDNESDAY.";
        return;
    }

    generateRotations(date, who);
});


// ===================================================
// GENERATE ALL ROTATION POSSIBILITIES
// ===================================================
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let workWeeks = 1; workWeeks <= 6; workWeeks++) {

        // Leave date = start + workWeeks
        const leaveDate = addDays(startDate, workWeeks * 7);

        // Allowed rest = 1 → workWeeks
        for (let restWeeks = 1; restWeeks <= workWeeks; restWeeks++) {

            const nextWorkRaw = addDays(leaveDate, restWeeks * 7);

            // Adjust to correct weekday
            const nextWorkStart = fixToCorrectWeekday(nextWorkRaw, who);

            const card = document.createElement("div");
            card.className = "card rotation-card";

            card.innerHTML = `
                <h3>${who === "me" ? "You" : "Coworker"} Rotation</h3>

                <p><strong>Work:</strong> ${workWeeks} week(s)</p>
                <p><strong>Rest:</strong> ${restWeeks} week(s)</p>

                <p><strong>Start:</strong> ${formatDate(startDate)}</p>
                <p><strong>Leave:</strong> ${formatDate(leaveDate)}</p>

                <p><strong>Next Work Start:</strong> ${formatDate(nextWorkStart)}</p>

                <p><strong>Next Person Arrives:</strong>
                    ${who === "me" ? "Coworker (Wed)" : "You (Mon)"}
                </p>
            `;

            results.appendChild(card);
        }
    }
}


// ===================================================
// UTILITIES
// ===================================================

// Add days
function addDays(d, days) {
    const newDate = new Date(d);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

// Always convert date to Mon or Wed
function fixToCorrectWeekday(date, who) {
    const targetDay = (who === "me") ? 1 : 3; // 1=Mon, 3=Wed
    let d = new Date(date);
    while (d.getDay() !== targetDay) {
        d = addDays(d, 1);
    }
    return d;
}

// Format YYYY-MM-DD
function formatDate(d) {
    return d.toISOString().split("T")[0];
}
