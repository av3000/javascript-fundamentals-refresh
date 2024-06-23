const route = (event) => {
  if (typeof event === "string") {
    window.history.pushState({}, "", event);
    routeLocation();
  } else if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    routeLocation();
  }
};

const routes = {
  404: {
    html: "./components/not-found/not-found.html",
    js: "./components/not-found/not-found.js",
  },
  "/": {
    html: "./components/home/home.html",
    js: null,
  },
  "/country-match": {
    html: "./components/country-match/country-match.html",
    js: "./components/country-match/country-match.js",
  },
};

const routeLocation = async () => {
  const mainPage = document.getElementById("main-page");
  const path = window.location.pathname;
  const route = routes[path] || routes[404];

  try {
    const { default: pageHTML } = await import(`${route.html}`);
    mainPage.innerHTML = pageHTML;

    if (route.js) {
      await import(`${route.js}`);
      const module = await import(`${route.js}`);
      if (module.initApp) {
        module.initApp(route);
      }
    }
  } catch (error) {
    console.error(`Error loading route ${path}: ${error}`);
    const { default: notFoundHTML } = await import(`${routes[404].html}`);
    mainPage.innerHTML = notFoundHTML;
  }
};

const initFirstRoute = () => {
  window.onpopstate = routeLocation;
  window.route = route;

  routeLocation();
};

initFirstRoute();
