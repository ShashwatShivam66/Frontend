const body = document.body;
const toggleSwitch = document.querySelector('.toggle-switch');
const toggleCircle = document.querySelector('.toggle-circle');

body.classList.add('dark');

toggleSwitch.addEventListener('click', () => {
  body.classList.toggle('light');

  if (body.classList.contains('light')) {
    body.classList.remove('bg-[#1e1e2f]', 'text-white');
    body.classList.add('bg-[#f5f5f5]', 'text-[#1e1e2f]');
    toggleCircle.style.transform = 'translateX(0)';

    document.querySelectorAll('.quiz-button, .option-button').forEach(button => {
      if (!button.classList.contains('selected') && 
          !button.classList.contains('correct') && 
          !button.classList.contains('incorrect')) {
        button.classList.remove('bg-[#2e2e4d]', 'hover:bg-[#3e3e6d]');
        button.classList.add('bg-white', 'hover:bg-gray-100', 'shadow-md', 'text-[#1e1e2f]');
      }
    });
  } else {
    body.classList.remove('bg-[#f5f5f5]', 'text-[#1e1e2f]');
    body.classList.add('bg-[#1e1e2f]', 'text-white');
    toggleCircle.style.transform = 'translateX(24px)';

    document.querySelectorAll('.quiz-button, .option-button').forEach(button => {
      if (!button.classList.contains('selected') && 
          !button.classList.contains('correct') && 
          !button.classList.contains('incorrect')) {
        button.classList.remove('bg-white', 'hover:bg-gray-100', 'shadow-md', 'text-[#1e1e2f]');
        button.classList.add('bg-[#2e2e4d]', 'hover:bg-[#3e3e6d]');
      }
    });
  }
});

toggleCircle.style.transform = 'translateX(24px)';

