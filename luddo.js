const startBtn = document.getElementById('start');
const statusText = document.getElementById('player');
const diceText = document.getElementById('dice');
const diceImg = document.getElementById('diceimg');

const allPiecer = document.querySelectorAll('.piecer');
const allPieceg = document.querySelectorAll('.pieceg');
const allPiecey = document.querySelectorAll('.piecey');
const allPieceb = document.querySelectorAll('.pieceb');

let currentturn = 0;
let currentDiceRoll = null;
let sixCount = 0;
let gameOver = false;
let isRolling = false;

let winner1 = 0;
let winner2 = 0;
let winner3 = 0;
let winner4 = 0;

const diceImage1 = "one.jpg";
const diceImage2 = "two.jpg";
const diceImage3 = "three.jpg";
const diceImage4 = "four.jpg";
const diceImage5 = "five.jpg";
const diceImage6 = "six.jpg";

const redPath = ["r1","r2","r3","r4","r5","r6","r7","r8",
    "r9","r10","r11","r12","r13","r14","r15","r16","r17",
    "r18","r19","r20","r21","r22","r23","r24","r25","r26",
    "r27","r28","r29","r30","r31","r32","r33","r34","r35",
    "r36","r37","r38","r39","r40","r41","r42","r43","r44",
    "r45","r46","r47","r48","r49","r50","r51","r52","r53",
    "r54","r55","r56","home"];

const greenPath = ["r14","r15","r16","r17","r18","r19","r20",
    "r21","r22","r23","r24","r25","r26","r27","r28","r29",
    "r30","r31","r32","r33","r34","r35","r36","r37","r38",
    "r39","r40","r41","r42","r43","r44","r45","r46","r47",
    "r48","r49","r50","all","r1","r2","r3","r4","r5","r6",
    "r7","r8","r9","r10","r11","r12","r13","g1","g2","g3",
    "g4","g5","home"];

const yellowPath = ["r27","r28","r29","r30","r31","r32","r33",
    "r34","r35","r36","r37","r38","r39","r40","r41","r42","r43",
    "r44","r45","r46","r47","r48","r49","r50","all","r1","r2","r3",
    "r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15",
    "r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","y1"
    ,"y2","y3","y4","y5","home"];

const bluePath = ["r40","r41","r42","r43","r44","r45","r46"
    ,"r47","r48","r49","r50","all","r1","r2","r3","r4","r5"
    ,"r6","r7","r8","r9","r10","r11","r12","r13","r14","r15"
    ,"r16","r17","r18","r19","r20","r21","r22","r23","r24",
    "r25","r26","r27","r28","r29","r30","r31","r32","r33",
    "r34","r35","r36","r37","r38","b1","b2","b3","b4","b5","home"];

const safeBoxes = ["r1","r14","r27","r40","r9","r22","r35","r48","all"];


function getDiceImageByNumber(num)
 {
    if (num == 1) 
        return diceImage1;
    if (num == 2)
         return diceImage2;
    if (num == 3)
         return diceImage3;
    if (num == 4)
         return diceImage4;
    if (num == 5)
         return diceImage5;
    if (num == 6)
         return diceImage6;
}

function getRandomDiceImage()
 {
    var r = Math.floor(Math.random() * 6) + 1;
    return getDiceImageByNumber(r);
}

function enableDice()
 {
    diceImg.style.opacity = "1";
    diceImg.style.cursor = "pointer";
}

function disableDice()
 {
    diceImg.style.opacity = "0.5";
    diceImg.style.cursor = "not-allowed";
}

function clearAllBlinks() 
{
    allPiecer.forEach(function(p) 
    { p.classList.remove('blink'); });
    allPieceg.forEach(function(p) 
    { p.classList.remove('blink'); });
    allPiecey.forEach(function(p) 
    { p.classList.remove('blink'); });
    allPieceb.forEach(function(p) 
    { p.classList.remove('blink'); });
}

function isPlayerFinished(playerNum)
 {
    if (playerNum == 1) return winner1 == 1;
    if (playerNum == 2) return winner2 == 1;
    if (playerNum == 3) return winner3 == 1;
    if (playerNum == 4) return winner4 == 1;
}

