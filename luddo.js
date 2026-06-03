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

const diceimage1 = "one.jpg";
const diceimage2 = "two.jpg";
const diceimage3 = "three.jpg";
const diceimage4 = "four.jpg";
const diceimage5 = "five.jpg";
const diceimage6 = "six.jpg";

const redPath = [
    "r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13",
    "r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25",
    "r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37",
    "r38","r39","r40","r41","r42","r43","r44","r45","r46","r47","r48","r49",
    "r50","r51","r52","r53","r54","r55","r56","home"
];

const greenPath = [
    "r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25",
    "r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37",
    "r38","r39","r40","r41","r42","r43","r44","r45","r46","r47","r48","r49",
    "r50","all","r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11",
    "r12","r13","g1","g2","g3","g4","g5","home"
];

const yellowPath = [
    "r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37","r38",
    "r39","r40","r41","r42","r43","r44","r45","r46","r47","r48","r49","r50",
    "all","r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12",
    "r13","r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24",
    "r25","y1","y2","y3","y4","y5","home"
];

const bluePath = [
    "r40","r41","r42","r43","r44","r45","r46","r47","r48","r49","r50","all",
    "r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13",
    "r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25",
    "r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37",
    "r38","b1","b2","b3","b4","b5","home"
];

const safeBoxes = ["r1","r14","r27","r40","r9","r22","r35","r48","all"];

function getDiceImageByNumber(num)
{
    if (num == 1)
         { return diceimage1; }
    if (num == 2)
         { return diceimage2; }
    if (num == 3) 
        { return diceimage3; }
    if (num == 4) 
        { return diceimage4; }
    if (num == 5)
         { return diceimage5; }
    if (num == 6)
         { return diceimage6; }
}

function clearAllBlinks()
{
    document.querySelectorAll('.piecer, .pieceg, .piecey, .pieceb')
        .forEach(p => p.classList.remove('blink'));
}

function isPlayerFinished(num)
{
    if (num == 1) 
        { return winner1 == 1; }
    if (num == 2) 
        { return winner2 == 1; }
    if (num == 3) 
        { return winner3 == 1; }
    if (num == 4) 
        { return winner4 == 1; }
}

function markPlayerFinished(num)
{
    if (num == 1)
         { winner1 = 1; }
    if (num == 2)
         { winner2 = 1; }
    if (num == 3)
         { winner3 = 1; }
    if (num == 4)
         { winner4 = 1; }
}

function howManyFinished()
{
    return winner1 + winner2 + winner3 + winner4;
}

function getNextTurn()
{
    let next = currentturn % 4 + 1;
    let tries = 0;

    while (isPlayerFinished(next) && tries < 4)
    {
        next = next % 4 + 1;
        tries++;
    }

    return next;
}

function getPlayerName(num)
{
    if (num == 1) 
        { return "Red Player"; }
    if (num == 2)
         { return "Green Player"; }
    if (num == 3) 
        { return "Yellow Player"; }
    if (num == 4)
         { return "Blue Player"; }
}

function sendPieceBackToStart(piece)
{
    const color = piece.getAttribute('color');
    let homeName = "";

    if (color == "red")    
         { homeName = "rdiv"; }
    if (color == "green")  
         { homeName = "gdiv"; }
    if (color == "yellow")
          { homeName = "ydiv"; }
    if (color == "skyblue")
         { homeName = "bdiv"; }

    const homes = document.querySelectorAll(`[name="${homeName}"]`);

    for (let i = 0; i < homes.length; i++)
    {
        if (homes[i].querySelectorAll('img').length === 0)
        {
            homes[i].appendChild(piece);
            return;
        }
    }

    homes[0].appendChild(piece);
}

function checkCollision(targetBox, currentPiece)
{
    if (safeBoxes.includes(targetBox.getAttribute('id'))) { return false; }

    const allImgs = targetBox.querySelectorAll('img');
    const others = [];

    for (let i = 0; i < allImgs.length; i++)
    {
        if (allImgs[i] != currentPiece)
        {
            others.push(allImgs[i]);
        }
    }

    if (others.length === 0)
         { return false; }

    const myColor = currentPiece.getAttribute('color');

    for (let i = 0; i < others.length; i++)
    {
        if (others[i].getAttribute('color') === myColor)
             { return false; }
    }

    const counts = {};

    for (let i = 0; i < others.length; i++)
    {
        const c = others[i].getAttribute('color');
        counts[c] = (counts[c] || 0) + 1;
    }

    for (let c in counts)
    {
        if (counts[c] >= 2) { return false; }
    }

    for (let i = 0; i < others.length; i++)
    {
        sendPieceBackToStart(others[i]);
    }

    statusText.innerText = getPlayerName(currentturn) + " killed a piece! Roll again";
    return true;
}

