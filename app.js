let container = document.querySelector(".container");
let highScore = document.querySelector("#highScore");
let score = document.querySelector("#score");
let btn = document.querySelector("#btn");
let input = document.querySelector(".ansBox");
let question = document.querySelector("#question");
let reset = document.querySelector(".reset");
let remainingTime = document.querySelector("#remainingTime");
let replayBtn = document.querySelector("#replayBtn");
let replay = document.querySelector(".replay");
let timer = document.querySelector(".timer");
let timeLoader = document.querySelector(".timeLoader");
let starter = document.querySelector(".starter");
let startBtn = document.querySelector("#startBtn");

let time = 60;
remainingTime.innerText = time;

let result = 0;
let scoreVal = 0;

function updateQuestion() {
  score.innerText = scoreVal;
  let a = Math.floor(Math.random() * 51);
  let b = Math.floor(Math.random() * 51);

  result = a * b;

  question.innerText = `What is ${a} multiply by ${b}?`;
}

function checkAns() {
  if (input.value == result) {
    scoreVal += 4;
  } else {
    scoreVal -= 1;
  }
}

function updateLocalStorage(value) {
  localStorage.setItem("highScore", JSON.stringify(value));
}

function updateScorecard() {
  checkAns();
  score.innerText = scoreVal;
  input.value = "";
  updateQuestion();
}

// result by button press logic
btn.addEventListener("click", updateScorecard);

//result by enter key press logic
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    updateScorecard();
  }
});

//reset button logic
reset.addEventListener("click", () => {
  highScore.innerText = 0;
  updateLocalStorage(0);
});

function play() {
  let loopId = setInterval(() => {
    time -= 1;
    remainingTime.innerText = time;
    if (time < 10) {
      timer.style.color = "red";
    }
    if (time == 0) {
      timeLoader.style.display = "none";
      if (scoreVal > parseInt(localStorage.getItem("highScore"))) {
        highScore.innerText = scoreVal;
        updateLocalStorage(scoreVal);
      }
      btn.style = "display:none";
      input.style = "display:none";
      question.style = "display:none";
      replay.classList.toggle("hidden");
      replay.classList.toggle("visible");
      clearInterval(loopId);
      loopId = null;
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  container.classList.toggle("hidden");
  container.classList.toggle("visibleContainer");
  starter.style.display = "none";
  if (!parseInt(localStorage.getItem("highScore"))) {
    updateLocalStorage(0);
    highScore.innerText = 0;
  } else {
    highScore.innerText = parseInt(localStorage.getItem("highScore"));
  }
  updateQuestion();
  play();
});

replayBtn.addEventListener("click", () => {
  btn.style = "display:block";
  input.style = "display:block";
  question.style = "display:block";
  replay.classList.toggle("visible");
  replay.classList.toggle("hidden");
  scoreVal = 0;
  time = 60;
  remainingTime.innerText = time;
  timer.style.color = "black";
  timeLoader.style.display = "block";
  updateQuestion();
  play();
});
