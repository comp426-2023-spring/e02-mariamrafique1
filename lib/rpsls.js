const game = {
    "rock": [
        "lizard",
        "scissors"
    ],
    "paper": [
        "rock",
        "spock"
    ],
    "scissors": [
        "paper",
        "lizard"
    ],
    "lizard": [
        "spock",
        "paper"
    ],
    "spock": [
        "scissors",
        "rock"
    ]

}
//export rpls funcd
export function rpsls(player) {
    const choose = ["rock", "paper", "scissors", "lizard", "spock"]
    if(player != null && !choose.includes(player)) {
        console.error(`${player} is out of range.`)
        return null
    }
    return play_rps(player, choose)
}


//export rps function 
export function rps(player) {
    const choose = ["rock", "paper", "scissors"]
    if(player != null && !choose.includes(player)) {
        console.error(`${player} is out of range.`)
        return null
    }
    return play_rps(player, choose)
}




//play rock paper scissor
//random 
function play_rps(player, choose) {
    var output = {}


    if(player == null) {
        output.player = random_option(choose)
    } else {
        output.player = player


        output.opponent = random_option(choose)
        
        //both players have same chosen shot
        //results in tie
        if(output.player == output.opponent) {
            output.result = "tie"
            //othewise using const game to find game logic to 
            //see which plyer wins

        } else {
            output.result = rpsls_logic(output.player, output.opponent) ? "win" : "lose"
        }
    }
    return output
}

function rpsls_logic(a, b) {
    return game[a].includes(b)
}

function random_option(choose) {
    //
    return choose[Math.floor(Math.random() * choose.length)]
}
