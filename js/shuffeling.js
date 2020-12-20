import { switchCells } from "./switchingCells.js"
import { timer } from "./timer.js"

const posibilities = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 }
]

export function shuffling(context, counter, currentBlanc) {
    const { cellCount } = context


    if (counter < cellCount * cellCount * 10) {
        let found = false
        let posible = Math.floor(Math.random() * 4)
        let vector = posibilities[posible]
        let currX = currentBlanc.x + vector.x
        let currY = currentBlanc.y + vector.y

        if (currX >= 0 && currY >= 0 && currX < cellCount && currY < cellCount) {
            found = true
            switchCells(context, { x: currX, y: currY }, currentBlanc)
            currentBlanc = { x: currX, y: currY }
        }

        if (found) {
            counter++
        }

        context.shufflingTimeout = setTimeout(shuffling, Math.ceil(100 / cellCount), context, counter, currentBlanc)
    } else {
        context.startDate = new Date().getTime();
        clearInterval(context.timerInterval)
        context.timerInterval = setInterval(timer, 1, context)
    }
}