function markPlayerFinished(playerNum)
 {
    if (playerNum == 1)
         winner1 = 1;
    if (playerNum == 2) 
        winner2 = 1;
    if (playerNum == 3) 
        winner3 = 1;
    if (playerNum == 4)
         winner4 = 1;
}

function howManyFinished()
 {
    return winner1 + winner2 + winner3 + winner4;
}

function getNextTurn()
 {
    var next = currentturn % 4 + 1;
    var tries = 0;
    while (isPlayerFinished(next) && tries < 4)
         {
        next = next % 4 + 1;
        tries++;
    }
    return next;
}

function getPlayerName(playerNum) 
{
    if (playerNum == 1) 
        return "Red Player";
    if (playerNum == 2) 
        return "Green Player";
    if (playerNum == 3) 
        return "Yellow Player";
    if (playerNum == 4) 
        return "Blue Player";
}

function sendRedPieceToHome(piece) 
{
    var redHomes = document.querySelectorAll('[name="rdiv"]');
    for (var i = 0; i < redHomes.length; i++) {
        if (redHomes[i].querySelectorAll('img').length == 0) {
            redHomes[i].appendChild(piece);
            return;
        }
    }
    redHomes[0].appendChild(piece);
}

function sendGreenPieceToHome(piece)
 {
    var greenHomes = document.querySelectorAll('[name="gdiv"]');
    for (var i = 0; i < greenHomes.length; i++) {
        if (greenHomes[i].querySelectorAll('img').length == 0) {
            greenHomes[i].appendChild(piece);
            return;
        }
    }
    greenHomes[0].appendChild(piece);
}

function sendYellowPieceToHome(piece) 
{
    var yellowHomes = document.querySelectorAll('[name="ydiv"]');
    for (var i = 0; i < yellowHomes.length; i++) {
        if (yellowHomes[i].querySelectorAll('img').length == 0) {
            yellowHomes[i].appendChild(piece);
            return;
        }
    }
    yellowHomes[0].appendChild(piece);
}

function sendBluePieceToHome(piece) 
{
    var blueHomes = document.querySelectorAll('[name="bdiv"]');
    for (var i = 0; i < blueHomes.length; i++) {
        if (blueHomes[i].querySelectorAll('img').length == 0) {
            blueHomes[i].appendChild(piece);
            return;
        }
    }
    blueHomes[0].appendChild(piece);
}

function sendPieceBackToStart(piece)
 {
    var color = piece.getAttribute('color');
    if (color == "red")     sendRedPieceToHome(piece);
    if (color == "green")   sendGreenPieceToHome(piece);
    if (color == "yellow")  sendYellowPieceToHome(piece);
    if (color == "skyblue") sendBluePieceToHome(piece);
}

function checkCollision(targetBox, currentPiece) 
{
    var targetId = targetBox.getAttribute('id');

    if (safeBoxes.includes(targetId)) return false;

    var allImgs = targetBox.querySelectorAll('img');
    var otherPieces = [];
    for (var i = 0; i < allImgs.length; i++) 
    {
        if (allImgs[i] != currentPiece) {
            otherPieces.push(allImgs[i]);
        }
    }

    if (otherPieces.length == 0) return false;

    var currentColor = currentPiece.getAttribute('color');

    var sameColorCount = 0;
    for (var i = 0; i < otherPieces.length; i++) {
        if (otherPieces[i].getAttribute('color') == currentColor) {
            sameColorCount++;
        }
    }
    if (sameColorCount > 0) return false;

    var redCount = 0;
    var greenCount = 0;
    var yellowCount = 0;
    var blueCount = 0;

    for (var i = 0; i < otherPieces.length; i++) {
        var c = otherPieces[i].getAttribute('color');
        if (c == "red")     redCount++;
        if (c == "green")   greenCount++;
        if (c == "yellow")  yellowCount++;
        if (c == "skyblue") blueCount++;
    }

    if (redCount >= 2)    return false;
    if (greenCount >= 2)  return false;
    if (yellowCount >= 2) return false;
    if (blueCount >= 2)   return false;

    for (var i = 0; i < otherPieces.length; i++) {
        sendPieceBackToStart(otherPieces[i]);
    }

    statusText.innerText = getPlayerName(currentturn) + " killed a piece! Roll again";
    return true;
}

