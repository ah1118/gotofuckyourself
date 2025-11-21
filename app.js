// ===============================
//  SHIFT ROTATION GENERATOR
// ===============================

document.getElementById("generateBtn").addEventListener("click", () => {
    const who = document.getElementById("whoStarts").value;
    const dateValue = document.getElementById("startDate").value;
    const error = document.getElementById("error");
    error.textContent = "";

    if (!dateValue) {
        error.textContent = "Please choose a start date.";
        return;
    }

    const date = new Date(dateValue);
    const day = date.getDay(); // Monday=1, Wednesday=3

    // VALIDATION RULES
    if (who === "me" && day !== 1) {
        error.textContent = "❌ You must select a MONDAY.";
        return;
    }

    if (who === "coworker" && day !== 3) {
        error.textContent = "❌ Coworker must start on WEDNESDAY.";
        return;
    }

    // Generate all rotations
    generateRotations(date, who);
});


// ===================================================
// GENERATE ROTATION OPTIONS (1–6 WEEKS)
// ===================================================
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let w = 1; w <= 6; w++) {
        const leaveDate = addDays(startDate, w * 7);          // After X weeks
        const nextPersonDate = addDays(leaveDate, 2);         // Wednesday after leaving (Mon→Tue→Wed)

        const card = document.createElement("div");
        card.className = "card rotation-card";

        card.innerHTML = `
            <h3>Rotation Option ${w}</h3>
            <p><strong>Weeks:</strong> ${w}</p>

            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>Leave:</strong> ${formatDate(leaveDate)}</p>

            <p><strong>Next arrives:</strong> ${
                who === "me" 
                ? `Coworker (Wed) → ${formatDate(nextPersonDate)}`
                : `You (Mon) → ${formatDate(nextPersonDate)}`
            }</p>

            <p><strong>Started by:</strong> ${
                who === "me" ? "You (Monday)" : "Coworker (Wednesday)"
            }</p>
        `;
        results.appendChild(card);
    }
}


// ===================================================
// SMALL UTILITIES
// ===================================================

// Add days to a JS date
function addDays(d, days) {
    const newDate = new Date(d);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

// Format YYYY-MM-DD
function formatDate(d) {
    return d.toISOString().split("T")[0];
}
