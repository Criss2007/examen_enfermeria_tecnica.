document.addEventListener("DOMContentLoaded", function () {
    let scoreBoard = document.getElementById("scoreBoard");
    let scoreList = document.getElementById("scoreList");
    let clearButton = document.getElementById("clearAttempts");

    function loadAttempts() {
        if (!scoreList || !clearButton) return;

        let scores = JSON.parse(localStorage.getItem("examScores")) || [];
        scoreList.innerHTML = "";

        if (scores.length === 0) {
            scoreList.innerHTML = "<li>No hay intentos registrados.</li>";
            clearButton.style.display = "none";
        } else {
            scores.forEach((score, index) => {
                let li = document.createElement("li");
                let emoji = score.status === "aprobado" ? "✅" : "❌";
                li.textContent = `Intento ${index + 1}: ${score.score} puntos (${score.percentage}%) - ${score.date} - ${emoji} ${score.status}`;
                scoreList.appendChild(li);
            });
            clearButton.style.display = "block";
        }
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            localStorage.removeItem("examScores");
            loadAttempts();
        });
    }

    window.showScores = function () {
        if (!scoreBoard) return;
        if (scoreBoard.style.display === "block") {
            scoreBoard.style.display = "none";
        } else {
            loadAttempts();
            scoreBoard.style.display = "block";
        }
    };
});

function startExam() {
    alert("¡El examen ha comenzado!");
    window.location.href = "menú.html";
}