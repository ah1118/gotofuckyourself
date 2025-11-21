// ===============================
// SHIFT ROTATION GENERATOR
// ===============================

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

    // VALIDATION
    if (who === "me" && day !== 1) {
        error.textContent = "❌ You must select a MONDAY.";
        return;
    }

    if (who === "coworker" && day !== 3) {
        error.textContent = "❌ Coworker must start on WEDNESDAY.";
        return;
    }

    generateRotations(date, who);
});


// ==========================================================
// GENERATE ROTATIONS (Grouped by WORK weeks)
// ==========================================================
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let workWeeks = 1; workWeeks <= 6; workWeeks++) {
        const workCard = document.createElement("div");
        workCard.className = "card rotation-card";

        let block = `
            <h2>${who === "me" ? "You" : "Coworker"} Rotation</h2>
            <p><strong>Work:</strong> ${workWeeks} week(s)</p>
            <hr>
        `;

        const leaveDate = addDays(startDate, workWeeks * 7);

        for (let restWeeks = 1; restWeeks <= workWeeks; restWeeks++) {
            const nextStart = addDays(leaveDate, restWeeks * 7);
            const correctedNextStart = fixToCorrectWeekday(nextStart, who);

            block += `
                <p><strong>Rest:</strong> ${restWeeks} week(s)</p>
                <p><strong>Start:</strong> ${formatDate(startDate)}</p>
                <p><strong>Leave:</strong> ${formatDate(leaveDate)}</p>
                <p><strong>Next Work Start:</strong> ${formatDate(correctedNextStart)}</p>
                <p><strong>Next Person Arrives:</strong> ${
                    who === "me" ? "Coworker (Wed)" : "You (Mon)"
                }</p>
                <hr>
            `;
        }

        workCard.innerHTML = block;
        results.appendChild(workCard);
    }
}


// ==========================================================
// UTILITIES
// ==========================================================
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function fixToCorrectWeekday(date, who) {
    const target = who === "me" ? 1 : 3; // 1 = Monday, 3 = Wednesday
    let d = new Date(date);
    while (d.getDay() !== target) d = addDays(d, 1);
    return d;
}

function formatDate(d) {
    return d.toISOString().split("T")[0];
}
