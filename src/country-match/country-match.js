import "../../assets/css/style.css";

const inputData = {
  Poland: "Warsaw",
  Lithuania: "Vilnius",
  Latvia: "Riga",
  Estonia: "Tallinn",
  Finland: "Helsinki",
  Sweden: "Stockholm",
  Norway: "Oslo",
  Denmark: "Copenhagen",
};

let firstSelectedButton = null;
const buttonsArray = [];

generateButtons();
renderButtons();
initSelectButtonListeners();

function generateButtons() {
  for (const country in inputData) {
    const buttonCountry = document.createElement("button");
    buttonCountry.textContent = country;

    const buttonCity = document.createElement("button");
    buttonCity.textContent = inputData[country];

    buttonsArray.push(buttonCountry, buttonCity);
  }
}

function renderButtons() {
  const app = document.getElementById("app");
  const buttonsBlock = document.createElement("div");
  buttonsBlock.classList.add("flex-container");

  const shuffledButtons = shuffleArray(buttonsArray);
  shuffledButtons.forEach((button) => {
    buttonsBlock.appendChild(button);
  });

  app.appendChild(buttonsBlock);
}

function initSelectButtonListeners() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((currentButton) => {
    currentButton.addEventListener("click", () => {
      if (!firstSelectedButton) {
        firstSelectedButton = currentButton;
        currentButton.classList.add("selected");
      } else if (firstSelectedButton && isMatch(currentButton)) {
        firstSelectedButton.remove();
        currentButton.remove();
        firstSelectedButton = null;
        if (document.querySelectorAll("button").length === 0) {
          alert("Congratulations! You won!");
          window.location.reload();
        }
      } else {
        firstSelectedButton.classList.remove("selected");
        firstSelectedButton = null;
      }
    });
  });
}

function isMatch(currentButton) {
  return (
    firstSelectedButton.textContent === inputData[currentButton.textContent] ||
    inputData[firstSelectedButton.textContent] === currentButton.textContent
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
