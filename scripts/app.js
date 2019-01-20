require('../scss/partials/_main.scss');
require("babel-core/register");
require("babel-polyfill");

document.addEventListener('DOMContentLoaded', () => {

    function getData(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
            generatorControl.next(json);
        }).catch(error => {
            generatorControl.next('Error.');
        });
    }

    function removeLoadingText(list) {
        const removeElementFirst = list.firstElementChild;
        removeElementFirst.parentElement.removeChild(removeElementFirst);
    }

    function errorSupport(response, list) {
        let li = document.createElement('li');
        li.innerText = response;
        list.appendChild(li);
    }

    function* generator() {

        // Rockets

        const rockets = yield getData('https://api.spacexdata.com/v3/rockets');

        const listRockets = document.querySelector('section').firstElementChild.nextElementSibling;
        removeLoadingText(listRockets);

        if(rockets !== 'Error.') {
            rockets.forEach(element => {
                let li = document.createElement('li');
                li.innerText = element.rocket_name;
                listRockets.appendChild(li);
            });
        } else {
            errorSupport(rockets, listRockets);
        }

        // Dragons

        const dragons = yield getData('https://api.spacexdata.com/v3/dragons');

        const listDragons = listRockets.nextElementSibling.nextElementSibling;

        removeLoadingText(listDragons);

        if(dragons !== 'Error.') {
            dragons.forEach(element => {
                let li = document.createElement('li');
                li.innerText = element.name;
                listDragons.appendChild(li);
            });
        } else {
            errorSupport(dragons, listDragons);
        }

        // Landing Pads

        const landingPads = yield getData('https://api.spacexdata.com/v3/landpads');

        const listLandingPads = listDragons.nextElementSibling.nextElementSibling;

        removeLoadingText(listLandingPads);

        if(landingPads !== 'Error.') {
            landingPads.forEach(element => {
                let li = document.createElement('li');
                li.innerText = element.location.name;
                listLandingPads.appendChild(li);
            });
        } else {
            errorSupport(landingPads, listLandingPads);
        }

        // Lunch Pads

        const lunchPads = yield getData('https://api.spacexdata.com/v3/launchpads');

        const listLunchPads = listLandingPads.nextElementSibling.nextElementSibling;

        removeLoadingText(listLunchPads);

        if(lunchPads !== 'Error.') {
            lunchPads.forEach(element => {
                let li = document.createElement('li');
                li.innerText = element.location.name;
                listLunchPads.appendChild(li);
            });
        } else {
            errorSupport(lunchPads, listLunchPads);
        }

        // Ships

        const ships = yield getData('https://api.spacexdata.com/v3/ships');

        const listShips = listLunchPads.nextElementSibling.nextElementSibling;

        removeLoadingText(listShips);

        if(ships !== 'Error.') {
            ships.forEach(element => {
                let li = document.createElement('li');
                li.innerText = element.ship_name;
                listShips.appendChild(li);
            });
        } else {
            errorSupport(ships, listShips);
        }

        // Missions

        const missions = yield getData('https://api.spacexdata.com/v3/missions');

        const listMissions = listShips.nextElementSibling.nextElementSibling;

        removeLoadingText(listMissions);

        if(missions !== 'Error.') {
            missions.forEach(element => {
                let li = document.createElement('li');
                li.innerText = element.mission_name;
                listMissions.appendChild(li);
            });
        } else {
            errorSupport(missions, listMissions);
        }
    }

    const generatorControl = generator();
    generatorControl.next();

});
