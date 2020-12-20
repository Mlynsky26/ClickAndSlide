import { } from "./leaderboard.js"

export function timer(context) {
    const { timerHtml, startDate } = context
    let date = new Date().getTime()
    let distance = date - startDate

    timerHtml.innerHTML = generateTimerImage(translateTime(distance))
}

function generateTimerImage(time) {
    let imagesFromString = ""
    for (let i = 0; i < time.length; i++) {
        let char = time[i]
        char == ":" ? imagesFromString += '<img src="img/timer/colon.gif">' : imagesFromString += `<img src="img/timer/c${char}.gif">`
    }
    return imagesFromString
}

function addingZeroToTimer(time, precision) {
    time = time.toString()
    for (let i = 0; i < precision; i++)
        time.length < precision ? time = "0" + time : 0
    return time
}

export function translateTime(distance) {
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    let milliseconds = distance % 1000

    hours = addingZeroToTimer(hours, 2)
    minutes = addingZeroToTimer(minutes, 2)
    seconds = addingZeroToTimer(seconds, 2)
    milliseconds = addingZeroToTimer(milliseconds, 3)

    let timeToGenerate = `${hours}:${minutes}:${seconds}:${milliseconds}`
    return timeToGenerate
}