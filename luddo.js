const startBtn = document.getElementById('start');
const rollBtn = document.getElementById('rolldice');
const statusText = document.getElementById('player');
const diceText = document.getElementById('dice');

const allPiecer = document.querySelectorAll('.piecer');
const allPieceg = document.querySelectorAll('.pieceg');
const allPiecey = document.querySelectorAll('.piecey');
const allPieceb = document.querySelectorAll('.pieceb');

let currentturn = 0;
let currentDiceRoll = null;
let sixCount = 0;

const safeBoxes = [
    "r1",
    "r14",
    "r27",
    "r40",
    "r9",
    "r22",
    "r35",
    "r48"
];

const redPath = ["r1","r2","r3","r4","r5","all","r11","r12","r13","r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37","r38","r39","r40","r41","r42","r43","r44","r45","r46","r47","r48","r49","r50","r51","r52","r53","r54","r55","r56","home"];

const greenPath = ["r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37","r38","r39","r40","r41","r42","r43","r44","r45","r46","r47","r48","r49","r50","all","r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","g1","g2","g3","g4","g5","home"];

const yellowPath = ["r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37","r38","r39","r40","r41","r42","r43","r44","r45","r46","r47","r48","r49","r50","all","r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","y1","y2","y3","y4","y5","home"];

const bluePath = ["r40","r41","r42","r43","r44","r45","r46","r47","r48","r49","r50","all","r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15","r16","r17","r18","r19","r20","r21","r22","r23","r24","r25","r26","r27","r28","r29","r30","r31","r32","r33","r34","r35","r36","r37","r38","b1","b2","b3","b4","b5","home"];

function startGame() {

    currentturn = 1;
    currentDiceRoll = null;
    sixCount = 0;

    statusText.innerText = "Player 1 (Red) Turn";
    diceText.innerText = "Dice Roll : -";

    clearAllBlinks();
}

function clearAllBlinks() {

    allPiecer.forEach(p => p.classList.remove('blink'));
    allPieceg.forEach(p => p.classList.remove('blink'));
    allPiecey.forEach(p => p.classList.remove('blink'));
    allPieceb.forEach(p => p.classList.remove('blink'));
}

function passTurn() {

    currentDiceRoll = null;
    sixCount = 0;

    if (currentturn == 1) {

        currentturn = 2;
        statusText.innerText = "Player 2 (Green) Turn";

    }

    else if (currentturn == 2) {

        currentturn = 3;
        statusText.innerText = "Player 3 (Yellow) Turn";

    }

    else if (currentturn == 3) {

        currentturn = 4;
        statusText.innerText = "Player 4 (Blue) Turn";

    }

    else {

        currentturn = 1;
        statusText.innerText = "Player 1 (Red) Turn";

    }

}

function checkThreeSix() {

    if (currentDiceRoll == 6) {

        sixCount++;

    }

    else {

        sixCount = 0;

    }

    if (sixCount == 3) {

        statusText.innerText = "3 Sixes! Turn Passed";

        clearAllBlinks();

        setTimeout(() => {

            passTurn();

        }, 1000);

        return true;

    }

    return false;
}

function checkCollision(targetBox, currentPiece) {

    const targetId = targetBox.getAttribute('id');

    if (safeBoxes.includes(targetId)) {
        return;
    }

    const allPieces = [...targetBox.querySelectorAll('img')];

    const otherPieces = allPieces.filter(p => p !== currentPiece);

    if (otherPieces.length == 0) {
        return;
    }

    const currentColor = currentPiece.getAttribute('color');

    const sameColor = otherPieces.filter(
        p => p.getAttribute('color') == currentColor
    );

    if (sameColor.length > 0) {
        return;
    }

    let colorMap = {};

    otherPieces.forEach(p => {

        let clr = p.getAttribute('color');

        if (!colorMap[clr]) {
            colorMap[clr] = 0;
        }

        colorMap[clr]++;
    });

    for (let clr in colorMap) {

        if (colorMap[clr] >= 2) {
            return;
        }

    }

    otherPieces.forEach(piece => {

        const color = piece.getAttribute('color');

        let home;

        if (color == "red") {

            home = document.getElementById("rhome");

        }

        else if (color == "green") {

            home = document.getElementById("ghome");

        }

        else if (color == "yellow") {

            home = document.getElementById("yhome");

        }

        else if (color == "skyblue") {

            home = document.getElementById("bhome");

        }

        if (home) {
            home.appendChild(piece);
        }

    });

}

