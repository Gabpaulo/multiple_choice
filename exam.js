const questions = [
    'Which company developed JavaScript?|Microsoft|Mozilla|Google|Netscape|3',
    'Which of the following is a JavaScript data type?|Integer|Character|Boolean|Float|2',
    'How do you declare a JavaScript variable?|var myVar;|int myVar;|let myVar: int;|declare myVar;|0',
    'Which symbol is used for comments in JavaScript?|//|#|/*|<!--|0',
    'What is the output of typeof NaN?|number|string|undefined|object|0',
    'Which method is used to convert a JSON string into a JavaScript object?|JSON.parse()|JSON.stringify()|eval()|convert()|0',
    'What will be the output of 5 + "5"?|10|55|undefined|NaN|1',
    'Which function is used to parse a string to an integer?|parseInt()|parseFloat()|toInteger()|Number()|0',
    'How do you create a function in JavaScript?|function myFunction()|create myFunction()|function:myFunction()|myFunction()|0',
    'What does NaN stand for?|Not a Number|Not a Null|Not a Name|None at All|0',
    'Which operator is used to assign a value to a variable?|==|===|:=|=|3',
    'How can you add a comment in a JavaScript file?| !comment|# comment|// comment|/* comment */|2',
    'What is the correct way to write a conditional statement in JavaScript?|if (x = 5)|if (x == 5)|if (x === 5)|if x = 5|2',
    'Which of the following is a way to declare a variable in JavaScript?|var|let|const|All of the above|3',
    'What is the default value of an uninitialized variable in JavaScript?|null|undefined|0|""|1',
    'Which of the following methods can be used to create an array?|new Array()|[]|Array.of()|All of the above|3',
    'What does the "this" keyword refer to in JavaScript?|The global object|The calling object|The function itself|None of the above|1',
    'Which event occurs when the user clicks on an HTML element?|onmouseover|onclick|onchange|onload|1',
    'Which built-in method is used to sort the elements of an array?|Array.sort()|Array.order()|Array.arrange()|Array.list()|0',
    'What will the following code output? console.log(0.1 + 0.2 === 0.3);|true|false|undefined|NaN|1'
];

//Alogrithm ?? idk
//Shuffle array
//Get two questions in that shuffled array and splice display it in the html
//make the  and check button enabled if two options are choosen
//after checking update score. and next will be available
//if after checking its wrong we will push it in the shuffledQ again until we meet in in next iteration

function shuffle(array) {   //yates algorithm miss kinuha ranis google HAHHAHA
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  
    }
    return array;
  }
  

  let shuffledQ = shuffle([...questions]); 
  let score = 0;
  let seconds = 0;
  let minutes = 0;
  let display = document.querySelector('.timer');

const startButton = document.getElementById('startButton');
const timer = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score');
const mainContainer = document.querySelector('.main-container');
const startScreen = document.querySelector('.container');
const checkButton = document.querySelector('.button-check');
const nextButton = document.querySelector('.button-next');
const congrats=document.querySelector('.container-grats');

startButton.addEventListener('click', startQuiz);
checkButton.addEventListener('click', checkAnswers);
nextButton.addEventListener('click', inputQuestions);

function checkIfBothAnswered() {
    const questionElements = document.querySelectorAll(".quiz-container .questions .question");
    let allAnswered = true;
    questionElements.forEach((questionContainer, index) => {
        const selectedOption = questionContainer.querySelector(`input[name="q${index + 1}"]:checked`);
        if (!selectedOption) {
            
            allAnswered = false; 
        }
    });
    checkButton.disabled = !allAnswered;
}

function timeStart() {
    if (seconds === 59){
        seconds = 0;
        minutes++;
    } else {
        seconds++;
    }
    display.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startQuiz() {
    intervalId = setInterval(timeStart, 1000);
    startScreen.style.display = 'none'; 
    timer.style.display = 'block'; 
    mainContainer.style.display = 'grid';
    scoreDisplay.style.display = 'block';
    inputQuestions();
}

function inputQuestions() {
    if (shuffledQ.length === 0) {
        clearInterval(intervalId);
        timer.style.display = 'block'; 
        mainContainer.style.display = 'none';
        scoreDisplay.style.display = 'block';
        congrats.style.display='block';
        scoreDisplay.innerHTML='Score:20';
        return;
    }

    const questionElements = document.querySelectorAll(".quiz-container .questions .question");
    const [question1, question2] = shuffledQ.splice(0, 2);//kuha ug duha ka questions sa shuffled sa first index to 2nd
    console.log([question1,question2]);
    [question1, question2].forEach((questionString, index) => {
        const divide = questionString.split('|');
        const questionText = divide[0];
        const options = divide.slice(1, 5);
        const correctAnswerIndex = parseInt(divide[5]);

        const questionContainer = questionElements[index];
        questionContainer.querySelector(".current-question").innerText = questionText;

        const optionLabels = questionContainer.querySelectorAll("label");
        optionLabels.forEach((label, i) => {
            label.style.color = ''; 
            label.style.border = '';
            label.innerHTML = `<input type="radio" name="q${index + 1}" value="${i}"> ${options[i]}`;
            const radioInput = label.querySelector("input");
            radioInput.disabled = false;
            radioInput.addEventListener('change', checkIfBothAnswered); 
        });

        questionContainer.dataset.questionString = questionString;
        questionContainer.dataset.correctAnswer = correctAnswerIndex;
    });
    
    scoreDisplay.innerText = `Score: ${score}`;
    nextButton.disabled = true;
    checkButton.disabled = true; 
}

function checkAnswers() {
    let correctCount = 0;
    const questionElements = document.querySelectorAll(".quiz-container .questions .question");

    questionElements.forEach((questionContainer, index) => {
        const selectedOption = questionContainer.querySelector(`input[name="q${index + 1}"]:checked`);
        const correctAnswerIndex = parseInt(questionContainer.dataset.correctAnswer);
        const options = questionContainer.querySelectorAll(".options label");

        options.forEach((label, i) => {
            const radioInput = label.querySelector("input");
            if (i === correctAnswerIndex) {
                label.style.color = 'green'; 
                label.style.border = '2px solid green';
            } 
            radioInput.disabled = true;
            if (radioInput.checked && i !== correctAnswerIndex) {
                label.style.color = 'red';
                label.style.border = '2px solid red';
            }
        });

        if (selectedOption && parseInt(selectedOption.value) === correctAnswerIndex) {
            correctCount++;
            score++;
            console.log(shuffledQ);
        } else if (selectedOption) {
            shuffledQ.push(questionContainer.dataset.questionString);
            console.log(shuffledQ);
        }
    });

    scoreDisplay.innerText = `Score: ${score}`;
    checkButton.disabled = true;
    nextButton.disabled = false;
}


