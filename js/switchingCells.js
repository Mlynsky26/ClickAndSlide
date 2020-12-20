export function checkToSwitch(context, target) {
    const { board, cellCount } = context
    let posibilities = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ]
    for (let i = 0; i < 4; i++) {
        let vector = posibilities[i]
        let currX = target.x + vector.x
        let currY = target.y + vector.y
        if (currX >= 0 && currY >= 0 && currX < cellCount && currY < cellCount) {
            if (board[currX][currY].type == "blanc") {
                switchCells(context, { x: target.x, y: target.y }, { x: currX, y: currY })
            }
        }
    }
}


export function switchCells(context, cell1Cords, cell2Cords) {
    const { cellCount } = context
    let temp = context.board[cell1Cords.x][cell1Cords.y]
    context.board[cell1Cords.x][cell1Cords.y] = context.board[cell2Cords.x][cell2Cords.y]
    context.board[cell2Cords.x][cell2Cords.y] = temp
    context.boardHtml.innerHTML = ""
    for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
            context.board[i][j].cellHtml.value = j + "x" + i
            context.boardHtml.appendChild(context.board[i][j].cellHtml)
        }
    }
}