
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ".And mark percentage is: " + (quiz.score / questions.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};


var questions = [
    new Question("Which language runs in a web browser?", ["Java", "C", "Python", "JavaScript"], "JavaScript"),
    new Question("What does CSS stand for?", ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"], "Cascading Style Sheets"),
    new Question("What does HTML stand for", ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis",], "Hypertext Markup Language"),
    new Question("What year was JavaScript launched?", ["1996", "1995", "1994", "none of the above"], "1995"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

var quiz = new Quiz(questions);

loadQuestions();