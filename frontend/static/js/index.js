import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard},
        { path: "/posts", view: Posts},
        { path: "/settings", view: Settings},
    ];

    //test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    //look for our match in the array
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
     
    //if no match return home
    if(!match){
        match = {
            route: routes[0],
            isMatch: true
        };
    }
    // create a new instance of view at the match
    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();

    //console.log(match.route.view());

};

//reload router when navigating
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});