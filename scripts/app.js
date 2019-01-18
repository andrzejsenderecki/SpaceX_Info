require('../scss/partials/_main.scss');

document.addEventListener('DOMContentLoaded', () => {

    function getData(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    let rocketsList = getData('https://api.spacexdata.com/v3/rockets');
    let shipsList = getData('https://api.spacexdata.com/v3/ships');

    rocketsList.then(json => {
        const listFirst = document.querySelector('section').firstElementChild.nextElementSibling;
        let removeElement = listFirst.firstElementChild;
        removeElement.parentElement.removeChild(removeElement);
        json.forEach(element => {
            let li = document.createElement('li');
            li.innerText = element.rocket_name;
            listFirst.appendChild(li);
        });
    }).then(() => {
        return shipsList;
    }).then(json => {
        const listSecond = document.querySelector('section').lastElementChild;
        let removeElement = listSecond.firstElementChild;
        removeElement.parentElement.removeChild(removeElement);
        json.forEach(element => {
            let li = document.createElement('li');
            li.innerText = element.ship_name;
            listSecond.appendChild(li);
        });
    });
});
