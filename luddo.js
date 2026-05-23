
const startBtn = document.getElementById('start');
const rollBtn = document.getElementById('rolldice');
const statusText = document.getElementById('player');
const diceText = document.getElementById('dice');
const allPieces = document.querySelectorAll('.piece');


let currentTurn = 0; 
let hasRolled = false;
let currentDiceRoll = 0;


let piecePositions = {
    red:    [-1, -1, -1, -1],
    green:  [-1, -1, -1, -1],
    blue:   [-1, -1, -1, -1],
    yellow: [-1, -1, -1, -1]
};



const redPath = [
    "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", "r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31", "r32", "r33", "r34", "r35", "r36", "r37", "r38", "r39", "r40", "r41", "r42", "r43", "r44", "r45", "r46", "r47", "r48", "r49", "50", "r51",
    "r52", "r53", "r54", "r55", "r56" 
];

const greenPath = [
    "r14", "r15", "r16", "r17", "r18", "r19", "r20", "r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31", "r32", "r33", "r34", "r35", "r36", "r37", "r38", "r39", "r40", "r41", "r42", "r43", "r44", "r45", "r46", "r47", "r48", "r49", "50", "r51", "all", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13",
    "g1", "g2", "g3", "g4", "g5" 
];

const bluePath = [
    "r40", "r41", "r42", "r43", "r44", "r45", "r46", "r47", "r48", "r49", "50", "r51", "all", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", "r21", "r22", "r23", "r24", "r25", "r26", "r27", "r28", "r29", "r30", "r31", "r32", "r33", "r34", "r35", "r36", "r37",
    "b1", "b2", "b3", "b4", "b5" 
];

const yellowPath = [
    "r27", "r28", "r29", "r30", "r31", "r32", "r33", "r34", "r35", "r36", "r37", "r38", "r39", "r40", "r41", "r42", "r43", "r44", "r45", "r46", "r47", "r48", "r49", "50", "r51", "all", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", "r21", "r22", "r23", "r24",
    "y1", "y2", "y3", "y4", "y5" 
];

const playerData = {
    1: { color: "red", name: "Red Player", path: redPath },
    2: { color: "green", name: "Green Player", path: greenPath },
    3: { color: "blue", name: "Blue Player", path: bluePath },
    4: { color: "yellow", name: "Yellow Player", path: yellowPath }
};


function startGame() {
    currentTurn = 1;
    hasRolled = false;
    diceText.innerText = "Dice Roll: -";
    clearBlinks();
    updateStatusMessage();

    
    piecePositions.red = [-1, -1, -1, -1];
    piecePositions.green = [-1, -1, -1, -1];
    piecePositions.blue = [-1, -1, -1, -1];
    piecePositions.yellow = [-1, -1, -1, -1];

    
    let pIdx = 0;
    ["red", "green", "blue", "yellow"].forEach(color => {
        for (let i = 1; i <= 4; i++) {
            let targetBox = document.getElementById(`${color}${i}`) || document.querySelector(`.${color}house .box${i}`);
            if (targetBox && allPieces[pIdx]) {
                targetBox.appendChild(allPieces[pIdx]);
              
                allPieces[pIdx].dataset.color = color;
                allPieces[pIdx].dataset.index = i - 1;
            }
            pIdx++;
        }
    });
}


function rollDice() {
    if (currentTurn === 0) {
        statusText.innerText = "Please press the start button first!";
        return;
    }
    if (hasRolled) {
        statusText.innerText = "You already rolled! Click a flashing token.";
        return;
    }

    currentDiceRoll = Math.floor(Math.random() * 6) + 1;
    diceText.innerText = "Dice Roll: " + currentDiceRoll;
    hasRolled = true;

    let active = playerData[currentTurn];
    let canMoveAny = false;

  
    allPieces.forEach(p => {
        if (p.dataset.color === active.color) {
            let idx = parseInt(p.dataset.index);
            let pos = piecePositions[active.color][idx];

            if ((pos === -1 && currentDiceRoll === 6) || pos !== -1) {
                if (pos + currentDiceRoll < active.path.length) {
                    p.classList.add('blink');
                    canMoveAny = true;
                }
            }
        }
    });

    if (!canMoveAny) {
        statusText.innerText = `No moves for ${active.name}! Changing turn...`;
        setTimeout(nextTurn, 1500);
    } else {
        statusText.innerText = `Select a blinking ${active.name} piece to move!`;
    }
}


allPieces.forEach(p => {
    p.addEventListener('click', (e) => {
        if (currentTurn === 0 || !hasRolled) return;

        let active = playerData[currentTurn];
        let pColor = e.target.dataset.color;
        let pIndex = parseInt(e.target.dataset.index);

        
        if (pColor === active.color && e.target.classList.contains('blink')) {
            let currentPos = piecePositions[pColor][pIndex];

            if (currentPos === -1 && currentDiceRoll === 6) {
                piecePositions[pColor][pIndex] = 0;
            } else {
                piecePositions[pColor][pIndex] += currentDiceRoll;
            }

            
            let nextCellId = active.path[piecePositions[pColor][pIndex]];
            movePieceVisual(e.target, nextCellId);
            clearBlinks();

          
            if (currentDiceRoll === 6) {
                hasRolled = false;
                statusText.innerText = `${active.name} rolled a 6! Roll again.`;
                diceText.innerText = "Dice Roll: -";
            } else {
                nextTurn();
            }
        }
    });
});

function movePieceVisual(pieceElement, targetCellId) {
    let targetCell = document.getElementById(targetCellId);
    if (targetCell) {
        targetCell.appendChild(pieceElement);
    }
}

function nextTurn() {
    clearBlinks();
    currentTurn = (currentTurn % 4) + 1; 
    hasRolled = false;
    diceText.innerText = "Dice Roll: -";
    updateStatusMessage();
}

function updateStatusMessage() {
    if (currentTurn > 0) {
        statusText.innerText = `${playerData[currentTurn].name}'s Turn`;
    }
}

function clearBlinks() {
    allPieces.forEach(p => p.classList.remove('blink'));
}


startBtn.addEventListener('click', startGame);
rollBtn.addEventListener('click', rollDice);
