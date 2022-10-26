/* jshint esversion: 11 */

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtnElement = document.getElementById('answer-btn');
let userResult = document.getElementById('user-result');
let questionCounter = document.getElementById('question-counter');
let answerBtns = document.querySelectorAll('.btn');
let shuffledQuestions, shuffledAnswers, currentQuestionIndex;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
homeButton.addEventListener('click', goHome);
nextButton.addEventListener('click' , () => {

    currentQuestionIndex++;
    setNextQuestion();
});


    
function startGame() {
    startButton.classList.add('hide');
    restartButton.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() { 
    if (currentQuestionIndex < questions.length) {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        nextButton.classList.add('hide');
    }
}


function restartGame(){
    location.reload();
}
function goHome(){
    window.location.href = "index.html";
}

function showQuestion(question) {
    questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerText = question.question; 
    shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);
    answerBtns.forEach(function(btn, btnIndex) {
        shuffledAnswers.forEach(function(answer, answerIndex) {
            if (btnIndex == answerIndex) {
                btn.innerText = answer.text;
                if (answer.correct) {
                    btn.dataset.correct = answer.correct;
                }
                btn.addEventListener('click', selectAnswer);
            }
        });
    });
}

function resetState() { 
    userResult.innerHTML = '';
    nextButton.classList.add('hide');
    document.body.classList.remove('wrong', 'correct')
    answerBtns.forEach(btn => {
        btn.classList.remove('wrong', 'correct');
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        userResult.innerHTML = `Result: <span class="result-${correct}">${correct}</span>`;
    } else {
        userResult.innerHTML = 'Result: <span class="result-wrong">wrong</span>';
    }
    setStatusClass(document.body, correct);
    answerBtns.forEach(btn => {
        setStatusClass(btn, btn.dataset.correct);
    });
    if (currentQuestionIndex + 1 < questions.length) {
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}


function clearStatusClass(element) {
    delete element.dataset.correct;
    element.classList.remove('correct', 'wrong');
}
