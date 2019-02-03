require('../scss/partials/_main.scss');
require('../scss/partials/_header.scss');
require('../scss/partials/_rocket.scss');
require('../scss/partials/_footer.scss');
require('babel-core/register');
require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () => {

    async function getDetailsData(url) {
        const data = await fetch(url).then(response => {
            return response.json();
        });
        return data;
    }

    async function createElements() {
        const rocketData = await getDetailsData(`https://api.spacexdata.com/v3/rockets/${localStorage.getItem('element')}`);

        const rocketDataSection = document.querySelector('.rocket-data');

        // Description

        const rocketDescription = document.querySelector('p');
        rocketDescription.innerText = rocketData.description;

        // General Info

        const rocketGeneralTitle = document.createElement('h3');
        rocketGeneralTitle.innerText = 'General Info';
        rocketDataSection.appendChild(rocketGeneralTitle);

        const rocketGeneralList = document.createElement('ul');

        const rocketGeneralFirstFlight = document.createElement('li');
        rocketGeneralFirstFlight.innerText = `First Flight: ${rocketData.first_flight}`;
        rocketGeneralList.appendChild(rocketGeneralFirstFlight);

        const rocketGeneralCost = document.createElement('li');
        rocketGeneralCost.innerText = `Cost per Launch: ${rocketData.cost_per_launch}$`;
        rocketGeneralList.appendChild(rocketGeneralCost);

        rocketDataSection.appendChild(rocketGeneralList);

        // Dimension

        const rocketDimensionTitle = document.createElement('h3');
        rocketDimensionTitle.innerText = 'Dimension';

        const rocketDataListSize = document.createElement('ul');

        const rocketDiameter = document.createElement('li');
        rocketDiameter.innerText = `Diameter: ${rocketData.diameter.meters}m`;
        rocketDataListSize.appendChild(rocketDiameter);

        const rocketHeight = document.createElement('li');
        rocketHeight.innerText = `Height: ${rocketData.height.meters}m`;
        rocketDataListSize.appendChild(rocketHeight);

        rocketDataSection.appendChild(rocketDimensionTitle);
        rocketDataSection.appendChild(rocketDataListSize);

        // Mass

        const rocketMassTitle = document.createElement('h3');
        rocketMassTitle.innerText = 'Mass';
        rocketDataSection.appendChild(rocketMassTitle);

        const rocketMassList = document.createElement('ul');
        const rocketMass = document.createElement('li');
        rocketMass.innerText = `Mass: ${rocketData.mass.kg}kg`;
        rocketMassList.appendChild(rocketMass);
        rocketDataSection.appendChild(rocketMassList);

        // Gallery

        const rocketGallerySection = document.querySelector('.rocket-gallery');
        const rocketGalleryImages = document.createElement('ul');

        rocketData.flickr_images.forEach(element => {
            let img = document.createElement('img');
            img.setAttribute('src', element);
            rocketGallerySection.appendChild(img);
        });
    }

    const rocketHeader = document.querySelector('header');
    const name = document.createElement('h2');
    name.innerText = localStorage.getItem('elementName');
    rocketHeader.appendChild(name);

    createElements();
});
