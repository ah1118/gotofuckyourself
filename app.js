// ===============================
//  SHIFT ROTATION GENERATOR
// ===============================

// RULES:
// 1) Work = 1–6 weeks
// 2) Rest cannot exceed work weeks
// 3) Next work starts on correct weekday (Mon or Wed)
// 4) Show Start → Leave → Next Work Start → Next Arriver


document.getElementById("generateBtn").addEventListener("click", () => {
    const who = document.getElementById("whoStarts").value;
    const dateValue = document.getElementById("startDate").value;
    let error = document.getElementById("error");

    if (!error) {
        error = document.createElement("p");
        error.id = "error";
        error.style.color = "red";
        document.querySelector(".sidebar").appendChild(error);
    }

    error.textContent = "";

    if (!dateValue) {
        error.textContent = "Please choose a start date.";
        return;
    }

    const start = new Date(dateValue);
    const weekday = start.getDay(); // Monday=1, Wednesday=3

    // VALIDATION
    if (who === "me" && weekday !== 1) {
        error.textContent = "❌ You must select a MONDAY.";
        return;
    }

    if (who === "coworker" && weekday !== 3) {
        error.textContent = "❌ Coworker must select a WEDNESDAY.";
        return;
    }

    generateRotations(start, who);
});


// ===============================
// GENERATE 1–6 WEEK ROTATIONS
// ===============================
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let workWeeks = 1; workWeeks <= 6; workWeeks++) {

        // LEAVE DATE
        const leaveDate = addDays(startDate, workWeeks * 7);

        // REST CANNOT exceed work weeks
        for (let restWeeks = 1; restWeeks <= workWeeks; restWeeks++) {

            // NEXT WORK START after rest
            let nextWorkDate = addDays(leaveDate, restWeeks * 7);

            // Fix weekday (Mon/Wed)
            nextWorkDate = fixToCorrectWeekday(
                nextWorkDate,
                who // same person goes back to work
            );

            const nextPerson = (who === "me") ? "Coworker (Wed)" : "You (Mon)";

            const card = document.createElement("div");
            card.className = "card rotation-card";

            card.innerHTML = `
                <h3>${who === "me" ? "You" : "Coworker"} Rotation</h3>

                <p><strong>Work:</strong> ${workWeeks} week(s)</p>
                <p><strong>Rest:</strong> ${restWeeks} week(s)</p>

                <p><strong>Start:</strong> ${formatDate(startDate)}</p>
                <p><strong>Leave:</strong> ${formatDate(leaveDate)}</p>

                <p><strong>Next Work Start:</strong> ${formatDate(nextWorkDate)}</p>

                <p><strong>Next Person Arrives:</strong> ${nextPerson}</p>
            `;

            results.appendChild(card);
        }
    }
}


// ===============================
// FIX WEEKDAY (MON OR WED)
// ===============================
function fixToCorrectWeekday(date, who) {
    const targetDay = (who === "me") ? 1 : 3;
    let d = new Date(date);

    while (d.getDay() !== targetDay) {
        d = addDays(d, 1);
    }

    return d;
}


// ===============================
// UTILITIES
// ===============================
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function formatDate(d) {
    return d.toISOString().split("T")[0];
}