const quizData = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Technical Modern Language"
      ],
      correct: 0
    },
    {
      question: "Which HTML element is used to define an unordered list?",
      options: ["<ol>", "<list>", "<ul>", "<dl>"],
      correct: 2
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      options: ["class", "style", "font", "styles"],
      correct: 1
    },
    {
      question: "Which HTML element is used to specify a header for a document or section?",
      options: ["<head>", "<top>", "<header>", "<section>"],
      correct: 2
    },
    {
      question: "In HTML, which attribute is used to specify that an input field must be filled out?",
      options: ["validate", "placeholder", "required", "important"],
      correct: 2
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: 1
    },
    {
      question: "Which HTML element defines the title of a document?",
      options: ["<meta>", "<head>", "<title>", "<header>"],
      correct: 2
    },
    {
      question: "Which HTML element is used to define a table?",
      options: ["<table>", "<tab>", "<tbl>", "<grid>"],
      correct: 0
    },
    {
      question: "Which HTML element is used to define important text?",
      options: ["<important>", "<b>", "<strong>", "<em>"],
      correct: 2
    },
    {
      question: "What is the correct HTML for inserting an image?",
      options: [
        "<img href='image.jpg' alt='MyImage'>",
        "<image src='image.jpg' alt='MyImage'>",
        "<img src='image.jpg' alt='MyImage'>",
        "<picture src='image.jpg' alt='MyImage'>"
      ],
      correct: 2
    }
  ],
  css: [
    {
      question: "Which property is used to change the background color?",
      options: ["background-color", "color", "bgcolor", "bg-color"],
      correct: 0
    },
    {
      question: "Which CSS property controls the text size?",
      options: ["text-size", "font-size", "text-style", "font-style"],
      correct: 1
    },
    {
      question: "Which CSS property is used to control the spacing between elements?",
      options: ["spacing", "margin", "padding", "border"],
      correct: 1
    },
    {
      question: "Which CSS property is used to make text bold?",
      options: ["font-weight", "text-style", "font-style", "text-decoration"],
      correct: 0
    },
    {
      question: "Which CSS property is used to change the font of an element?",
      options: ["font-style", "text-style", "font-family", "text-family"],
      correct: 2
    },
    {
      question: "How do you select an element with id 'demo'?",
      options: [".demo", "#demo", "demo", "*demo"],
      correct: 1
    },
    {
      question: "How do you select elements with class name 'test'?",
      options: [".test", "#test", "test", "*test"],
      correct: 0
    },
    {
      question: "Which property is used to change the left margin of an element?",
      options: ["padding-left", "margin-left", "indent", "left-margin"],
      correct: 1
    },
    {
      question: "How do you make a list that lists its items with squares?",
      options: [
        "list-style-type: square;",
        "list: square;",
        "list-type: square;",
        "list-style: square;"
      ],
      correct: 0
    },
    {
      question: "Which CSS property controls the text color?",
      options: ["text-color", "font-color", "color", "text-style"],
      correct: 2
    }
  ],
  javascript: [
    {
      question: "Which operator is used to assign a value to a variable?",
      options: ["*", "-", "=", "x"],
      correct: 2
    },
    {
      question: "How do you create a function in JavaScript?",
      options: [
        "function myFunction()",
        "function:myFunction()",
        "function = myFunction()",
        "myFunction() = function"
      ],
      correct: 0
    },
    {
      question: "How do you call a function named 'myFunction'?",
      options: [
        "call myFunction()",
        "myFunction()",
        "call function myFunction()",
        "execute myFunction()"
      ],
      correct: 1
    },
    {
      question: "How to write an IF statement in JavaScript?",
      options: [
        "if i = 5 then",
        "if i == 5 then",
        "if (i == 5)",
        "if i = 5"
      ],
      correct: 2
    },
    {
      question: "How to write an IF statement for executing code if 'i' is NOT equal to 5?",
      options: [
        "if (i != 5)",
        "if i <> 5",
        "if (i <> 5)",
        "if i =! 5 then"
      ],
      correct: 0
    },
    {
      question: "How does a WHILE loop start?",
      options: [
        "while (i <= 10)",
        "while i = 1 to 10",
        "while (i <= 10; i++)",
        "while i <= 10"
      ],
      correct: 0
    },
    {
      question: "How does a FOR loop start?",
      options: [
        "for i = 1 to 5",
        "for (i = 0; i <= 5)",
        "for (i = 0; i <= 5; i++)",
        "for (i <= 5; i++)"
      ],
      correct: 2
    },
    {
      question: "How do you add a comment in JavaScript?",
      options: [
        "<!--This is a comment-->",
        "//This is a comment",
        "'This is a comment",
        "#This is a comment"
      ],
      correct: 1
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      options: [
        "var colors = ['red', 'green', 'blue']",
        "var colors = (1:'red', 2:'green', 3:'blue')",
        "var colors = 'red', 'green', 'blue'",
        "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
      ],
      correct: 0
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        "Math.round(7.25)",
        "round(7.25)",
        "Math.rnd(7.25)",
        "rnd(7.25)"
      ],
      correct: 0
    }
  ],
  accessibility: [
    {
      question: "What does WCAG stand for?",
      options: [
        "Web Content Accessibility Guidelines",
        "Web Compliance Accessibility Guide",
        "Website Content Accessibility Goals",
        "Web Content Accessibility Goals"
      ],
      correct: 0
    },
    {
      question: "Which attribute is used to provide text alternatives for images?",
      options: ["title", "alt", "description", "caption"],
      correct: 1
    },
    {
      question: "What is the purpose of ARIA in web accessibility?",
      options: [
        "To style web pages for screen readers",
        "To provide additional navigation options",
        "To make dynamic web content more accessible",
        "To validate HTML code for errors"
      ],
      correct: 2
    },
    {
      question: "Which of these color combinations typically provides the best contrast for accessibility?",
      options: [
        "Light gray text on white background",
        "Yellow text on white background",
        "White text on black background",
        "Blue text on red background"
      ],
      correct: 2
    },
    {
      question: "What is the recommended minimum contrast ratio for normal text according to WCAG AA standards?",
      options: ["2:1", "3:1", "4.5:1", "7:1"],
      correct: 2
    },
    {
      question: "Which HTML element is used to define a caption for a table?",
      options: ["<caption>", "<title>", "<header>", "<description>"],
      correct: 0
    },
    {
      question: "What is the purpose of the 'lang' attribute in HTML?",
      options: [
        "To specify the scripting language",
        "To define the language of the document",
        "To set language preferences for the browser",
        "To translate content automatically"
      ],
      correct: 1
    },
    {
      question: "Which of the following is NOT a principle of the WCAG?",
      options: ["Perceivable", "Operable", "Understandable", "Affordable"],
      correct: 3
    },
    {
      question: "What is the purpose of skip navigation links?",
      options: [
        "To help users skip unwanted content",
        "To allow keyboard users to bypass repetitive navigation",
        "To improve page loading speed",
        "To hide navigation on mobile devices"
      ],
      correct: 1
    },
    {
      question: "Which of these is an example of assistive technology?",
      options: [
        "Google Chrome",
        "Screen reader",
        "JavaScript",
        "CSS framework"
      ],
      correct: 1
    }
  ]
};

