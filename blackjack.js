//GLOBALVARIABLES////////////////////////////////////
// var deck = [];
var ptop_card = 0;  // card counter for deck[top_card]
var dtop_card = 0;
var hitCounter = 0;//  # of times user has hit
var isPlaying = false; // controller var
var dealerTotal = 0;
var playerTotal = 0;
var playerWins = 0;
var playerLosses = 0;
document.getElementById("wins").innerHTML = playerWins;
document.getElementById("losses").innerHTML = playerLosses;
document.getElementById("dTotal").innerHTML = dealerTotal;
document.getElementById("pTotal").innerHTML = playerTotal;
document.getElementById('dTotal').setAttribute("class", "hide");
document.getElementById('pTotal').setAttribute("class", "hide");

var pCards = new Array();
var dCards = new Array();
var pcardImg = document.getElementsByName('pcard');
var dcardImg = document.getElementsByName('dcard');

//optional
var dcard1Img = document.getElementById('dcard1'); // dcardImg[0]
var dcard2Img = document.getElementById('dcard2'); // dcardImg[1]

var faceDown_img = '//www.cs.csubak.edu/~derrick/cs2680/examples/images/b1fv.png';

//EVENT_LISTENERS_BUTTONS////////////////////////////
document.getElementById('dealBtn').addEventListener('click', function () {
    //alert('deal');

    //ANIMATION FUN///////////
    if (isPlaying == false) {
        allFaceDown();
        // in 1sec delay, reveal new cards
        setTimeout(deal, 1000); // setTimeout(action, ms)
        //////////////////////////
    } else {
        alert("You must finish your game first! *hint - Click Surrender to Finish Game");
    }
    //deal();
});
document.getElementById('hitBtn').addEventListener('click', function () {
    //alert('hit');
    hit();
});
document.getElementById('standBtn').addEventListener('click', function () {
    //alert('stand');
    stand();
});
// document.getElementById('surrenderBtn').addEventListener('click', function () {
//     //alert('surrender');
//     surrender();
// });
/////////////////////////////////////////////////////

// //GLOBALVARIABLES////////////////////////////////////
// // var deck = [];
// var top_card = 0;  // card counter for deck[top_card]
// var hitCounter = 0;//  # of times user has hit
// var isPlaying = false; // controller var

// var pcardImg = document.getElementsByName('pcard');
// var dcardImg = document.getElementsByName('dcard');

// //optional
// var dcard1Img = document.getElementById('dcard1'); // dcardImg[0]
// var dcard2Img = document.getElementById('dcard2'); // dcardImg[1]

// var faceDown_img = '//www.cs.csubak.edu/~derrick/cs2680/examples/images/b1fv.png';

/////////////////////////////////////////////////////

function allFaceDown() {
    for (var i = 0; i < pcardImg.length; i++) {
        pcardImg[i].src = faceDown_img;
        pcardImg[i].style.opacity = 1;
    }

    for (var i = 0; i < dcardImg.length; i++) {
        dcardImg[i].src = faceDown_img;
        dcardImg[i].style.opacity = 1;
    }

    for (var i = 2; i < pcardImg.length; i++) {
        pcardImg[i].src = '';
        pcardImg[i].style.opacity = 1;
    }

}

function displayCardValuesToConsole() {
    console.log("PlayerTotal: " + playerTotal + "DealerTotal: " + dealerTotal);
    console.log("PlayerWins: " + playerWins + "PlayerLosses: " + playerLosses);
}

function deal() {
    document.getElementById('dTotal').setAttribute("class", "unhide");
    document.getElementById('pTotal').setAttribute("class", "unhide");
    document.getElementById('winText').setAttribute("class", "hide");
    playerTotal = 0;
    dealerTotal = 0;
    // if currently playing don't reDeal
    //   must finish 'hand' 'round' 'game'
    if (isPlaying == true)
        return;
    isPlaying = true;
    // else
    // isPlaying = true; // change to true

    hitCounter = 0;
    dtop_card = 0;
    ptop_card = 0;

    shuffleDeck(); // cardObject.js

    for (var i = 0; i < 5; i++) {
        pCards[i] = deck[i];
    }

    shuffleDeck();

    for (var i = 0; i < 2; i++) {
        dCards[i] = deck[i];
    }

    /* // reset all imgs to empty '' and opacity=1  [0..0.5..1]
       for( ... ){
         dcardImg[i].src = '';
       }
       for(...) {
         pcardImg[i].src = '';
         pcardImg[i].opacity = 1;
       }
    */

    for (var i = 0; i < dcardImg.length; i++) {
        dcardImg[i].src = dCards[i].imgSrc;
        dcardImg[i].src = '';
    }

    for (var i = 0; i < pcardImg.length; i++) {
        pcardImg[i].src = pCards[i].imgSrc;
        pcardImg[i].src = '';
        pcardImg[i].style.opacity = 1;
    }


    // DEAL NEW CARDS
    // dealer cards
    dcardImg[0].src = dCards[dtop_card].imgSrc;
    dealerTotal += dCards[dtop_card].value;
    dtop_card++;
    dcardImg[1].src = faceDown_img;


    // player cards
    pcardImg[0].src = pCards[ptop_card].imgSrc;
    playerTotal += pCards[0].value;
    ptop_card++;
    pcardImg[1].src = pCards[ptop_card].imgSrc;
    playerTotal += pCards[1].value;
    ptop_card++;

    document.getElementById("dTotal").innerHTML = dealerTotal;
    document.getElementById("pTotal").innerHTML = playerTotal;

    // displayCardValuesToConsole();
    displayCardValuesToConsole();
}

