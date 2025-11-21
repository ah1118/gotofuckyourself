// ===============================
//  SHIFT ROTATION LOGIC (FINAL)
// ===============================

// RULES:
// - Work weeks: 1–6
// - Rest weeks: 1–workWeeks
// - Next work start must match weekday: Mon for you, Wed for coworker
// - Show correct arrival date (Mon or Wed depending on who comes next)

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
    const day = date.getDay(); // Monday = 1, Wednesday = 3

    if (who === "me" && day !== 1) {
        error.textContent = "❌ You must select a MONDAY.";
        return;
    }
    if (who === "coworker" && day !== 3) {
        error.textContent = "❌ Coworker must start on WEDNESDAY.";
        return;
    }

    generateWorkColumns(date, who);
});


// ===============================
//  GENERATE 1 CARD PER WORK PERIOD
// ===============================
function generateWorkColumns(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let workWeeks = 1; workWeeks <= 6; workWeeks++) {

        const leaveDate = addDays(startDate, workWeeks * 7);

        const column = document.createElement("div");
        column.className = "card rotation-card";

        let html = `
            <h3>${who === "me" ? "You" : "Coworker"} Rotation</h3>
            <p><strong>Work:</strong> ${workWeeks} week(s)</p>
            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>Leave:</strong> ${formatDate(leaveDate)}</p>

            <hr style="opacity:0.3;margin:10px 0;">
            <p><strong>Rest Options:</strong></p>
        `;

        // For each allowed rest week (1 → workWeeks)
        for (let restWeeks = 1; restWeeks <= workWeeks; restWeeks++) {

            const afterRest = addDays(leaveDate, restWeeks * 7);

            // Correct next workday (Mon/Wed)
            const nextWorkStart = fixToCorrectWeekday(afterRest, who);

            // The next person arrives before you
            const arrivalDate = fixArrivalDate(leaveDate, who);

            html += `
                <div style="margin:8px 0; padding:6px 10px; background:#1a0f2d; border-radius:8px;">
                    <p><strong>Rest:</strong> ${restWeeks} week(s)</p>
                    <p><strong>Next Work Start:</strong> ${formatDate(nextWorkStart)}</p>
                    <p><strong>Next Person Arrives:</strong> ${formatDate(arrivalDate)}</p>
                </div>
            `;
        }

        column.innerHTML = html;
        results.appendChild(column);
    }
}


// ===============================
//  FIX ARRIVAL DATE (Opposite worker arrives)
// ===============================
function fixArrivalDate(leaveDate, whoIsLeaving) {
    // If YOU start, coworker arrives (Wed)
    const arrivalDay = whoIsLeaving === "me" ? 3 : 1;

    let d = new Date(leaveDate);

    // Move forward until correct weekday
    while (d.getDay() !== arrivalDay) d = addDays(d, 1);

    return d;
}


// ===============================
//  FIX YOUR NEXT WORKDAY
// ===============================
function fixToCorrectWeekday(date, who) {
    const correctDay = who === "me" ? 1 : 3;
    let d = new Date(date);
    while (d.getDay() !== correctDay) d = addDays(d, 1);
    return d;
}


// ===============================
//  UTILITIES
// ===============================
function addDays(d, days) {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

function formatDate(d) {
    return d.toISOString().split("T")[0];
}
