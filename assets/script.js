const buttons = document.querySelectorAll(".timer-button");
const tenMinutes = document.querySelector(".digit.tenminute");
const oneMinutes = document.querySelector(".digit.oneminute");
const tenSeconds = document.querySelector(".digit.tensecond");
const oneSeconds = document.querySelector(".digit.onesecond");
let currentTimeSeconds =
	parseInt(tenMinutes.textContent) * 600 +
	parseInt(oneMinutes.textContent) * 60 +
	parseInt(tenSeconds.textContent) * 10 +
	parseInt(oneSeconds.textContent);

function updateDisplay() {
	tenMinutes.textContent = Math.floor(currentTimeSeconds / 600);
	oneMinutes.textContent = Math.floor((currentTimeSeconds % 600) / 60);
	tenSeconds.textContent = Math.floor(((currentTimeSeconds % 600) % 60) / 10);
	oneSeconds.textContent = Math.floor(((currentTimeSeconds % 600) % 60) % 10);
}

function increment(multiplyer) {
  console.log(currentTimeSeconds);
  let num = currentTimeSeconds += multiplyer;
  currentTimeSeconds = num > 5999 ? 5999 : num;
	updateDisplay();
}

function decrement(multiplyer) {
	let num = currentTimeSeconds - multiplyer;
	currentTimeSeconds = num < 0 ? 0 : num;
	updateDisplay();
}

document.querySelector(".tenminute.up").addEventListener("click", () => {
	increment(600);
});
document.querySelector(".oneminute.up").addEventListener("click", () => {
	increment(60);
});
document.querySelector(".tensecond.up").addEventListener("click", () => {
	increment(10);
});
document.querySelector(".onesecond.up").addEventListener("click", () => {
	increment(1);
});
document.querySelector(".tenminute.down").addEventListener("click", () => {
	decrement(600);
});
document.querySelector(".oneminute.down").addEventListener("click", () => {
	decrement(60);
});
document.querySelector(".tensecond.down").addEventListener("click", () => {
	decrement(10);
});
document.querySelector(".onesecond.down").addEventListener("click", () => {
	decrement(1);
});