function hit() {
    // if we're not currenly playing, don't hit a card
    if (isPlaying == false)
        return;
    //else

    if (hitCounter < 3) {
        // reveal another card to player
        pcardImg[2 + hitCounter].src = pCards[ptop_card].imgSrc;
        ptop_card++;
        playerTotal += pCards[2 + hitCounter].value;
        document.getElementById("pTotal").innerHTML = playerTotal;

        if (playerTotal > 21) {
            playerLosses += 1;
            isPlaying = false;

            for (var i = 0; i < pcardImg.length; i++) {
                pcardImg[i].style.opacity = 0.5;
            }

            document.getElementById("winText").innerHTML = "You Lose!";
            document.getElementById('winText').setAttribute("class", "unhide");
            document.getElementById("losses").innerHTML = playerLosses;

        }

        displayCardValuesToConsole();
        // increment counter
        hitCounter++;
    } else {
        alert("Can't hit more than 3 times");
    }
}

function stand() {
    // if we're currently not playing, can't stand
    if (isPlaying == false)
        return;

    dcardImg[1].src = dCards[1].imgSrc;
    dtop_card++;
    dealerTotal += dCards[1].value;
    document.getElementById("dTotal").innerHTML = dealerTotal;

    if(dealerTotal > 21){
        playerWins += 1;
        document.getElementById("winText").innerHTML = "You Win!";
        document.getElementById('winText').setAttribute("class", "unhide");
        document.getElementById("wins").innerHTML = playerWins;
    }
    else if (playerTotal > dealerTotal) {
        for (var i = 0; i < dcardImg.length; i++) {
            dcardImg[i].style.opacity = 0.5;
        }
        playerWins += 1;
        document.getElementById("winText").innerHTML = "You Win!";
        document.getElementById('winText').setAttribute("class", "unhide");
        document.getElementById("wins").innerHTML = playerWins;

    } else if (playerTotal == dealerTotal) {
        document.getElementById("winText").innerHTML = "You Tied!";
        document.getElementById('winText').setAttribute("class", "unhide");

        for (var i = 0; i < dcardImg.length; i++) {
            dcardImg[i].style.opacity = 0.5;
        }
        for (var i = 0; i < pcardImg.length; i++) {
            pcardImg[i].style.opacity = 0.5;
        }

    } else {
        for (var i = 0; i < pcardImg.length; i++) {
            pcardImg[i].style.opacity = 0.5;
        }
        playerLosses += 1;
        document.getElementById("winText").innerHTML = "You Lose!";
        document.getElementById('winText').setAttribute("class", "unhide");
        document.getElementById("losses").innerHTML = playerLosses;

    }

    if (isPlaying == false)
        return;

    isPlaying = false;

    displayCardValuesToConsole();
}





var deck = []; // empty array to hold array of card objects
initDeck();    // Initialize the array of card objects
function initDeck() {
    // loads images and creates array of card objects
    //
    var httpImgSrc = '//www.cs.csubak.edu/~derrick/cs2680/examples/images/';
    for (var i = 0; i < 52; i++) {
        var imgSrc = httpImgSrc + (i + 1) + '.png';
        var val = getCardValue(i); // pass i 
        deck[i] = new CardObject(imgSrc, val); // Class Definitions
    }
}

// USAGE: var myNewObject = new CardObject('img', 3);
function CardObject(imgSrc, value) {
    this.imgSrc = imgSrc;
    this.value = value;
}

function getCardValue(i) {
    var ACE = 11;
    var FACE = 10;
    switch (i) {
        case 0: case 1: case 2: case 3: return (11); // ACES
        case 4: case 5: case 6: case 7: return (10); // KINGS
        case 8: case 9: case 10: case 11: return (10); // QUEENS
        case 12: case 13: case 14: case 15: return (10); // JACKS
        case 16: case 17: case 18: case 19: return (10); // TENS
        case 20: case 21: case 22: case 23: return (9); // 
        case 24: case 25: case 26: case 27: return (8); // 
        case 28: case 29: case 30: case 31: return (7); // 
        case 32: case 33: case 34: case 35: return (6); // 
        case 36: case 37: case 38: case 39: return (5); // 
        case 40: case 41: case 42: case 43: return (4); // 
        case 44: case 45: case 46: case 47: return (3); // 
        case 48: case 49: case 50: case 51: return (2); // 
        // to be finished ....  DONE.
    }
}

function shuffleDeck() {

    for (var i = 0; i < 300; i++) {
        var x = Math.floor(Math.random() * 52); // 0..51
        var y = Math.floor(Math.random() * 52); // 0..51
        var tempCard = deck[x];
        deck[x] = deck[y];
        deck[y] = tempCard;
    }
}

/*function swap(card1, card2) {
    var tempCard = card1;
    card1 = card2;
    card2 = tempCard;
}
*/