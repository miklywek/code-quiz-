var questions = [
  {
    question: "Commonly used data types DO NOT include?",
    answer1: "String",
    answer2: "Booleans",
    answer3: "Alerts",
    answer4: "Numbers",
    correct: "Alerts",
  },
  {
    question: "Wich is the most popular sport to create a film about?",
    answer1: "Soccer",
    answer2: "Base Ball",
    answer3: "Boxing",
    answer4: "Tenis",
    correct: "Soccer",
  },
  {
    question: "Math.random() returns ____.?",
    answer1: "a number between 1 and 9",
    answer2: "a number between 0 and 9",
    answer3: "a number between 0 and 1",
    answer4: " number between 0 and 99",
    correct: "a number between 0 and 1",
  },
  {
    question: "The first index of an array is ____.",
    answer1: "0",
    answer2: "1",
    answer3: "6",
    answer4: "custom",
    correct: "0",
  },
  {
    question:
      "To see if two variables are equal in an if / else statement you would use ____.",
    answer1: "=",
    answer2: "==",
    answer3: "!=",
    answer4: "equals",
    correct: "==",
  },
];
localStorage.setItem("highscores", "test string");
var inputLine = document.getElementById("inlineFormInput");
const countDownEl = document.getElementById("countDown");
const startBtn = document.querySelector(".start-btn");
var display = document.querySelector(".content");
var display2 = document.querySelector(".start-content");
var submitButton = document.getElementById("buttonInitials");
var yourScore = document.querySelector(".display-3");
var containerAgree = document.querySelector(".container-aggregate");
var buttonWraper = document.querySelector(".button-wraper");
var showScore = document.querySelector(".showHightScore");
var totalScore = 0;
var parsScoce;
var heightScore;

var secondsLeft = 50;

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    countDownEl.textContent = "Time:" + secondsLeft;
    if (secondsLeft <= 0 || runningQuestion == 5) {
      myStopFunction();
      cardQuestions.setAttribute("style", "display: none");
      display.setAttribute("style", "display: none");
      startBtn.setAttribute("style", "display: none");
      submitButton.setAttribute("style", "display: block");
      containerAgree.setAttribute("style", "display: flex");

      yourScore.textContent = "Your score is: " + totalScore;
      yourScore.setAttribute("style", "dispaly: inline");
    }

    countDownEl.textContent = "Time:" + secondsLeft;
  }, 1000);
  function myStopFunction() {
    clearInterval(timerInterval);
  }
}
function displayHightScore() {
  var showHightScore = JSON.parse(heightScore);
  showScore.textContent = showHightScore.initials + showHightScore.totalScore;
}
showScore.addEventListener("click", displayHightScore);

function startGame() {
  setTime();
  firstQuestion();
  display.setAttribute("style", "display: none");
  cardQuestions.setAttribute("style", "display: block");
}
var answer1 = document.getElementById("button1");
var answer2 = document.getElementById("button2");
var answer3 = document.getElementById("button3");
var answer4 = document.getElementById("button4");
var question = document.getElementById("questions");
var correctAnswer = document.getElementById("correctIncorrect");
var incorrectAnswer = document.getElementById("correctIncorrect");
var cardQuestions = document.getElementById("questionsCard");

var runningQuestion = 0;

function firstQuestion() {
  var quest = questions[runningQuestion];
  question.textContent = quest.question;
  answer1.textContent = quest.answer1;
  answer1.setAttribute("data-value", quest.answer1);
  answer2.textContent = quest.answer2;
  answer2.setAttribute("data-value", quest.answer2);
  answer3.textContent = quest.answer3;
  answer3.setAttribute("data-value", quest.answer3);
  answer4.textContent = quest.answer4;
  answer4.setAttribute("data-value", quest.answer4);
}
var quizBtn = document.querySelectorAll(".quizBtn");
buttonWraper.addEventListener("click", function (event) {
  var target = event.target;
  console.log(target.getAttribute("data-value"));
  if (
    target.getAttribute("data-value") === questions[runningQuestion].correct
  ) {
    correctAnswer.textContent = "Correct";
    correctAnswer.setAttribute("style", "color: purple");
    totalScore++;
    yourScore.textContent = "Your score is: " + totalScore;
    console.log("correct");
  } else {
    incorrectAnswer.textContent = "Incorrect - 5 sec";
    incorrectAnswer.setAttribute("style", "color: red");
    secondsLeft = secondsLeft - 5;
  }
  runningQuestion++;

  if (runningQuestion < 5) {
    firstQuestion();
  }
});

submitButton.addEventListener("click", function (event) {
  event.stopPropagation();
  var initials = inputLine.value;
  var finalScore = { initials, totalScore };
  heightScore = localStorage.getItem("finalScore");
  if (heightScore) {
    parsScoce = JSON.parse(heightScore);
    if (finalScore.totalScore > parsScoce.totalScore) {
      localStorage.setItem("finalScore", JSON.stringify(finalScore));
      heightScore = localStorage.getItem("finalScore");
    }
  } else {
    localStorage.setItem("finalScore", JSON.stringify(finalScore));
  }
});

startBtn.addEventListener("click", startGame);
