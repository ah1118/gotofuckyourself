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

    // Generate all rotations
    generateRotations(date, who);
});


// =======================================================================================
//     GENERATE ROTATIONS (1–6 WEEKS) + LEAVE DATE + NEXT ARRIVAL DATE
// =======================================================================================
function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let w = 1; w <= 6; w++) {
        let myStart = new Date(startDate);

        // Leave date = start + weeks * 7 days
        let leaveDate = new Date(myStart);
        leaveDate.setDate(leaveDate.getDate() + w * 7);

        // Coworker arrival = always next Wednesday after leave
        let coworkerArrives = nextWednesday(leaveDate);

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>Rotation Option ${w}</h3>

            <p><b>Weeks:</b> ${w}</p>
            <p><b>Start:</b> ${formatDate(myStart)}</p>
            <p><b>Leave:</b> ${formatDate(leaveDate)}</p>
            <p><b>Coworker Arrives:</b> ${formatDate(coworkerArrives)}</p>

            <p><b>Started by:</b> 
               ${who === "me" ? "You (Mon)" : "Coworker (Wed)"}
            </p>
        `;
        results.appendChild(card);
    }
}


// =======================================================================================
//     HELPERS
// =======================================================================================

// Format YYYY-MM-DD
function formatDate(d) {
    return d.toISOString().split("T")[0];
}

// Find next Wednesday after any date
function nextWednesday(d) {
    let next = new Date(d);
    while (next.getDay() !== 3) {
        next.setDate(next.getDate() + 1);
    }
    return next;
}
