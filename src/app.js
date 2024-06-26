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

const basePath = "/javascript-fundamentals-refresh/components";

const routes = {
  404: {
    html: `${basePath}/not-found/not-found.html`,
    js: `${basePath}/not-found/not-found.js`,
  },
  "/javascript-fundamentals-refresh/": {
    html: `${basePath}/home/home.html`,
    js: null,
  },
  "/javascript-fundamentals-refresh/country-match": {
    html: `${basePath}/country-match/country-match.html`,
    js: `${basePath}/country-match/country-match.js`,
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
