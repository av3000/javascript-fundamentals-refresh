import "../assets/css/style.css";

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

function renderButtons() {
  const app = document.getElementById("app");
  const buttonsBlock = document.createElement("div");
  buttonsBlock.classList.add("flex-container");

  for (const country in inputData) {
    const buttonCountry = document.createElement("button");
    buttonCountry.textContent = country;
    console.log("country", country);

    const buttonCity = document.createElement("button");
    buttonCity.textContent = inputData[country];
    console.log("city", inputData[country]);

    buttonsBlock.appendChild(buttonCountry);
    buttonsBlock.appendChild(buttonCity);
  }
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
        firstSelectedButton.classList.remove("selected");
        firstSelectedButton.remove();
        currentButton.remove();
        firstSelectedButton = null;
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

renderButtons();
initSelectButtonListeners();