function checkIfRedWon() 
{
    var allInFinal = true;
    allPiecer.forEach(function(p) {
        if (p.parentElement.getAttribute('id') != 'home') {
            allInFinal = false;
        }
    });
    return allInFinal;
}

function checkIfGreenWon() {
    var allInFinal = true;
    allPieceg.forEach(function(p) {
        if (p.parentElement.getAttribute('id') != 'home') {
            allInFinal = false;
        }
    });
    return allInFinal;
}

function checkIfYellowWon() {
    var allInFinal = true;
    allPiecey.forEach(function(p) {
        if (p.parentElement.getAttribute('id') != 'home') {
            allInFinal = false;
        }
    });
    return allInFinal;
}

function checkIfBlueWon() {
    var allInFinal = true;
    allPieceb.forEach(function(p) {
        if (p.parentElement.getAttribute('id') != 'home') {
            allInFinal = false;
        }
    });
    return allInFinal;
}

function checkWin() {
    var won = false;

    if (currentturn == 1 && checkIfRedWon()) {
        markPlayerFinished(1);
        won = true;
    }
    if (currentturn == 2 && checkIfGreenWon()) {
        markPlayerFinished(2);
        won = true;
    }
    if (currentturn == 3 && checkIfYellowWon()) {
        markPlayerFinished(3);
        won = true;
    }
    if (currentturn == 4 && checkIfBlueWon()) {
        markPlayerFinished(4);
        won = true;
    }

    if (won) {
        var rank = howManyFinished();
        var rankText = "";
        if (rank == 1) rankText = "1st";
        if (rank == 2) rankText = "2nd";
        if (rank == 3) rankText = "3rd";

        statusText.innerText = getPlayerName(currentturn) + " finished " + rankText + "!";

        if (howManyFinished() == 3) {
            var lastPlayer = 0;
            if (winner1 == 0) lastPlayer = 1;
            if (winner2 == 0) lastPlayer = 2;
            if (winner3 == 0) lastPlayer = 3;
            if (winner4 == 0) lastPlayer = 4;
            markPlayerFinished(lastPlayer);
            gameOver = true;
            disableDice();
            setTimeout(function() {
                statusText.innerText = "Game Over!";
            }, 1500);
            return true;
        }

        setTimeout(function() {
            currentturn = getNextTurn();
            statusText.innerText = getPlayerName(currentturn) + " Turn - Click dice to roll";
        }, 1500);
        return true;
    }

    return false;
}

function passTurn() {
    currentDiceRoll = null;
    sixCount = 0;
    clearAllBlinks();
    currentturn = getNextTurn();
    statusText.innerText = getPlayerName(currentturn) + " Turn - Click dice to roll";
    enableDice();
}

function checkThreeSix() {
    if (currentDiceRoll == 6) {
        sixCount++;
    } else {
        sixCount = 0;
    }

    if (sixCount == 3) {
        statusText.innerText = "3 Sixes in a row! Turn Passed";
        clearAllBlinks();
        setTimeout(function() { passTurn(); }, 1000);
        return true;
    }
    return false;
}

function showBlinkingPiecesForRed() {
    var canMove = false;
    allPiecer.forEach(function(p) {
        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');

        if (parentId == 'home') return;

        if (parentName == "rdiv") {
            if (currentDiceRoll == 6) {
                p.classList.add('blink');
                canMove = true;
            }
        } else if (redPath.includes(parentId)) {
            var j = redPath.indexOf(parentId);
            if (j + currentDiceRoll < redPath.length) {
                p.classList.add('blink');
                canMove = true;
            }
        }
    });
    return canMove;
}

function showBlinkingPiecesForGreen() {
    var canMove = false;
    allPieceg.forEach(function(p) {
        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');

        if (parentId == 'home') return;

        if (parentName == "gdiv") {
            if (currentDiceRoll == 6) {
                p.classList.add('blink');
                canMove = true;
            }
        } else if (greenPath.includes(parentId)) {
            var j = greenPath.indexOf(parentId);
            if (j + currentDiceRoll < greenPath.length) {
                p.classList.add('blink');
                canMove = true;
            }
        }
    });
    return canMove;
}