function pl() {

    if (currentturn == 0) {

        statusText.innerText = "Click START first";
        return;

    }

    if (currentDiceRoll != null) {
        return;
    }

    currentDiceRoll = Math.floor(Math.random() * 6) + 1;

    diceText.innerText = "Dice Roll : " + currentDiceRoll;

    if (checkThreeSix()) {
        return;
    }

    clearAllBlinks();

    if (currentturn == 1) {

        let canMove = false;

        allPiecer.forEach(p => {

            let pos = p.parentElement.getAttribute('name');
            let id = p.parentElement.getAttribute('id');

            if (currentDiceRoll == 6 && pos == "rdiv") {

                p.classList.add('blink');
                canMove = true;

            }

            else if (redPath.includes(id)) {

                let j = redPath.indexOf(id);

                if (j + currentDiceRoll < redPath.length) {

                    p.classList.add('blink');
                    canMove = true;

                }

            }

        });

        if (!canMove) {
            setTimeout(passTurn, 1000);
        }

    }

    else if (currentturn == 2) {

        let canMove = false;

        allPieceg.forEach(p => {

            let pos = p.parentElement.getAttribute('name');
            let id = p.parentElement.getAttribute('id');

            if (currentDiceRoll == 6 && pos == "gdiv") {

                p.classList.add('blink');
                canMove = true;

            }

            else if (greenPath.includes(id)) {

                let j = greenPath.indexOf(id);

                if (j + currentDiceRoll < greenPath.length) {

                    p.classList.add('blink');
                    canMove = true;

                }

            }

        });

        if (!canMove) {
            setTimeout(passTurn, 1000);
        }

    }

    else if (currentturn == 3) {

        let canMove = false;

        allPiecey.forEach(p => {

            let pos = p.parentElement.getAttribute('name');
            let id = p.parentElement.getAttribute('id');

            if (currentDiceRoll == 6 && pos == "ydiv") {

                p.classList.add('blink');
                canMove = true;

            }

            else if (yellowPath.includes(id)) {

                let j = yellowPath.indexOf(id);

                if (j + currentDiceRoll < yellowPath.length) {

                    p.classList.add('blink');
                    canMove = true;

                }

            }

        });

        if (!canMove) {
            setTimeout(passTurn, 1000);
        }

    }

    else if (currentturn == 4) {

        let canMove = false;

        allPieceb.forEach(p => {

            let pos = p.parentElement.getAttribute('name');
            let id = p.parentElement.getAttribute('id');

            if (currentDiceRoll == 6 && pos == "bdiv") {

                p.classList.add('blink');
                canMove = true;

            }

            else if (bluePath.includes(id)) {

                let j = bluePath.indexOf(id);

                if (j + currentDiceRoll < bluePath.length) {

                    p.classList.add('blink');
                    canMove = true;

                }

            }

        });

        if (!canMove) {
            setTimeout(passTurn, 1000);
        }

    }

}

allPiecer.forEach(p => {

    p.addEventListener('click', () => {

        if (currentturn != 1) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        let pos = p.parentElement.getAttribute('name');
        let id = p.parentElement.getAttribute('id');

        let targ;

        if (currentDiceRoll == 6 && pos == "rdiv") {

            targ = document.getElementById(redPath[0]);

        }

        else {

            let j = redPath.indexOf(id);
            targ = document.getElementById(redPath[j + currentDiceRoll]);

        }

        if (targ) {

            targ.appendChild(p);

            clearAllBlinks();

            checkCollision(targ, p);

            if (currentDiceRoll == 6) {

                currentDiceRoll = null;
                statusText.innerText = "Player 1 rolled 6! Roll again";

            }

            else {

                passTurn();

            }

        }

    });

});

allPieceg.forEach(p => {

    p.addEventListener('click', () => {

        if (currentturn != 2) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        let pos = p.parentElement.getAttribute('name');
        let id = p.parentElement.getAttribute('id');

        let targ;

        if (currentDiceRoll == 6 && pos == "gdiv") {

            targ = document.getElementById(greenPath[0]);

        }

        else {

            let j = greenPath.indexOf(id);
            targ = document.getElementById(greenPath[j + currentDiceRoll]);

        }

        if (targ) {

            targ.appendChild(p);

            clearAllBlinks();

            checkCollision(targ, p);

            if (currentDiceRoll == 6) {

                currentDiceRoll = null;
                statusText.innerText = "Player 2 rolled 6! Roll again";

            }

            else {

                passTurn();

            }

        }

    });

});

allPiecey.forEach(p => {

    p.addEventListener('click', () => {

        if (currentturn != 3) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        let pos = p.parentElement.getAttribute('name');
        let id = p.parentElement.getAttribute('id');

        let targ;

        if (currentDiceRoll == 6 && pos == "ydiv") {

            targ = document.getElementById(yellowPath[0]);

        }

        else {

            let j = yellowPath.indexOf(id);
            targ = document.getElementById(yellowPath[j + currentDiceRoll]);

        }

        if (targ) {

            targ.appendChild(p);

            clearAllBlinks();

            checkCollision(targ, p);

            if (currentDiceRoll == 6) {

                currentDiceRoll = null;
                statusText.innerText = "Player 3 rolled 6! Roll again";

            }

            else {

                passTurn();

            }

        }

    });

});

allPieceb.forEach(p => {

    p.addEventListener('click', () => {

        if (currentturn != 4) return;
        if (currentDiceRoll == null) return;
        if (!p.classList.contains('blink')) return;

        let pos = p.parentElement.getAttribute('name');
        let id = p.parentElement.getAttribute('id');

        let targ;

        if (currentDiceRoll == 6 && pos == "bdiv") {

            targ = document.getElementById(bluePath[0]);

        }

        else {

            let j = bluePath.indexOf(id);
            targ = document.getElementById(bluePath[j + currentDiceRoll]);

        }

        if (targ) {

            targ.appendChild(p);

            clearAllBlinks();

            checkCollision(targ, p);

            if (currentDiceRoll == 6) {

                currentDiceRoll = null;
                statusText.innerText = "Player 4 rolled 6! Roll again";

            }

            else {

                passTurn();

            }

        }

    });

});

startBtn.addEventListener('click', startGame);
rollBtn.addEventListener('click', pl);
