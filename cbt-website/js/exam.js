const STORAGE_KEY = "cbtProExam";

function getExamData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
}

function saveExamData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const onLoginPage = document.getElementById("loginForm");

if (onLoginPage) {
  onLoginPage.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      studentName: document.getElementById("studentName").value.trim(),
      studentClass: document.getElementById("studentClass").value,
      subject: document.getElementById("subject").value,
      answers: Array(questions.length).fill(null),
      marked: Array(questions.length).fill(false),
      current: 0,
      timeLeft: 20 * 60
    };

    saveExamData(data);
    window.location.href = "exam.html";
  });
}

const questionText = document.getElementById("questionText");

if (questionText) {
  let data = getExamData();

  if (!data) {
    window.location.href = "index.html";
  } else {
    let timerInterval;

    const questionNumber = document.getElementById("questionNumber");
    const optionsBox = document.getElementById("options");
    const questionNav = document.getElementById("questionNav");
    const progressBar = document.getElementById("progressBar");
    const studentDisplay = document.getElementById("studentDisplay");
    const subjectDisplay = document.getElementById("subjectDisplay");
    const timer = document.getElementById("timer");

    studentDisplay.textContent = data.studentName;
    subjectDisplay.textContent = data.subject;

    function renderQuestion() {
      const q = questions[data.current];

      questionNumber.textContent =
        `Question ${data.current + 1} of ${questions.length}`;

      questionText.textContent = q.question;

      optionsBox.innerHTML = "";

      q.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option";

        if (data.answers[data.current] === index) {
          label.classList.add("selected");
        }

        label.innerHTML = `
          <input type="radio" name="answer" value="${index}"
            ${data.answers[data.current] === index ? "checked" : ""}>
          <span><strong>${String.fromCharCode(65 + index)}.</strong> ${option}</span>
        `;

        label.querySelector("input").addEventListener("change", function () {
          data.answers[data.current] = index;
          saveExamData(data);
          renderQuestion();
        });

        optionsBox.appendChild(label);
      });

      progressBar.style.width =
        `${((data.current + 1) / questions.length) * 100}%`;

      renderNavigator();

      document.getElementById("prevBtn").disabled = data.current === 0;
      document.getElementById("nextBtn").textContent =
        data.current === questions.length - 1 ? "Finish" : "Next";
    }

    function renderNavigator() {
      questionNav.innerHTML = "";

      questions.forEach((_, index) => {
        const button = document.createElement("button");
        button.className = "nav-btn";
        button.textContent = index + 1;

        if (data.answers[index] !== null) {
          button.classList.add("answered");
        }

        if (data.marked[index]) {
          button.classList.add("marked");
        }

        if (index === data.current) {
          button.classList.add("current");
        }

        button.addEventListener("click", function () {
          data.current = index;
          saveExamData(data);
          renderQuestion();
        });

        questionNav.appendChild(button);
      });
    }

    function formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }

    function startTimer() {
      timer.textContent = formatTime(data.timeLeft);

      timerInterval = setInterval(() => {
        data.timeLeft--;
        timer.textContent = formatTime(data.timeLeft);
        saveExamData(data);

        if (data.timeLeft <= 0) {
          clearInterval(timerInterval);
          submitExam(true);
        }
      }, 1000);
    }

    function submitExam(autoSubmit = false) {
      if (!autoSubmit) {
        const unanswered = data.answers.filter(a => a === null).length;

        const message = unanswered > 0
          ? `You have ${unanswered} unanswered question(s). Submit anyway?`
          : "Are you sure you want to submit the examination?";

        if (!confirm(message)) return;
      }

      clearInterval(timerInterval);

      let correct = 0;

      questions.forEach((q, index) => {
        if (data.answers[index] === q.answer) {
          correct++;
        }
      });

      data.correct = correct;
      data.wrong = questions.length - correct;
      data.score = Math.round((correct / questions.length) * 100);

      saveExamData(data);
      window.location.href = "result.html";
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
      if (data.current > 0) {
        data.current--;
        saveExamData(data);
        renderQuestion();
      }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      if (data.current < questions.length - 1) {
        data.current++;
        saveExamData(data);
        renderQuestion();
      } else {
        submitExam(false);
      }
    });

    document.getElementById("markBtn").addEventListener("click", () => {
      data.marked[data.current] = !data.marked[data.current];
      saveExamData(data);
      renderQuestion();
    });

    document.getElementById("submitBtn").addEventListener("click", () => {
      submitExam(false);
    });

    renderQuestion();
    startTimer();
  }
}
