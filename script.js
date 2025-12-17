let currentQuestion = 0;
let score = 0;
let startTime;
let timerInterval;
let correctAnswer;

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const questionNumEl = document.getElementById('question-num');
const timerEl = document.getElementById('timer');
const finalTimeEl = document.getElementById('final-time');

// 新しい問題を作る
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion > 30) {
        endGame();
        return;
    }
    questionNumEl.textContent = currentQuestion;
    
    // ランダムな数字（1〜20）
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const isPlus = Math.random() > 0.5;

    if (isPlus) {
        questionEl.textContent = `${num1} + ${num2} =`;
        correctAnswer = num1 + num2;
    } else {
        // 引き算で答えがマイナスにならないように調整
        const n1 = Math.max(num1, num2);
        const n2 = Math.min(num1, num2);
        questionEl.textContent = `${n1} - ${n2} =`;
        correctAnswer = n1 - n2;
    }
    answerInput.value = '';
}

// ゲーム開始
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startTime = Date.now();
    
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timerEl.textContent = elapsed.toFixed(1);
    }, 100);

    nextQuestion();
    answerInput.focus();
});

// 入力判定
answerInput.addEventListener('input', () => {
    if (parseInt(answerInput.value) === correctAnswer) {
        nextQuestion();
    }
});

// ゲーム終了
function endGame() {
    clearInterval(timerInterval);
    const totalTime = (Date.now() - startTime) / 1000;
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalTimeEl.textContent = totalTime.toFixed(2);
}