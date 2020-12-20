import { checkToSwitch } from "./switchingCells.js"
import { checkToWin } from "./winning.js"
import { reset } from "./main.js"
import { Cell } from "./cell.js"
import { shuffling } from "./shuffeling.js"
import { generateLeaderboard } from "./leaderboard.js"

export function generateButtons(context) {
    for (let i = 3; i < 7; i++) {
        let button = document.createElement("button")
        button.id = "button" + i
        button.value = i + "x" + i
        button.innerText = i + "x" + i
        button.addEventListener("click", function (e) {
            if (document.getElementById("usernameBox")) {
            } else {
                var id = e.target.id.slice(6)
                context.cellCount = parseInt(id)
                reset(context)
                generateBoard(context)
                generateLeaderboard(context)
            }
        })
        context.buttons.appendChild(button)
    }
}



function generateBoard(context) {
    const { cellCount, scale, board, imageCount } = context
    for (let i = 0; i < cellCount; i++) {
        board[i] = []
        for (let j = 0; j < cellCount; j++) {
            if (j != cellCount - 1 || i != cellCount - 1) {
                let cell = new Cell(i, j, "tile")
                board[i][j] = cell
                cell.cleateElement(scale, context.currentImage % imageCount)
                cell.cellHtml.addEventListener("click", function (e) {
                    let clickedId = e.target.value.split("x")
                    let x = parseInt(clickedId[1])
                    let y = parseInt(clickedId[0])
                    checkToSwitch(context, { x, y })
                    checkToWin(context)
                })
                context.boardHtml.appendChild(cell.cellHtml)
            } else {
                let cell = new Cell(i, j, "blanc")
                board[i][j] = cell
                cell.cleateBlancElement(scale)
                context.boardHtml.appendChild(cell.cellHtml)
            }
        }
    }
    shuffling(context, 0, { x: cellCount - 1, y: cellCount - 1 })
}