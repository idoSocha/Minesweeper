'use strict'
////model////

const MINE = '💣'
const EMPTY = ' '
const FLAG = '⛳'

var gCell =
{
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
}

const gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    shownCount: 0, // how many cells are opened
    markedCount: 0, //how many flagged cells
    secsPassed: 0
}

var gBoard
var gTime
var gTimeInterval




// functions////

function initGame(size = gLevel.SIZE) {
    //model 
    gBoard = createMat(size, size)
    console.table(gBoard)
    console.log(gBoard)
    buildBoard(gBoard)
    //DOM
    // stopTime()
    renderBoard(gBoard, '.container')
}


function buildBoard(board) {
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j] = EMPTY
        }

        newBoard.push(board[i][j])
    }
    newBoard.push(createMines(board))
    return newBoard
}


function createMine(board) {
    var mine = {
        location: {
            i: getRandomIntInclusive(0, 3),
            j: getRandomIntInclusive(0, 3)
        }
    }
    gCell.isMarked = true
    board[mine.location.i][mine.location.j] = MINE
}

function createMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        createMine(board)
    }
}

// checks for mines that are negs of normal cells
function setMinesNegsCount(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell === MINE) currCell.minesAroundCount++
        }
    }
    return minesAroundCount
}



function cellClicked(elCell, event, i, j, isShown = false) {
    //model
    if (!gGame.isOn) {
        startTime()
    }
    gGame.isOn = true


    if (event.which === 3) {
        window.addEventListener("contextmenu", e => e.preventDefault())
        var flagged = elCell.classList.toggle('flag')
        if (flagged) {
            gCell.isMarked = true
            elCell.innerText = FLAG
            gGame.markedCount++
        }
        else if (!flagged && elCell.innerText === MINE) {
            elCell.innerText = MINE
            gGame.markedCount--
            gCell.isMarked = false
        }
        else if (!flagged) {
            elCell.innerText = EMPTY
            gGame.markedCount--
            gCell.isMarked = false
        }

        console.log(gGame.markedCount);
    }
    if (event.which === 1) {
        var isShown = true
        gCell.isShown = isShown
        var cellText = setMinesNegsCount(gBoard, i, j)
        if (cellText)
            //DOM
            elCell.innerText = cellText
    }
}



function startTime() {
    gTime = Date.now()
    gTimeInterval = setInterval(timeNow, 1000);
}
function timeNow() {
    var currTime = Date.now() - gTime
    gGame.secsPassed = (currTime / 1000).toFixed(0)
    document.querySelector('.time h3 span').innerText = gGame.secsPassed
}
function stopTime() {
    clearInterval(gTimeInterval)
}