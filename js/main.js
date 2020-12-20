import { generateButtons } from "./generating.js"
import { generateSlider } from "./slider.js"

const context = {
    content: document.getElementById("content"),
    boardHtml: document.getElementById("board"),
    buttons: document.getElementById("buttons"),
    timerHtml: document.getElementById("timer"),
    board: [],
    imageCount: 5,
    currentImage: 0,
    cellCount: undefined,
    shufflingTimeout: undefined,
    startDate: undefined,
    timerInterval: undefined
}


function init() {
    generateSlider(context)
    generateButtons(context)
}
init()

export function reset(context) {
    context.board = []
    context.boardHtml.innerHTML = ""
    context.scale = parseInt(context.boardHtml.clientWidth) / context.cellCount
    clearTimeout(context.shufflingTimeout)
    document.getElementById("message").innerHTML = ""
}