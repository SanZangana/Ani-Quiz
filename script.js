const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtnElement = document.getElementById('answer-btn');
let answerBtns = document.querySelectorAll('.btn');
let shuffledQuestions, shuffledAnswers, currentQuestionIndex;

startButton.addEventListener('click', startGame);

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}
function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
    questionElement.innerText = question.question; 
    shuffledAnswers = question.answers.sort(() => Math.random() - .5);
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

function selectAnswer() {
    console.log('button was clicked')

}
const questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '55', correct: false},
            {text: '89', correct: false},
        ]
    },
    {
        question: 'What is 4 + 4',
        answers: [
            {text: '8', correct: true},
            {text: '22', correct: false},
            {text: '48', correct: false},
            {text: '9', correct: false},
        ]
    }
];