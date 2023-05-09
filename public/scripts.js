// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

const statusMessage = document.getElementById("status_message")

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const showOptions = (event) => {
  document.getElementById("play_form").removeAttribute("hidden");

  if(event.target.id === "rps") {
    document.getElementById("extra_options").setAttribute("hidden", "true");
  } else if (event.target.id === "rpsls") {
    document.getElementById("extra_options").removeAttribute("hidden");
  }

  if(event.target.id === "random") {
    document.getElementById("opponent_options").setAttribute("hidden", "true");
    document.getElementById("random_options").removeAttribute("hidden");
  } else if(event.target.id === "opponent") {
    document.getElementById("random_options").setAttribute("hidden", "true");
    document.getElementById("opponent_options").removeAttribute("hidden");
  }
}

const resetOptions = () => {
  document.getElementById("play_form").setAttribute("hidden", "true");
  document.getElementById("opponent_options").setAttribute("hidden", "true");
  document.getElementById("random_options").setAttribute("hidden", "true");
  document.getElementById("extra_options").setAttribute("hidden", "true");
}

const submit = (event) => {
  const gameType = document.querySelector('input[name="game_type"]:checked')?.value;
  const playstyle = document.querySelector('input[name="playstyle"]:checked')?.value;

  if(gameType && playstyle) {
    const getData = (player) => {
      fetch(`/app/${gameType}/play/${player}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        statusMessage.innerText = `You played: ${capitalize(json.player)}\nThe opponent played: ${capitalize(json.opponent)}\nResult: ${capitalize(json.result)}`;
      })
      .catch((e) => {
        statusMessage.innerText = 'Something went wrong. Please try again!'
      });
    }
    if(playstyle === "opponent") {
      getData(document.querySelector('input[name="player_option"]:checked')?.value);
    } else {
      fetch(`/app/${gameType}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        getData(json.player);
      })
    }
  }
}

const rulesModal = document.getElementById("how_to_play");
const openRulesButton = document.getElementById("show_rules");
const closeRulesButton = document.getElementById("close_rules");
const gameSelect = document.getElementById("form");
const randomSubmitButton = document.getElementById("random_submit");
const opponentSubmitButton = document.getElementById("opponent_submit");

gameSelect.addEventListener("input", showOptions);
gameSelect.addEventListener("reset", resetOptions);

randomSubmitButton.addEventListener("click", submit);
opponentSubmitButton.addEventListener("click", submit);

openRulesButton.addEventListener("click", () => rulesModal.style.display = "block");
closeRulesButton.addEventListener("click", () => rulesModal.style.display = "none")