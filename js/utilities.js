
function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            var currCell = []
            currCell = gCell
            row.push(currCell)
        }
        mat.push(row)
    }
    return mat
}


//////

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat.length; j++) {
            var cell = mat[i][j]
            var className = 'cell cell-' + i + '-' + j
            strHTML += `<td onmousedown = "cellClicked(this,event,${i},${j})" class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


///////////////

// location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
// }

///////////

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

///////////

// function getEmptyPos() {
//     var emptyPoses = []
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[0].length; j++) {
//             var cell = gBoard[i][j]
//             // to be changed! --- FLOOR/cell.type/cell.gameElement/ gBoard if other name
//             if (cell.type === FLOOR && !cell.gameElement) {
//                 var pos = { i: i, j: j }
//                 emptyPoses.push(pos)
//             }
//         }
//     }

//     var randIdx = getRandomInt(0, emptyPoses.length)
//     return emptyPoses[randIdx]
// }

/////////


// function getRandomColor() {
//     var letters = '0123456789ABCDEF'
//     var color = '#'
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)]
//     }
//     return color
// }


//////

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array
// }