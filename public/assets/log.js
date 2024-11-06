const tableBody = document.querySelector("tbody");

async function fetchSessions() {
  try {
    const response = await fetch("/sessions");
    const sessions = await response.json();

    tableBody.innerHTML = "";
    sessions.forEach((session) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${session.date}</td>
        <td>${session.sessionLengthMinutes}</td>
        <td>${session.description}</td>
        `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.onload = fetchSessions;