function checkIfPlayerWon(playerNum, pieces)
{
    for (let i = 0; i < pieces.length; i++)
    {
        if (pieces[i].parentElement.getAttribute('id') !== 'home') { return false; }
    }

    return true;
}

function checkWin()
{
    let pieces = null;

    if (currentturn == 1)
         { pieces = allPiecer; }
    if (currentturn == 2)
         { pieces = allPieceg; }
    if (currentturn == 3) 
        { pieces = allPiecey; }
    if (currentturn == 4) 
        { pieces = allPieceb; }

    if (!checkIfPlayerWon(currentturn, pieces)) 
        { return false; }

    markPlayerFinished(currentturn);

    const rank = howManyFinished();
    let rankText = "";

    if (rank == 1) 
        { rankText = "1st"; }
    if (rank == 2)
         { rankText = "2nd"; }
    if (rank == 3) 
        { rankText = "3rd"; }

    statusText.innerText = getPlayerName(currentturn) + " finished " + rankText + "!";

    if (howManyFinished() === 3)
    {
        if (winner1 == 0) 
            { markPlayerFinished(1); }
        if (winner2 == 0) 
            { markPlayerFinished(2); }
        if (winner3 == 0) 
            { markPlayerFinished(3); }
        if (winner4 == 0) 
            { markPlayerFinished(4); }

        gameOver = true;

        setTimeout(() =>
        {
            statusText.innerText = "Game Over!";
        }, 1500);

        return true;
    }

    setTimeout(() =>
    {
        currentturn = getNextTurn();
        statusText.innerText = getPlayerName(currentturn) + " Turn - Click dice to roll";
    }, 1500);

    return true;
}

function passTurn()
{
    currentDiceRoll = null;
    sixCount = 0;
    clearAllBlinks();
    currentturn = getNextTurn();
    statusText.innerText = getPlayerName(currentturn) + " Turn - Click dice to roll";
}

function checkThreeSix()
{
    if (currentDiceRoll === 6)
    {
        sixCount++;
    }
    else
    {
        sixCount = 0;
    }

    if (sixCount === 3)
    {
        statusText.innerText = "3 Sixes in a row! Turn Passed";
        clearAllBlinks();
        setTimeout(() => passTurn(), 1000);
        return true;
    }

    return false;
}

function handlePieceClick(pieces, path, homeName, name, num)
{
    for (let i = 0; i < pieces.length; i++)
    {
        pieces[i].onclick = function ()
        {
            if (currentturn !== num) 
                { return; }
            if (currentDiceRoll === null)
                 { return; }
            if (!this.classList.contains('blink')) 
                { return; }

            const parentName = this.parentElement.getAttribute('name');
            const parentId   = this.parentElement.getAttribute('id');
            let targetBox;

            if (currentDiceRoll === 6 && parentName === homeName)
            {
                targetBox = document.getElementById(path[0]);
            }
            else
            {
                const j = path.indexOf(parentId);
                targetBox = document.getElementById(path[j + currentDiceRoll]);
            }

            if (!targetBox) { return; }

            targetBox.appendChild(this);
            clearAllBlinks();

            const killed = checkCollision(targetBox, this);

            if (checkWin()) { return; }

            if (killed)
            {
                currentDiceRoll = null;
                sixCount = 0;
                return;
            }

            if (currentDiceRoll === 6)
            {
                currentDiceRoll = null;
                statusText.innerText = name + " rolled 6! Roll again";
            }
            else
            {
                passTurn();
            }
        };
    }
}

function playerTurn(pieces, path, homeName, name, num)
{
    let canMove = false;

    for (let i = 0; i < pieces.length; i++)
    {
        const p          = pieces[i];
        const parentName = p.parentElement.getAttribute('name');
        const parentId   = p.parentElement.getAttribute('id');

        if (parentId === 'home')
             { continue; }

        if (parentName === homeName)
        {
            if (currentDiceRoll === 6)
            {
                p.classList.add('blink');
                canMove = true;
            }
        }
        else if (path.includes(parentId))
        {
            const j = path.indexOf(parentId);

            if (j + currentDiceRoll < path.length)
            {
                p.classList.add('blink');
                canMove = true;
            }
        }
    }

    if (!canMove)
    {
        statusText.innerText = name + " can't move. Turn passed.";
        setTimeout(() => passTurn(), 1200);
        return;
    }

    statusText.innerText = name + " rolled " + currentDiceRoll + " - pick a piece";
    handlePieceClick(pieces, path, homeName, name, num);
}

