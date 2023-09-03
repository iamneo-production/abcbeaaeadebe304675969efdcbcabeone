document.addEventListener("DOMContentLoaded", function () {
const cells = document.querySelectorAll("[data-cell]");
const result = document.querySelector(".result");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];

function checkWinner() {
for (let combo of winningCombos) {
const [a, b, c] = combo;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
gameActive = false;
result.textContent = `Player ${currentPlayer} Wins!`;
cells[a].style.backgroundColor = "green";
cells[b].style.backgroundColor = "green";
cells[c].style.backgroundColor = "green";
resetButton.disabled = false;
}
}

if (!board.includes("") && gameActive) {
gameActive = false;
result.textContent = "It's a Draw!";
resetButton.disabled = false;
}
}

function handleClick(e) {
const cell = e.target;
const index = cell.getAttribute("data-cell");

if (board[index] === "" && gameActive) {
cell.textContent = currentPlayer;
board[index] = currentPlayer;
checkWinner();
currentPlayer = currentPlayer === "X" ? "O" : "X";
result.textContent = `Player ${currentPlayer}'s Turn`;
}
}

function resetGame() {
currentPlayer = "X";
board = ["", "", "", "", "", "", "", "", ""];
gameActive = true;
result.textContent = `Player ${currentPlayer}'s Turn`;
cells.forEach((cell) => {
cell.textContent = "";
cell.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
});
resetButton.disabled = true;
}

cells.forEach((cell) => {
cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);
});
