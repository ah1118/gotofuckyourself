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
    const day = date.getDay(); // 1 = Monday, 3 = Wednesday

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


// -------------------------------------------------------
// 🔥 GENERATE ALL 6 ROTATIONS WITH LEAVE + ARRIVAL DATES
// -------------------------------------------------------
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let w = 1; w <= 6; w++) {

        // ================================
        // YOUR LEAVE DATE (end of rotation)
        // ================================
        const leaveDate = new Date(startDate);
        leaveDate.setDate(startDate.getDate() + w * 7);

        // =============================================
        // COWORKER ARRIVAL — NEXT WEDNESDAY AFTER LEAVE
        // =============================================
        const coworkerArrives = new Date(leaveDate);

        // move forward until it's Wednesday
        while (coworkerArrives.getDay() !== 3) {
            coworkerArrives.setDate(coworkerArrives.getDate() + 1);
        }

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>Rotation Option ${w}</h3>
            <p><strong>Weeks:</strong> ${w}</p>
            <p><strong>Start:</strong> ${formatDate(startDate)}</p>
            <p><strong>Leave date:</strong> ${formatDate(leaveDate)}</p>
            <p><strong>Coworker arrives:</strong> ${formatDate(coworkerArrives)}</p>
            <p><strong>Started by:</strong> ${who === "me" ? "You (Mon)" : "Coworker (Wed)"}</p>
        `;

        results.appendChild(card);
    }
}


// Format YYYY-MM-DD
function formatDate(d) {
    return d.toISOString().split("T")[0];
}
