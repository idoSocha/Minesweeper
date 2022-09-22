'use strict'
////model////

const MINE = '💣'
const EMPTY = ' '
const FLAG = '⛳'

var gBoard = [
    {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true
    }
]

const gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gTime
var gTimeInterval




// functions////

function initGame() {
    //model
    gBoard = buildBoard()
    //DOM
    stopTime()
    renderBoard(gBoard, '.container')

}



function buildBoard() {
    var board = createMat(gLevel.SIZE, gLevel.SIZE)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = EMPTY
        }
        createMines(board)
        return board
    }
}


function createMine(board) {
    var mine = {
        location: {
            i: getRandomIntInclusive(0, 3),
            j: getRandomIntInclusive(0, 3)
        }
    }

    board[mine.location.i][mine.location.j] = MINE
}

function createMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        createMine(board)
    }
}

// checks for mines that are negs of normal cells
function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell === MINE) minesAroundCount++
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
    var isShown = true
    gBoard.isShown = isShown
    if (event.which === 3) {
        window.addEventListener("contextmenu", e => e.preventDefault())
        var flagged = elCell.classList.toggle('flag')
        elCell.innerText = FLAG
        gGame.markedCount++
        if (!flagged) {
            gGame.markedCount--
            gGame.markedCount--
        }
        console.log(gGame.markedCount);
    }
    if (event.which === 1) {
        if (elCell.innerText !== MINE) {
            var cellText = setMinesNegsCount(gBoard, i, j)
            if (cellText)
                //DOM
                elCell.innerText = cellText
        }
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