import { addCookie } from "./leaderboard.js"
let localContext
let distance

export function checkToWin(context) {
    const { board, cellCount } = context
    let ifWin = true
    for (let i = 0; i < cellCount; i++) {
        for (let j = 0; j < cellCount; j++) {
            let cell = board[i][j]
            if (cell.cellHtml.value != cell.cellHtml.id) {
                ifWin = false
            }
        }
    }
    if (ifWin)
        win(context)
    else
        return
}

function win(context) {
    const { currentImage, boardHtml, content, startDate, imageCount } = context

    localContext = context
    clearInterval(context.timerInterval)
    let date = new Date().getTime()
    distance = date - startDate

    boardHtml.innerHTML = `<img src="img/${currentImage % (imageCount)}.jpg">`
    let winInfo1 = document.createElement("h1")
    winInfo1.id = "winInfo"
    winInfo1.innerText = "Brawo wygrałeś!"

    let winInfo2 = document.createElement("h1")
    winInfo2.id = "winInfo"
    winInfo2.innerText = "Wybierz inny obrazek lub zmień poziom trudności."

    let message = document.getElementById("message")
    message.appendChild(winInfo2)
    message.appendChild(winInfo1)
    addUsernameBox()
    // setTimeout(() => {
    //     let username = ""
    //     while (username == "") {
    //         username = prompt("Podaj nazwę użytkownika")
    //     }
    //     addCookie(context, username, distance)
    // }, 100)

}

function addUsernameBox() {
    let box = document.createElement("div")
    box.id = "usernameBox"

    let text = document.createElement("h2")
    text.innerText = "Podaj nazwę użytkownika"
    box.appendChild(text)

    let input = document.createElement("input")
    input.name = "text"
    input.type = "text"
    input.id = "usernameInput"
    input.addEventListener("submit", function () {
        addUsername()
    })
    box.appendChild(input)

    let button = document.createElement("button")
    button.innerText = "Zapisz"
    button.addEventListener("click", function () {
        addUsername()
    })
    box.appendChild(button)

    document.body.appendChild(box)
}

function addUsername() {
    let username = document.getElementById("usernameInput").value
    console.log(username)
    if (username == "" || username == undefined) {
        if (!document.getElementById("invalidUsername")) {
            let usernameBox = document.getElementById("usernameBox")
            let invalidText = document.createElement("h4")
            invalidText.innerText = "Nazwa użytkownika nie może być pusta"
            invalidText.id = "invalidUsername"
            usernameBox.appendChild(invalidText)
        }
    } else {
        addCookie(localContext, username, distance)
        let usernameBox = document.getElementById("usernameBox")
        usernameBox.remove()
    }
}