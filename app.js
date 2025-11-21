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
    const day = date.getDay(); // Monday = 1, Wednesday = 3

    // VALIDATION
    if (who === "me" && day !== 1) {
        error.textContent = "❌ You must select a MONDAY.";
        return;
    }

    if (who === "coworker" && day !== 3) {
        error.textContent = "❌ Coworker must start on WEDNESDAY.";
        return;
    }

    // Generate ALL allowed possibilities
    generateRotations(date, who);
});


// ===================================================
// ROTATION GENERATOR WITH RULES (1–6 weeks only)
// ===================================================
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let w = 1; w <= 6; w++) {

        // RULE: cannot work beyond 6 weeks (already enforced)
        // RULE: rest cannot exceed worked weeks (rest <= w)

        const leaveDate = addDays(startDate, w * 7);

        // NEXT person arrival (Mon -> +7 days, Wed -> +7 days)
        let nextPersonDate;
        if (who === "me") {
            // coworker arrives Wednesday → 2 days after Monday cycle ends
            nextPersonDate = addDays(leaveDate, 2);
        } else {
            // you arrive Monday → 5 days after Wednesday cycle ends
            nextPersonDate = addDays(leaveDate, 5);
        }

        // REST OPTIONS for the next person
        const restMin = 1;
        const restMax = w;   // cannot rest more than worked
        const restList = [];
        for (let r = restMin; r <= restMax; r++) {
            restList.push(`${r} week${r > 1 ? "s" : ""}`);
        }

        // Create card UI
        const card = document.createElement("div");
        card.className = "card rotation-card";

        card.innerHTML = `
            <h3>Rotation Option ${w}</h3>
            <p><strong>Weeks worked:</strong> ${w}</p>

            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>Leave:</strong> ${formatDate(leaveDate)}</p>

            <p><strong>Next arrives:</strong> ${
                who === "me" 
                ? `Coworker (Wednesday) → ${formatDate(nextPersonDate)}`
                : `You (Monday) → ${formatDate(nextPersonDate)}`
            }</p>

            <p><strong>Allowed rest options:</strong><br>
                ${restList.join(", ")}
            </p>

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
function addDays(d, days) {
    const newDate = new Date(d);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function formatDate(d) {
    return d.toISOString().split("T")[0];
}