function showBlinkingPiecesForYellow() {
    var canMove = false;
    allPiecey.forEach(function(p) {
        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');

        if (parentId == 'home') return;

        if (parentName == "ydiv") {
            if (currentDiceRoll == 6) {
                p.classList.add('blink');
                canMove = true;
            }
        } else if (yellowPath.includes(parentId)) {
            var j = yellowPath.indexOf(parentId);
            if (j + currentDiceRoll < yellowPath.length) {
                p.classList.add('blink');
                canMove = true;
            }
        }
    });
    return canMove;
}

function showBlinkingPiecesForBlue() {
    var canMove = false;
    allPieceb.forEach(function(p) {
        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');

        if (parentId == 'home') return;

        if (parentName == "bdiv") {
            if (currentDiceRoll == 6) {
                p.classList.add('blink');
                canMove = true;
            }
        } else if (bluePath.includes(parentId)) {
            var j = bluePath.indexOf(parentId);
            if (j + currentDiceRoll < bluePath.length) {
                p.classList.add('blink');
                canMove = true;
            }
        }
    });
    return canMove;
}

function rollDice() {
    if (currentturn == 0) {
        statusText.innerText = "Click START first";
        return;
    }
    if (gameOver) {
        statusText.innerText = "Game Over!";
        return;
    }
    if (currentDiceRoll != null) return;
    if (isRolling) return;

    isRolling = true;
    disableDice();
    statusText.innerText = "Rolling...";

    var finalValue = Math.floor(Math.random() * 6) + 1;
    var totalFrames = 12;
    var frame = 0;

    var loop = setInterval(function() {
        diceImg.src = getRandomDiceImage();
        diceImg.classList.add('dice-spin');
        frame++;

        if (frame >= totalFrames) {
            clearInterval(loop);
            diceImg.src = getDiceImageByNumber(finalValue);
            diceImg.classList.remove('dice-spin');
            currentDiceRoll = finalValue;
            diceText.innerText = "Dice Roll : " + finalValue;
            isRolling = false;
            disableDice();
            afterRoll();
        }
    }, 60);
}

function afterRoll() {
    if (checkThreeSix()) return;

    clearAllBlinks();

    var canMove = false;

    if (currentturn == 1) canMove = showBlinkingPiecesForRed();
    if (currentturn == 2) canMove = showBlinkingPiecesForGreen();
    if (currentturn == 3) canMove = showBlinkingPiecesForYellow();
    if (currentturn == 4) canMove = showBlinkingPiecesForBlue();

    if (!canMove) {
        statusText.innerText = getPlayerName(currentturn) + " can't move. Turn passed.";
        setTimeout(function() { passTurn(); }, 1200);
    } else {
        statusText.innerText = getPlayerName(currentturn) + " rolled " + currentDiceRoll + " - pick a piece";
    }
}

allPiecer.forEach(function(p) {
    p.addEventListener('click', function() {

        if (currentturn != 1) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');
        var targetBox;

        if (currentDiceRoll == 6 && parentName == "rdiv") {
            targetBox = document.getElementById(redPath[0]);
        } else {
            var j = redPath.indexOf(parentId);
            targetBox = document.getElementById(redPath[j + currentDiceRoll]);
        }

        if (!targetBox) return;

        targetBox.appendChild(p);
        clearAllBlinks();

        var killed = checkCollision(targetBox, p);
        if (checkWin()) return;

        if (killed) {
            currentDiceRoll = null;
            sixCount = 0;
            enableDice();
            return;
        }

        if (currentDiceRoll == 6) {
            currentDiceRoll = null;
            statusText.innerText = "Red Player rolled 6! Roll again";
            enableDice();
        } else {
            passTurn();
        }
    });
});

