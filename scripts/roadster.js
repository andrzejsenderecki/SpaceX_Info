require('../scss/partials/_main.scss');
require('../scss/partials/_header.scss');
require('../scss/partials/_details_page.scss');
require('../scss/partials/_footer.scss');
require('babel-core/register');
require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () => {

    function getRoadsterData(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
            displayRoadsterData(json);
        });
    }

    function displayRoadsterData(roadsterData) {
        const roadsterDataSection = document.querySelector('.data');

        // Description

        const roadsterDescription = document.querySelector('p');
        roadsterDescription.innerText = roadsterData.details;

        // General Info

        const roadsterGeneralTitle = document.createElement('h3');
        roadsterGeneralTitle.innerText = 'General Info';
        roadsterDataSection.appendChild(roadsterGeneralTitle);

        const roadsterGeneralList = document.createElement('ul');

        const roadsterGeneralFirstFlight = document.createElement('li');
        const launchDate = roadsterData.launch_date_utc;
        let launchDateCrop = '';

        for(let i=0; i<launchDate.length; i++) {
            if(launchDate[i] === 'T') {
                break;
            } else {
                launchDateCrop = launchDateCrop + launchDate[i];
            }
        }

        roadsterGeneralFirstFlight.innerText = `Launch Date: ${launchDateCrop}`;
        roadsterGeneralList.appendChild(roadsterGeneralFirstFlight);
        roadsterDataSection.appendChild(roadsterGeneralList);

        // Gallery

        const roadsterGalleryContainer = document.querySelector('.gallery-container');
        const roadsterGallery = document.querySelector('.gallery');

        const roadsterGalleryTitle = document.createElement('h3');
        roadsterGalleryTitle.innerText = 'Gallery';
        roadsterGalleryContainer.insertBefore(roadsterGalleryTitle, roadsterGallery);

        const roadsterGalleryImages = document.createElement('ul');

        roadsterData.flickr_images.forEach(element => {
            let img = document.createElement('img');
            img.setAttribute('src', element);
            roadsterGallery.appendChild(img);
        });
    }

    getRoadsterData(`https://api.spacexdata.com/v3/roadster`);

    const roadsterHeader = document.querySelector('header');
    const name = document.createElement('h2');
    name.innerText = localStorage.getItem('elementName');
    roadsterHeader.appendChild(name);
});
