const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text: "Shark", correct:"false"},
            {text: "Blue Whale", correct:"true"},
            {text: "Elephant", correct:"false"},
            {text: "Girarfe", correct:"false"},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Vetican City", correct:"true"},
            {text: "Bhutan", correct:"false"},
            {text: "Nepal", correct:"false"},
            {text: "Sri Lanka", correct:"false"},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers:[
            {text: "Kalahari", correct:"false"},
            {text: "Gobi", correct:"false"},
            {text: "Sahara", correct:"false"},
            {text: "Antartica", correct:"true"},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct:"false"},
            {text: "Australia", correct:"true"},
            {text: "Antartica", correct:"false"},
            {text: "Africa", correct:"false"},
        ]
    },
];

const quesElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    quesElement.textContent = quesNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    quesElement.textContent = `You Scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener('click', startQuiz);
}

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuesIndex < questions.length){
        handleNextButton();
    }
});
startQuiz();