// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

const messageStatus = document.getElementById("status_message")

//player choice
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const showOptions = (event) => {
  document.getElementById("play_form").removeAttribute("hidden");


  //rps game 
  if(event.target.id === "rps") {
    document.getElementById("extra_options").setAttribute("hidden", "true");
    //rpsls game 
  } else if (event.target.id === "rpsls") {
    document.getElementById("extra_options").removeAttribute("hidden");
  }

  if(event.target.id === "random") {
  	//random choice by player
    document.getElementById("opponent_options").setAttribute("hidden", "true");
    document.getElementById("random_options").removeAttribute("hidden");
  } 
  else if(event.target.id === "opponent") {
    document.getElementById("random_options").setAttribute("hidden", "true");
    document.getElementById("opponent_options").removeAttribute("hidden");
  }
}
//rest button options for player
const resetOptions = () => {
  
  document.getElementById("play_form").setAttribute("hidden", "true");
  document.getElementById("opponent_options").setAttribute("hidden", "true");
  document.getElementById("random_options").setAttribute("hidden", "true");
  document.getElementById("extra_options").setAttribute("hidden", "true");
}

const submit = (event) => {
  
  const typeofGame = document.querySelector('input[name="typeofGame"]:checked')?.value;
  
  const playGame = document.querySelector('input[name="playGame"]:checked')?.value;

  //main player 
  if(typeofGame && playGame) {
    const getData = (player) => {
      fetch(`/app/${typeofGame}/play/${player}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        messageStatus.innerText = `You played: ${capitalize(json.player)}\nThe opponent played: ${capitalize(json.opponent)}\nResult: ${capitalize(json.result)}`;
      })
      .catch((e) => {
        messageStatus.innerText = 'Something went wrong. Please try again!'
      });
    }
    //opponent player 
    if(playGame === "opponent") {
      getData(document.querySelector('input[name="player_option"]:checked')?.value);
    } else {
      fetch(`/app/${typeofGame}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        getData(json.player);
      })
    }
  }
}
//buttons
//each time button is pressed, sets class to active 
//documentations

const rulesModal = document.getElementById("how_to_play");

const openRulesButton = document.getElementById("show_rules");

const closeRulesButton = document.getElementById("close_rules");

const gameSelect = document.getElementById("form");
const randomSubmitButton = document.getElementById("random_submit");

const opponentSubmitButton = document.getElementById("opponent_submit");


//buttons 

gameSelect.addEventListener("input", showOptions);

gameSelect.addEventListener("reset", resetOptions);

randomSubmitButton.addEventListener("click", submit);

opponentSubmitButton.addEventListener("click", submit);

openRulesButton.addEventListener("click", () => rulesModal.style.display = "block");


closeRulesButton.addEventListener("click", () => rulesModal.style.display = "none")
