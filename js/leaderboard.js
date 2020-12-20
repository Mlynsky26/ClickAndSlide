import { translateTime } from "./timer.js"

let cookieBoards = [
    [], [], [], []
]

export function addCookie(context, username, distance) {
    const { cellCount } = context
    let id = new Date().getTime()
    let expiredate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    let cookieData = `user${id}=${encodeURI(username)}|${distance}|${cellCount};expires=${expiredate}`
    document.cookie = cookieData
    cookieData = cookieData.split("|")
    generateLeaderboard(context)
}

function creatingTablesWitchRecords() {
    cookieBoards = [
        [], [], [], []
    ]
    let allCookies = document.cookie.split(";")
    for (let i = 0; i < allCookies.length; i++) {
        allCookies[i] = allCookies[i].split("|")
        switch (allCookies[i][2]) {
            case "3": {
                cookieBoards[0].push(allCookies[i])
                break
            }
            case "4": {
                cookieBoards[1].push(allCookies[i])
                break
            }
            case "5": {
                cookieBoards[2].push(allCookies[i])
                break
            }
            case "6": {
                cookieBoards[3].push(allCookies[i])
                break
            }
            default:
        }
    }
    sortingRecords()
    settingMax10Records()
}

function sortingRecords() {
    for (let i = 0; i < cookieBoards.length; i++) {
        cookieBoards[i].sort((a, b) => { return a[1] - b[1] })
    }
}

function settingMax10Records() {
    let expiredate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    for (let i = 0; i < cookieBoards.length; i++) {
        while (cookieBoards[i].length > 10) {
            let record = cookieBoards[i].pop()
            let userdata = record[0].split("=")
            let userid = userdata[0]

            document.cookie = `${userid}=test;expires=${expiredate}`
        }
    }
    let test1 = document.cookie.split(";")
}

export function generateLeaderboard(context) {
    const { cellCount } = context
    creatingTablesWitchRecords()
    let index = cellCount - 3
    let leaderboardBox = document.getElementById("leaderboard")
    leaderboardBox.innerHTML = ""
    if (cookieBoards[index].length != 0) {
        let leaderboardHeader = document.createElement("h1")
        leaderboardHeader.innerText = `Najlepsze czasy na planszy ${cellCount}x${cellCount}`
        leaderboardBox.appendChild(leaderboardHeader)
        let leaderboardTable = document.createElement("table")
        leaderboardTable.id = "leaderboardTable"
        for (let i = 0; i < cookieBoards[index].length; i++) {
            let tr = document.createElement("tr")
            switch (i) {
                case 0:
                    tr.className = "first"
                    break;
                case 1:
                    tr.className = "second"
                    break;
                case 2:
                    tr.className = "third"
                    break;

                default:
                    break;
            }

            let tdLp = document.createElement("td")
            tdLp.innerText = i + 1
            tdLp.className = "lp"
            tr.appendChild(tdLp)

            let tdUsername = document.createElement("td")
            let username = cookieBoards[index][i][0].split("=")
            tdUsername.innerText = username[1]
            tdUsername.className = "user"
            tr.appendChild(tdUsername)

            let tdTime = document.createElement("td")
            tdTime.innerText = translateTime(cookieBoards[index][i][1])
            tdTime.className = "timeRecord"
            tr.appendChild(tdTime)

            leaderboardTable.appendChild(tr)
        }
        leaderboardBox.appendChild(leaderboardTable)
    }
}