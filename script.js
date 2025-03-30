// Sample Quiz Questions
const quizData=[
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"],answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"],answer: "Mars" },
    { question: "What is 5 + 3?", options: ["5", "8", "12", "15"],answer: "8" },
    { question:"What is the capital of Inida",option:["Delhi","Pune","Mumbai","Jaipur"],answer:"Delhi"}
];

let questionIndex=0;
let score=0;
let timer;
let timeLeft=10;

function startQuiz(){
    document.getElementById("home-screen").style.display="none";
    document.getElementById("quiz-screen").style.display="block";
    loadQuestion();
}

function loadQuestion(){
    if (questionIndex>=quizData.length){
        endQuiz();
        return;
    }
    
    document.getElementById("question").innerText=quizData[questionIndex].question;
    const optionsDiv=document.getElementById("options");
    optionsDiv.innerHTML="";  

    quizData[questionIndex].options.forEach(option=>{
        const btn = document.createElement("button");
        btn.innerText=option;
        btn.onclick=()=>checkAnswer(option);
        optionsDiv.appendChild(btn);
    });

    startTimer();
}

function startTimer(){
    timeLeft=10;
    document.getElementById("time").innerText=timeLeft;

    clearInterval(timer);
    timer = setInterval(()=>{
        timeLeft--;
        document.getElementById("time").innerText=timeLeft;
        
        if (timeLeft<=0){
            nextQuestion();
        }
    },1000);
}

function checkAnswer(selectedOption) {
    if (selectedOption===quizData[questionIndex].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);
    questionIndex++;
    loadQuestion();
}

function endQuiz() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("final-score").innerText = score;
}

function saveScore() {
    let scores=JSON.parse(localStorage.getItem("leaderboard"))||[];
    let name=prompt("Enter your name:");
    
    if (name) {
        scores.push({ name, score });
        localStorage.setItem("leaderboard", JSON.stringify(scores));
        showLeaderboard();
    }
}

function showLeaderboard() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("leaderboard-screen").style.display = "block";
    
    let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.sort((a, b) => b.score - a.score);

    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";
    scores.forEach(entry => {
        let li = document.createElement("li");
        li.innerText = `${entry.name}: ${entry.score}`;
        leaderboard.appendChild(li);
    });
}

function restartQuiz() {
    questionIndex=0;
    score=0;
    document.getElementById("leaderboard-screen").style.display="none";
    document.getElementById("home-screen").style.display="block";
}
