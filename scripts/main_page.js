require('../scss/partials/_main.scss');
require('../scss/partials/_header.scss');
require('../scss/partials/_main_page.scss');
require('../scss/partials/_footer.scss');
require('babel-core/register');
require('babel-polyfill');

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

        const listRockets = document.getElementById('rocket').lastElementChild;
        removeLoadingText(listRockets);

        if(rockets !== 'Error.') {
            rockets.forEach(element => {
                let rocketValue = element.rocket_id;
                let li = document.createElement('li');
                let link = document.createElement('a');
                link.setAttribute('href', 'rocket.html');
                link.innerText = element.rocket_name;
                li.appendChild(link);
                li.addEventListener('click', () => {
                    localStorage.setItem('element', rocketValue);
                    localStorage.setItem('elementName', element.rocket_name);
                });
                listRockets.appendChild(li);
            });
        } else {
            errorSupport(rockets, listRockets);
        }

        // Dragons

        const dragons = yield getData('https://api.spacexdata.com/v3/dragons');

        const listDragons = document.getElementById('dragons').lastElementChild;
        removeLoadingText(listDragons);

        if(dragons !== 'Error.') {
            dragons.forEach(element => {
                let dragonValue = element.id;
                let li = document.createElement('li');
                let link = document.createElement('a');
                link.setAttribute('href', 'dragon.html');
                link.innerText = element.name;
                li.appendChild(link);
                listDragons.appendChild(li);
                li.addEventListener('click', () => {
                    localStorage.setItem('element', dragonValue);
                    localStorage.setItem('elementName', element.name);
                });
            });
        } else {
            errorSupport(dragons, listDragons);
        }
    }

    const generatorControl = generator();
    generatorControl.next();

});