let currentQuiz = '';
let currentQuestion = 0;
let userAnswers = [];
let selectedOption = null;

const mainMenu = document.getElementById('main-menu');
const quizArea = document.getElementById('quiz-area');
const resultsContainer = document.getElementById('results-container');
const leftPanel = document.getElementById('left-panel');
const questionCounter = document.getElementById('question-counter');
const questionStatus = document.getElementById('question-status');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const backToMenuBtn = document.getElementById('back-to-menu');
const finalScore = document.getElementById('final-score');
const questionReview = document.getElementById('question-review');
const playAgainBtn = document.getElementById('play-again');
const returnToMenuBtn = document.getElementById('return-to-menu');
const progressFill = document.querySelector('.progress-fill');

document.querySelectorAll('[data-quiz]').forEach(button => {
  button.addEventListener('click', () => {
    currentQuiz = button.getAttribute('data-quiz');
    currentQuestion = 0;
    userAnswers = Array(quizData[currentQuiz].length).fill(null);
    startQuiz();
  });
});

function startQuiz() {
  mainMenu.style.display = 'none';
  quizArea.classList.remove('hidden');
  resultsContainer.classList.add('hidden');
  
  leftPanel.innerHTML = `
    <h1 class="text-2xl md:text-4xl font-bold">${currentQuiz.toUpperCase()}</h1>
    <p class="text-gray-400 text-sm md:text-base">Test your knowledge</p>
  `;
  
  loadQuestion();
  updateNavButtons();
}

function loadQuestion() {
  const question = quizData[currentQuiz][currentQuestion];
  selectedOption = userAnswers[currentQuestion];
  
  questionCounter.textContent = `Question ${currentQuestion + 1}/${quizData[currentQuiz].length}`;
  questionStatus.textContent = userAnswers[currentQuestion] !== null ? "Answered" : "Not answered";
  questionStatus.className = userAnswers[currentQuestion] !== null ? "text-green-500" : "text-gray-400";
  progressFill.style.width = `${((currentQuestion + 1) / quizData[currentQuiz].length) * 100}%`;
  
  questionText.textContent = question.question;
  
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = body.classList.contains('light') 
      ? 'option-button bg-white hover:bg-gray-100 shadow-md text-[#1e1e2f] w-full p-4 rounded-xl text-left pl-6'
      : 'option-button bg-[#2e2e4d] hover:bg-[#3e3e6d] w-full p-4 rounded-xl text-left pl-6';
    
    if (selectedOption === index) {
      button.classList.add('selected');
    }
    
    button.textContent = option;
    button.dataset.index = index;
    
    button.addEventListener('click', selectOption);
    
    optionsContainer.appendChild(button);
  });
  
  if (currentQuestion === quizData[currentQuiz].length - 1) {
    const allAnswered = userAnswers.every(answer => answer !== null);
    submitBtn.classList.toggle('hidden', !allAnswered);
  } else {
    submitBtn.classList.add('hidden');
  }
}

