//Time Script
var h2 = document.getElementsByTagName('h2')[0],
    seconds = 0,
    minutes = 0,
    hours = 0,
    timerNumbers,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timerNumbers = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    h2.textContent = "Timer: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}
//timer();

//EVENTLISTENERS////////////////////
document.getElementById('higher').addEventListener('click', function () {
    play('higher');
});
document.getElementById('lower').addEventListener('click', function () {
    play('lower');
});

document.getElementById('reset').addEventListener('click', function () {
    fullResetGame();
});

// var pCards = [];
// var pCurrent_Card = 1;
// var pScore = 0;
// var isPlaying = true; // make this false if pScore == 3 ---> RESET BTN
var h2 = document.getElementsByTagName('h2')[1],
    // h2wrong = document.getElementsByTagName('h2')[1],
    pCards = [],
    pCurrent_Card = 1,
    pScore = 0,
    pWrong = 0,
    isPlaying = true,
    makeGuess = true,
    seconds = 0,
    minutes = 0,
    hours = 0,
    timerNumbers,
    t;

//START/////////////////////////
document.getElementById('reset').setAttribute("class", "hide");
shuffleDeck();
initPlayerCards();
timer();
displayCardValuesToConsole();
////////////////////////////////

function displayCardValuesToConsole() {
    var debug = '';
    for (var i = 0; i < pCards.length; i++) {
        debug += pCards[i].value + " ";
    }
    console.log(debug);
}

//Timer 

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timerNumbers = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    h2.textContent = "Timer: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}


function softResetGame() {
    shuffleDeck();
    initPlayerCards();
    displayCardValuesToConsole();
    pCurrent_Card = 1;
    makeGuess = true;
}

function fullResetGame() {
    h2.textContent = "Timer: 00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    timer();
    shuffleDeck();
    initPlayerCards();
    displayCardValuesToConsole();
    pCurrent_Card = 1;
    isPlaying = true;
    makeGuess = true;
    pScore = 0;
    pWrong = 0;
    document.getElementById("wrong").innerHTML = pWrong;
    document.getElementById("score").innerHTML = pScore;
    document.getElementById("winText").innerHTML = "";
    document.getElementById("gameDuration").innerHTML = "";
    document.getElementById("reset").setAttribute("class", "hide");
}


function initPlayerCards() {
    var pCardImg = document.getElementsByName('pCardImg');
    var faceDown = '//www.cs.csubak.edu/~derrick/cs2680/examples/images/b1fv.png';

    for (var i = 0; i < 5; i++) {
        pCards[i] = deck[i];
    }


    pCardImg[0].src = pCards[0].imgSrc;
    for (var i = 1; i < 5; i++) {
        pCardImg[i].src = "";
    }
}

function play(guess) {   // guess "higher" or "lower"
    var resetGame = false;
    if (isPlaying != true) {
        alert("Press 'Reset' to play again.");
        return;
    }

    // Doesn't allow player to make a guess during the setTimeout() after losing or scoring
    if (!makeGuess) {
        return;
    }
    //////////////////////////////////////
    // var debug = '';
    // for (var i = 0; i < pCards.length; i++) {
    //     debug += pCards[i].value + " ";
    // }
    // console.log(debug);
    //////////////////////////////////////


    // LOGIC FOR GUESSING

    // If Current card matches Previous Card
    if (pCards[pCurrent_Card].value == pCards[pCurrent_Card - 1].value) {
        pScore = 0;
        document.getElementById("score").innerHTML = pScore;
        resetGame = true;
        makeGuess = false;
    } else {
        if (pCards[pCurrent_Card].value > pCards[pCurrent_Card - 1].value && guess == "higher") {
            if (pCurrent_Card == 4) {
                pScore++;
                resetGame = true;
                makeGuess = false;
                document.getElementById("score").innerHTML = pScore;
            }
        }
        else if (pCards[pCurrent_Card].value < pCards[pCurrent_Card - 1].value && guess == "lower") {
            if (pCurrent_Card == 4) {
                pScore++;
                resetGame = true;
                makeGuess = false;
                document.getElementById("score").innerHTML = pScore;
            }
        }
        else {
            pWrong++;
            document.getElementById("wrong").innerHTML = pWrong;
            resetGame = true;
            makeGuess = false;
        }
        if (pCards[pCurrent_Card].value == pCards[pCurrent_Card - 1].value) {
            pScore = 0;
            document.getElementById("score").innerHTML = pScore;
            resetGame = true;
            makeGuess = false;
        }
    }
    pCardImg[pCurrent_Card].src = pCards[pCurrent_Card].imgSrc;
    pCurrent_Card++;

    if (pScore >= 3) {
        document.getElementById("gameDuration").innerHTML = "Game Duration: " + timerNumbers;
        clearTimeout(t);
        document.getElementById("reset").setAttribute("class", "unhide");
        document.getElementById("winText").innerHTML = "You Win!";
        isPlaying = false;
    }

    if (isPlaying == true) {
        if (resetGame == true) {
            setTimeout(softResetGame, 1500);
        }
    }


}