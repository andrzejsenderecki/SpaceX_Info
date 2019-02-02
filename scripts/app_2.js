require('../scss/partials/_main.scss');
require('../scss/partials/_header.scss');
require('../scss/partials/_rocket.scss');
require('../scss/partials/_footer.scss');
require('babel-core/register');
require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () => {

    const rocketDataSection = document.querySelector('.rocket-data');
    const rocketDataList = document.querySelector('.rocket-data ul');
    const name = document.createElement('h2');
    name.innerText = localStorage.getItem('elementName');
    rocketDataSection.insertBefore(name, rocketDataList);

    async function getRocket(url) {
        const rocketData = await fetch(url).then(response => {
            return response.json();
        });

        const rocketDimensionTitle = document.createElement('h3');
        const rocketDataListSize = document.querySelector('ul');
        const rocketDiameter = document.querySelector('li');
        const rocketHeight = document.createElement('li');
        rocketDimensionTitle.innerText = 'Dimension:'
        rocketDiameter.innerText = `Diameter: ${rocketData.diameter.meters}m`;
        rocketHeight.innerText = `Height: ${rocketData.height.meters}m`;
        rocketDataSection.insertBefore(rocketDimensionTitle, rocketDataListSize);
        rocketDataListSize.appendChild(rocketHeight);
    }

    getRocket(`https://api.spacexdata.com/v3/rockets/${localStorage.getItem('element')}`);

});
