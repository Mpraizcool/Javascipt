const data = JSON.parse(localStorage.getItem("cbtProExam") || "null");

if (!data) {
  window.location.href = "index.html";
} else {
  document.getElementById("resultStudent").textContent =
    `${data.studentName} | ${data.studentClass} | ${data.subject}`;

  document.getElementById("score").textContent = `${data.score}%`;
  document.getElementById("correct").textContent = data.correct;
  document.getElementById("wrong").textContent = data.wrong;
  document.getElementById("total").textContent = questions.length;

  let remark = "Keep practising and reviewing your work.";
  if (data.score >= 70) {
    remark = "Excellent work!";
  } else if (data.score >= 50) {
    remark = "Good effort. Keep improving!";
  }

  document.getElementById("remark").textContent = remark;
}
