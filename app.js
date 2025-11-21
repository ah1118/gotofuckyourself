document.getElementById("generateBtn").addEventListener("click", () => {
    const who = document.getElementById("whoStarts").value;
    const start = document.getElementById("startDate").value;

    if (!start) {
        alert("Please select start date.");
        return;
    }

    const results = document.getElementById("results");
    results.innerHTML = "";

    // Placeholder — next step we generate 1–6 week real rotation logic
    for (let i = 1; i <= 6; i++) {
        const card = document.createElement("div");
        card.className = "rotation-card";
        card.innerHTML = `
          <h3>Rotation Option ${i}</h3>
          <p>Weeks: ${i}</p>
          <p>Start: ${start}</p>
          <p>Started by: ${who === "me" ? "You (Mon)" : "Coworker (Wed)"}</p>
        `;
        results.appendChild(card);
    }
});
