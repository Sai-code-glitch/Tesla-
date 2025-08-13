const questions = [
  {
    question: "How would you architect a scalable data ingestion system from a global fleet?",
    answer: "distributed systems",
    reveal: "Reforma Group experience revealed."
  },
  {
    question: "Which orchestration tool can utilize 10,000+ GPUs for AI training?",
    answer: "kubernetes",
    reveal: "Cloudscale Technologies experience revealed."
  }
];

let current = 0;

document.getElementById("question-text").innerText = questions[current].question;

document.getElementById("submit-answer").addEventListener("click", () => {
  const userAnswer = document.getElementById("answer-input").value.toLowerCase();
  if (userAnswer.includes(questions[current].answer)) {
    alert(questions[current].reveal);
    current++;
    if (current < questions.length) {
      document.getElementById("question-text").innerText = questions[current].question;
      document.getElementById("answer-input").value = "";
    } else {
      alert("Portfolio fully revealed!");
    }
  } else {
    alert("Try again!");
  }
});
