const generateButtons = (countriesCapitals) => {
  let buttonsArray = [];

  for (const country in countriesCapitals) {
    const buttonCountry = document.createElement("button");
    buttonCountry.textContent = country;

    const buttonCity = document.createElement("button");
    buttonCity.textContent = countriesCapitals[country];

    buttonsArray.push(buttonCountry, buttonCity);
  }

  return buttonsArray;
};

const renderButtons = (buttonsArray, template) => {
  const buttonsBlock = document.createElement("div");
  buttonsBlock.classList.add("flex-container");

  const shuffledButtons = shuffleArray(buttonsArray);
  shuffledButtons.forEach((button) => {
    buttonsBlock.appendChild(button);
  });

  template.appendChild(buttonsBlock);
};

const initSelectButtonListeners = (
  template,
  countriesCapitals,
  routeHelper
) => {
  let firstSelectedButton = null;
  const buttons = template.querySelectorAll("button");

  buttons.forEach((currentButton) => {
    currentButton.addEventListener("click", () => {
      if (!firstSelectedButton) {
        firstSelectedButton = currentButton;
        currentButton.classList.add("selected");
      } else if (
        firstSelectedButton &&
        countryMatchCapital(
          firstSelectedButton,
          currentButton,
          countriesCapitals
        )
      ) {
        firstSelectedButton.remove();
        currentButton.remove();
        firstSelectedButton = null;
        checkIfGameover(template.querySelectorAll("button"), routeHelper);
      } else {
        firstSelectedButton.classList.remove("selected");
        firstSelectedButton = null;
      }
    });
  });
};

const checkIfGameover = (currentButtons) => {
  if (currentButtons.length === 0) {
    const menu = confirm("You Won! Repeat?");

    return menu ? initApp() : window.route("/javascript-fundamentals-refresh/");
  }
};

const countryMatchCapital = (
  firstSelectedButton,
  currentButton,
  countriesCapitals
) =>
  firstSelectedButton.textContent ===
    countriesCapitals[currentButton.textContent] ||
  countriesCapitals[firstSelectedButton.textContent] ===
    currentButton.textContent;

const shuffleArray = (originalArray) => {
  for (let i = originalArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
  }
  return originalArray;
};

const resetViewContent = (template) => {
  template.innerHTML = "";
};

export const initApp = (routeHelper) => {
  const template = document.getElementById("country-match");

  const countriesCapitals = {
    Poland: "Warsaw",
    Lithuania: "Vilnius",
    Latvia: "Riga",
    Estonia: "Tallinn",
    Finland: "Helsinki",
    Sweden: "Stockholm",
    Norway: "Oslo",
    Denmark: "Copenhagen",
  };

  resetViewContent(template);

  renderButtons(generateButtons(countriesCapitals), template);

  initSelectButtonListeners(template, countriesCapitals, routeHelper);
};
