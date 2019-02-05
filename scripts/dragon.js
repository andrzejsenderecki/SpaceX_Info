require('../scss/partials/_main.scss');
require('../scss/partials/_header.scss');
require('../scss/partials/_details_page.scss');
require('../scss/partials/_footer.scss');
require('babel-core/register');
require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () => {

    function getDragonData(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
            displayData(json);
        });
    }

    function displayData(dragonData) {
        const dragonDataSection = document.querySelector('.data');

        // Description

        const dragonDescription = document.querySelector('p');
        dragonDescription.innerText = dragonData.description;

        // General Info

        const dragonGeneralTitle = document.createElement('h3');
        dragonGeneralTitle.innerText = 'General Info';
        dragonDataSection.appendChild(dragonGeneralTitle);

        const dragonGeneralList = document.createElement('ul');

        const dragonGeneralFirstFlight = document.createElement('li');
        dragonGeneralFirstFlight.innerText = `First Flight: ${dragonData.first_flight}`;
        dragonGeneralList.appendChild(dragonGeneralFirstFlight);

        dragonDataSection.appendChild(dragonGeneralList);

        // Dimension

        const dragonDimensionTitle = document.createElement('h3');
        dragonDimensionTitle.innerText = 'Dimension';

        const dragonDataListSize = document.createElement('ul');

        const dragonDiameter = document.createElement('li');
        dragonDiameter.innerText = `Diameter: ${dragonData.diameter.meters}m`;
        dragonDataListSize.appendChild(dragonDiameter);

        const dragonHeight = document.createElement('li');
        dragonHeight.innerText = `Height: ${dragonData.height_w_trunk.meters}m`;
        dragonDataListSize.appendChild(dragonHeight);

        dragonDataSection.appendChild(dragonDimensionTitle);
        dragonDataSection.appendChild(dragonDataListSize);

        // Mass

        const dragonMassTitle = document.createElement('h3');
        dragonMassTitle.innerText = 'Mass';
        dragonDataSection.appendChild(dragonMassTitle);

        const dragonMassList = document.createElement('ul');
        const dragonMass = document.createElement('li');
        dragonMass.innerText = `Mass: ${dragonData.dry_mass_kg}kg`;
        dragonMassList.appendChild(dragonMass);
        dragonDataSection.appendChild(dragonMassList);

        // Gallery

        const dragonGalleryContainer = document.querySelector('.gallery-container');
        const dragonGallery = document.querySelector('.gallery');

        const dragonGalleryTitle = document.createElement('h3');
        dragonGalleryTitle.innerText = 'Gallery';
        dragonGalleryContainer.insertBefore(dragonGalleryTitle, dragonGallery);

        const dragonGalleryImages = document.createElement('ul');

        dragonData.flickr_images.forEach(element => {
            let img = document.createElement('img');
            img.setAttribute('src', element);
            dragonGallery.appendChild(img);
        });
    }

    getDragonData(`https://api.spacexdata.com/v3/dragons/${localStorage.getItem('element')}`);

    const dragonHeader = document.querySelector('header');
    const name = document.createElement('h2');
    name.innerText = localStorage.getItem('elementName');
    dragonHeader.appendChild(name);

});
