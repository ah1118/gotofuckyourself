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

    // If valid, generate rotation cards
    generateRotations(date, who);
});

function generateRotations(startDate, who) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    for (let w = 1; w <= 6; w++) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>Rotation Option ${w}</h3>
            <p>Weeks: ${w}</p>
            <p>Start: ${startDate.toISOString().split("T")[0]}</p>
            <p>Started by: ${who === "me" ? "You (Mon)" : "Coworker (Wed)"}</p>
        `;

        results.appendChild(card);
    }
}