allPieceg.forEach(function(p) {
    p.addEventListener('click', function() {

        if (currentturn != 2) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');
        var targetBox;

        if (currentDiceRoll == 6 && parentName == "gdiv") {
            targetBox = document.getElementById(greenPath[0]);
        } else {
            var j = greenPath.indexOf(parentId);
            targetBox = document.getElementById(greenPath[j + currentDiceRoll]);
        }

        if (!targetBox) return;

        targetBox.appendChild(p);
        clearAllBlinks();

        var killed = checkCollision(targetBox, p);
        if (checkWin()) return;

        if (killed) {
            currentDiceRoll = null;
            sixCount = 0;
            enableDice();
            return;
        }

        if (currentDiceRoll == 6) {
            currentDiceRoll = null;
            statusText.innerText = "Green Player rolled 6! Roll again";
            enableDice();
        } else {
            passTurn();
        }
    });
});

allPiecey.forEach(function(p) {
    p.addEventListener('click', function() {

        if (currentturn != 3) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');
        var targetBox;

        if (currentDiceRoll == 6 && parentName == "ydiv") {
            targetBox = document.getElementById(yellowPath[0]);
        } else {
            var j = yellowPath.indexOf(parentId);
            targetBox = document.getElementById(yellowPath[j + currentDiceRoll]);
        }

        if (!targetBox) return;

        targetBox.appendChild(p);
        clearAllBlinks();

        var killed = checkCollision(targetBox, p);
        if (checkWin()) return;

        if (killed) {
            currentDiceRoll = null;
            sixCount = 0;
            enableDice();
            return;
        }

        if (currentDiceRoll == 6) {
            currentDiceRoll = null;
            statusText.innerText = "Yellow Player rolled 6! Roll again";
            enableDice();
        } else {
            passTurn();
        }
    });
});

allPieceb.forEach(function(p) {
    p.addEventListener('click', function() {

        if (currentturn != 4) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        var parentName = p.parentElement.getAttribute('name');
        var parentId   = p.parentElement.getAttribute('id');
        var targetBox;

        if (currentDiceRoll == 6 && parentName == "bdiv") {
            targetBox = document.getElementById(bluePath[0]);
        } else {
            var j = bluePath.indexOf(parentId);
            targetBox = document.getElementById(bluePath[j + currentDiceRoll]);
        }

        if (!targetBox) return;

        targetBox.appendChild(p);
        clearAllBlinks();

        var killed = checkCollision(targetBox, p);
        if (checkWin()) return;

        if (killed) {
            currentDiceRoll = null;
            sixCount = 0;
            enableDice();
            return;
        }

        if (currentDiceRoll == 6) {
            currentDiceRoll = null;
            statusText.innerText = "Blue Player rolled 6! Roll again";
            enableDice();
        } else {
            passTurn();
        }
    });
});

function startGame() {
    gameOver = false;
    winner1 = 0;
    winner2 = 0;
    winner3 = 0;
    winner4 = 0;
    currentturn = 1;
    currentDiceRoll = null;
    sixCount = 0;
    isRolling = false;

    var redHomes = document.querySelectorAll('[name="rdiv"]');
    var redPieces = [...allPiecer];
    for (var i = 0; i < redHomes.length; i++) {
        if (redPieces[i]) redHomes[i].appendChild(redPieces[i]);
    }

    var greenHomes = document.querySelectorAll('[name="gdiv"]');
    var greenPieces = [...allPieceg];
    for (var i = 0; i < greenHomes.length; i++) {
        if (greenPieces[i]) greenHomes[i].appendChild(greenPieces[i]);
    }

    var yellowHomes = document.querySelectorAll('[name="ydiv"]');
    var yellowPieces = [...allPiecey];
    for (var i = 0; i < yellowHomes.length; i++) {
        if (yellowPieces[i]) yellowHomes[i].appendChild(yellowPieces[i]);
    }

    var blueHomes = document.querySelectorAll('[name="bdiv"]');
    var bluePieces = [...allPieceb];
    for (var i = 0; i < blueHomes.length; i++) {
        if (bluePieces[i]) blueHomes[i].appendChild(bluePieces[i]);
    }

    clearAllBlinks();
    diceImg.src = diceImage1;
    enableDice();
    statusText.innerText = "Red Player Turn - Click dice to roll";
    diceText.innerText = "Dice Roll : -";
}

diceImg.addEventListener('click', rollDice);
startBtn.addEventListener('click', startGame);
