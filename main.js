// CODE BANGLA - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  // Mobile navigation
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("open");

      const isOpen = navMenu.classList.contains("open");
      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Lesson information
  const lessons = {
    html: {
      title: "HTML - ওয়েবসাইটের কাঠামো",
      text: "HTML দিয়ে ওয়েবপেজের শিরোনাম, অনুচ্ছেদ, ছবি ও লিংক তৈরি করা হয়। HTML হলো Markup Language, প্রোগ্রামিং ভাষা নয়।",
      example:
`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>আমার পেজ</title>
</head>
<body>
  <h1>আমার প্রথম ওয়েবসাইট</h1>
  <p>আমি HTML শিখছি।</p>
</body>
</html>`
    },

    css: {
      title: "CSS - ওয়েবসাইটের ডিজাইন",
      text: "CSS দিয়ে ওয়েবসাইটের রং, ফন্ট, দূরত্ব ও লেআউট সাজানো যায়।",
      example:
`h1 {
  color: blue;
  text-align: center;
}

p {
  font-size: 18px;
  color: #333333;
}`
    },

    js: {
      title: "JavaScript - ওয়েবসাইটকে সক্রিয় করা",
      text: "JavaScript দিয়ে বাটনে ক্লিক, কুইজ, হিসাব এবং অন্যান্য ইন্টারঅ্যাকটিভ সুবিধা তৈরি করা যায়।",
      example:
`const name = "শিক্ষার্থী";

function greet() {
  alert("স্বাগতম, " + name + "!");
}

greet();`
    }
  };

  const lessonContent = document.getElementById("lessonContent");
  const lessonTitle = document.getElementById("lessonTitle");
  const lessonText = document.getElementById("lessonText");
  const lessonExample = document.getElementById("lessonExample");
  const completeBtn = document.getElementById("completeBtn");

  let activeLesson = null;
  let completedLessons = [];

  // Restore completed lessons
  try {
    const saved = JSON.parse(
      localStorage.getItem("codeBanglaCompleted") || "[]"
    );

    if (Array.isArray(saved)) {
      completedLessons = saved.filter(function (item) {
        return Object.prototype.hasOwnProperty.call(
          lessons,
          item
        );
      });
    }
  } catch (error) {
    completedLessons = [];
  }

  function updateProgress() {
    const count = completedLessons.length;
    const countElement = document.getElementById("completedCount");
    const bar = document.getElementById("progressBar");
    const message = document.getElementById("progressMessage");

    if (countElement) {
      countElement.textContent = String(count);
    }

    if (bar) {
      bar.style.width = (count / 3 * 100) + "%";
    }

    if (message) {
      if (count === 3) {
        message.textContent =
          "অভিনন্দন! তুমি তিনটি পাঠই সম্পন্ন করেছ!";
      } else if (count === 0) {
        message.textContent =
          "শেখা শুরু করো—তুমি পারবে!";
      } else {
        message.textContent =
          "দারুণ! আরও " + (3 - count) +
          "টি পাঠ সম্পন্ন করো।";
      }
    }

    try {
      localStorage.setItem(
        "codeBanglaCompleted",
        JSON.stringify(completedLessons)
      );
    } catch (error) {
      // Progress still works for the current session.
    }

    document.querySelectorAll(".lesson-btn").forEach(function (button) {
      const done = completedLessons.includes(
        button.dataset.lesson
      );

      button.textContent = done
        ? "পুনরায় শেখো ↻"
        : button.dataset.lesson.toUpperCase() + " শেখো →";
    });
  }

  // Open lesson
  document.querySelectorAll(".lesson-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.dataset.lesson;
      const lesson = lessons[key];

      if (!lesson) return;

      activeLesson = key;
      lessonTitle.textContent = lesson.title;
      lessonText.textContent = lesson.text;
      lessonExample.textContent = lesson.example;
      completeBtn.textContent = completedLessons.includes(key)
        ? "পাঠ সম্পন্ন হয়েছে ✓"
        : "পাঠ সম্পন্ন করেছি ✓";

      lessonContent.hidden = false;
      lessonContent.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Complete lesson
  if (completeBtn) {
    completeBtn.addEventListener("click", function () {
      if (!activeLesson) return;

      if (!completedLessons.includes(activeLesson)) {
        completedLessons.push(activeLesson);
      }

      updateProgress();
      completeBtn.textContent = "পাঠ সম্পন্ন হয়েছে ✓";
    });
  }

  // Quiz questions
  const questions = [
    {
      question: "HTML-এর পূর্ণরূপ কী?",
      answers: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Home Tool Markup Language"
      ],
      correct: 0,
      explanation:
        "সঠিক উত্তর! HTML-এর পূর্ণরূপ HyperText Markup Language।"
    },
    {
      question: "ওয়েবসাইটের ডিজাইন করতে কোনটি ব্যবহার করা হয়?",
      answers: [
        "শুধু HTML",
        "CSS",
        "শুধু ছবির ফাইল"
      ],
      correct: 1,
      explanation:
        "ঠিক! CSS দিয়ে রং, ফন্ট ও লেআউট সাজানো হয়।"
    },
    {
      question: "JavaScript দিয়ে কী করা যায়?",
      answers: [
        "শুধু লেখার রং বদলানো",
        "শুধু ছবি দেখা",
        "ওয়েবসাইটে ইন্টারঅ্যাকটিভ সুবিধা তৈরি করা"
      ],
      correct: 2,
      explanation:
        "সঠিক! JavaScript দিয়ে বাটন, কুইজ ও বিভিন্ন কার্যক্রম চালানো যায়।"
    }
  ];

  let questionIndex = 0;
  let score = 0;
  let answered = false;

  const questionNumber = document.getElementById("questionNumber");
  const questionTitle = document.getElementById("question");
  const answersBox = document.getElementById("answers");
  const feedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("nextQuestion");
  const scoreElement = document.getElementById("quizScore");

  function showQuestion() {
    const item = questions[questionIndex];
    answered = false;

    questionNumber.textContent =
      "প্রশ্ন " + (questionIndex + 1) +
      " / " + questions.length;

    questionTitle.textContent = item.question;
    feedback.textContent = "";
    scoreElement.textContent = "";
    nextButton.hidden = true;
    nextButton.textContent =
      questionIndex === questions.length - 1
        ? "আবার কুইজ দাও ↻"
        : "পরের প্রশ্ন →";

    answersBox.replaceChildren();

    item.answers.forEach(function (answer, index) {
      const button = document.createElement("button");
      button.className = "answer";
      button.textContent = answer;

      button.addEventListener("click", function () {
        if (answered) return;

        answered = true;

        const buttons = answersBox.querySelectorAll(".answer");

        buttons.forEach(function (answerButton, i) {
          answerButton.disabled = true;

          if (i === item.correct) {
            answerButton.classList.add("correct");
          }
        });

        if (index === item.correct) {
          score++;
          feedback.textContent = "সঠিক উত্তর! ✓ " + item.explanation;
        } else {
          button.classList.add("wrong");
          feedback.textContent =
            "ভুল হয়েছে। " + item.explanation;
        }

        nextButton.hidden = false;
      });

      answersBox.appendChild(button);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (!answered) return;

      if (questionIndex < questions.length - 1) {
        questionIndex++;
        showQuestion();
      } else {
        questionTitle.textContent = "কুইজ সম্পন্ন!";
        questionNumber.textContent = "ফলাফল";
        answersBox.replaceChildren();
        feedback.textContent = "";
        scoreElement.textContent =
          "তোমার স্কোর: " + score + " / " + questions.length;

        nextButton.textContent = "আবার কুইজ দাও ↻";
        nextButton.hidden = false;
        nextButton.onclick = function () {
          questionIndex = 0;
          score = 0;
          showQuestion();
          nextButton.onclick = null;
        };
      }
    });
  }

  updateProgress();
  showQuestion();
});
