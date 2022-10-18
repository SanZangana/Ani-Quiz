/* jshint esversion: 11 */

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtnElement = document.getElementById('answer-btn');
let answerBtns = document.querySelectorAll('.btn');
let shuffledQuestions, shuffledAnswers, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click' , () => {

    currentQuestionIndex++;
    setNextQuestion();
});


    
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
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
    nextButton.classList.add('hide');
    document.body.classList.remove('wrong', 'correct')
    answerBtns.forEach(btn => {
        btn.classList.remove('wrong', 'correct');
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    answerBtns.forEach(btn => {
        setStatusClass(btn, btn.dataset.correct);
    });
    nextButton.classList.remove('hide');
    
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
