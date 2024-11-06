const alarm = new Audio("./images/alarm-clock-90867.mp3");
let timerOn = false;
let timerIntervalId;
let isBreak = false;
let pomodoroLoopNumber = 0;
let currentTimeSeconds = 1500;
updateDisplay();

function toggleTimer() {
  if (!timerOn) {
    timerOn = true;
    timerIntervalId = setInterval(() => {
      decrement(1);
    }, 1000);
  } else {
    timerOn = false;
    clearInterval(timerIntervalId);
  }
}

function updateDisplay() {
  document.getElementById("tenminutedigit").textContent = Math.floor(
    currentTimeSeconds / 600,
  );
  document.getElementById("oneminutedigit").textContent = Math.floor(
    (currentTimeSeconds % 600) / 60,
  );
  document.getElementById("tenseconddigit").textContent = Math.floor(
    ((currentTimeSeconds % 600) % 60) / 10,
  );
  document.getElementById("oneseconddigit").textContent = Math.floor(
    ((currentTimeSeconds % 600) % 60) % 10,
  );
  if (currentTimeSeconds == 0) {
    alarm.play();
    resetDisplay();
  }
}

function resetDisplay() {
  toggleTimer();
  if (isBreak) {
    pomodoroLoopNumber++;
  }
  isBreak = !isBreak;
  // every 3 study sessions a longer break is given
  if (isBreak && pomodoroLoopNumber == 2) {
    currentTimeSeconds = 900;
    document.getElementById("label").textContent = "Break";
    // this will be increased when this break is over, pomodoroLoopNumber = 0
    pomodoroLoopNumber = -1;
  } else if (isBreak) {
    currentTimeSeconds = 300;
    document.getElementById("label").textContent = "Break";
  } else {
    currentTimeSeconds = 1500;
    document.getElementById("label").textContent = "Study";
  }
  updateDisplay();
}

function increment(multiplyer) {
  let num = currentTimeSeconds + multiplyer;
  currentTimeSeconds = num > 5999 ? 5999 : num;
  updateDisplay();
}

function decrement(multiplyer) {
  let num = currentTimeSeconds - multiplyer;
  currentTimeSeconds = num < 0 ? 0 : num;
  updateDisplay();
}

const startSessionButton = document.querySelector("#beforestart button");
const endSessionButton = document.querySelector("#endsession");
const submitButton = document.querySelector("form button");
const form = document.querySelector("form");
const blurry = document.querySelector("#blur");
let sessionStartTime;
let lengthSessionMinutes;

function fadeIn(target) {
  target.style.animationDuration = "1s";
  target.style.animationName = "fadeIn";
  target.classList.remove("hidden");
  target.classList.add("visible");
}
function fadeOut(target) {
  target.style.animationDuration = "1s";
  target.style.animationName = "fadeOut";
  setTimeout(() => {
    target.classList.remove("visible");
    target.classList.add("hidden");
  }, 900);
}

startSessionButton.addEventListener("click", () => {
  sessionStartTime = Date.now();
  blurry.style.animationDuration = "1s";
  blurry.style.animationName = "blurOut";
  blurry.style.filter = "none";

  fadeOut(startSessionButton);
});

endSessionButton.addEventListener("click", () => {
  lengthSessionMinutes = (new Date.now() - sessionStartTime) / 60000;
  blurry.style.animationDuration = "1s";
  blurry.style.animationName = "blurIn";
  blurry.style.filter = "blur(10px)";

  fadeIn(form);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  fadeOut(form);
  setTimeout(fadeIn(startSessionButton), 500);

  const description = document.querySelector(input).value;
  const currentDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentDate, lengthSessionMinutes, description }),
    });
  } catch (error) {
    console.eror("Error:", error);
  }
});