function selectOption(e) {
  document.querySelectorAll('.option-button').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  e.target.classList.add('selected');
  selectedOption = parseInt(e.target.dataset.index);
  
  userAnswers[currentQuestion] = selectedOption;
  
  questionStatus.textContent = "Answered";
  questionStatus.className = "text-green-500";
  
  if (currentQuestion === quizData[currentQuiz].length - 1) {
    const allAnswered = userAnswers.every(answer => answer !== null);
    submitBtn.classList.toggle('hidden', !allAnswered);
  }
}

function updateNavButtons() {
  prevBtn.disabled = currentQuestion === 0;
  prevBtn.classList.toggle('opacity-50', currentQuestion === 0);
  
  if (currentQuestion === quizData[currentQuiz].length - 1) {
    nextBtn.textContent = "Review Answers";
    const allAnswered = userAnswers.every(answer => answer !== null);
    submitBtn.classList.toggle('hidden', !allAnswered);
  } else {
    nextBtn.textContent = "Next";
    submitBtn.classList.add('hidden');
  }
}

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
    updateNavButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < quizData[currentQuiz].length - 1) {
    currentQuestion++;
    loadQuestion();
    updateNavButtons();
  } else {
    showQuestionReview();
  }
});

function showQuestionReview() {
  alert("Review your answers before submitting. Click Submit Quiz when ready.");
  
  const allAnswered = userAnswers.every(answer => answer !== null);
  submitBtn.classList.toggle('hidden', !allAnswered);
  
  if (!allAnswered) {
    alert("You haven't answered all questions yet!");
  }
}

submitBtn.addEventListener('click', () => {
  showResults();
});

function showResults() {
  quizArea.classList.add('hidden');
  resultsContainer.classList.remove('hidden');
  
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === quizData[currentQuiz][index].correct) {
      score++;
    }
  });
  
  finalScore.textContent = `${score}/${quizData[currentQuiz].length}`;
  
  leftPanel.innerHTML = `
    <h1 class="text-2xl md:text-4xl font-bold">Quiz Completed!</h1>
    <p class="text-gray-400 text-sm md:text-base">${currentQuiz.toUpperCase()} quiz results</p>
  `;
  
  questionReview.innerHTML = '';
  userAnswers.forEach((answer, index) => {
    const question = quizData[currentQuiz][index];
    const isCorrect = answer === question.correct;
    
    const reviewItem = document.createElement('div');
    reviewItem.className = 'p-3 rounded-lg ' + (isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800');
    
    reviewItem.innerHTML = `
      <p class="font-bold">${index + 1}. ${question.question}</p>
      <p>Your answer: ${question.options[answer]}</p>
      ${!isCorrect ? `<p>Correct answer: ${question.options[question.correct]}</p>` : ''}
    `;
    
    questionReview.appendChild(reviewItem);
  });
}

playAgainBtn.addEventListener('click', () => {
  currentQuestion = 0;
  userAnswers = Array(quizData[currentQuiz].length).fill(null);
  startQuiz();
});

function returnToMenu() {
  mainMenu.style.display = 'block';
  quizArea.classList.add('hidden');
  resultsContainer.classList.add('hidden');
  
  leftPanel.innerHTML = `
    <h1 class="text-2xl md:text-4xl font-normal">
      Welcome to the 
      <span class="block font-bold text-3xl md:text-5xl mt-1">Frontend Quiz!</span>
    </h1>
    <p class="text-gray-400 text-sm md:text-base">Pick a subject to get started.</p>
  `;
}

backToMenuBtn.addEventListener('click', returnToMenu);
returnToMenuBtn.addEventListener('click', returnToMenu);