function afterRoll()
{
    if (checkThreeSix()) 
        { return; }

    clearAllBlinks();

    if (currentturn === 1) 
        { playerTurn(allPiecer, redPath,    "rdiv", "Red Player",    1); }
    if (currentturn === 2) 
        { playerTurn(allPieceg, greenPath,  "gdiv", "Green Player",  2); }
    if (currentturn === 3)
         { playerTurn(allPiecey, yellowPath, "ydiv", "Yellow Player", 3); }
    if (currentturn === 4) 
        { playerTurn(allPieceb, bluePath,   "bdiv", "Blue Player",   4); }
}

async function rollDice()
{
    if (currentturn === 0)
    {
        statusText.innerText = "Click START first";
        return;
    }

    if (gameOver)
    {
        statusText.innerText = "Game Over!";
        return;
    }

    if (currentDiceRoll !== null || isRolling) 
        { return; 

        }

    isRolling = true;
    statusText.innerText = "Rolling...";

    const finalValue = Math.floor(Math.random() * 6) + 1;

    for (let i = 1; i <= 12; i++)
    {
        if (i == 1) 
             { diceImg.src = diceimage1; }
        if (i == 2)  
            { diceImg.src = diceimage2; }
        if (i == 3)  
            { diceImg.src = diceimage3; }
        if (i == 4) 
             { diceImg.src = diceimage4; }
        if (i == 5) 
             { diceImg.src = diceimage5; }
        if (i == 6) 
             { diceImg.src = diceimage6; }
        if (i == 7)
              { diceImg.src = diceimage2; }
        if (i == 8) 
             { diceImg.src = diceimage5; }
        if (i == 9) 
             { diceImg.src = diceimage3; }
        if (i == 10)
             { diceImg.src = diceimage1; }
        if (i == 11) 
            { diceImg.src = diceimage4; }
        if (i == 12)
             { diceImg.src = diceimage6; }

        await new Promise(resolve => setTimeout(resolve, 60));
    }

    diceImg.src        = getDiceImageByNumber(finalValue);
    currentDiceRoll    = finalValue;
    diceText.innerText = "Dice Roll : " + finalValue;
    isRolling          = false;

    afterRoll();
}

function startGame()
{
    gameOver        = false;
    winner1         = 0;
    winner2         = 0;
    winner3         = 0;
    winner4         = 0;
    currentturn     = 1;
    currentDiceRoll = null;
    sixCount        = 0;
    isRolling       = false;

    const redHomes    = document.querySelectorAll('[name="rdiv"]');
    const greenHomes  = document.querySelectorAll('[name="gdiv"]');
    const yellowHomes = document.querySelectorAll('[name="ydiv"]');
    const blueHomes   = document.querySelectorAll('[name="bdiv"]');

    const redPieces    = [...allPiecer];
    const greenPieces  = [...allPieceg];
    const yellowPieces = [...allPiecey];
    const bluePieces   = [...allPieceb];

    for (let i = 0; i < redHomes.length; i++)
    {
        if (redPieces[i]) 
            { redHomes[i].appendChild(redPieces[i]); }
    }

    for (let i = 0; i < greenHomes.length; i++)
    {
        if (greenPieces[i]) 
            { greenHomes[i].appendChild(greenPieces[i]); }
    }

    for (let i = 0; i < yellowHomes.length; i++)
    {
        if (yellowPieces[i]) 
            { yellowHomes[i].appendChild(yellowPieces[i]); }
    }

    for (let i = 0; i < blueHomes.length; i++)
    {
        if (bluePieces[i]) 
            { blueHomes[i].appendChild(bluePieces[i]); }
    }

    clearAllBlinks();
    diceImg.src        = diceimage1;
    statusText.innerText = "Red Player Turn - Click dice to roll";
    diceText.innerText = "Dice Roll : -";
}

diceImg.addEventListener('click', rollDice);
startBtn.addEventListener('click', startGame);
