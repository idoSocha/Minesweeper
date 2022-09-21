'use strict'
////model////

const MINE = '💣'
const EMPTY = ' '

var gBoard = [
    {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true
    }
]

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// gTimer





// functions////

function initGame() {
    //model
    gBoard = buildBoard()
    //DOM
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


function cellClicked(elCell, i, j, isShown = false) {
    //model
    var isShown = true
    gBoard.isShown = isShown
    if (elCell.innerText !== MINE) {
        var cellText = setMinesNegsCount(gBoard, i, j)
        if (cellText)
            //DOM
            elCell.innerText = cellText
    }
}

