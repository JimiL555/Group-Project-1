document.getElementById('find-earthquakes').addEventListener('click', function() {
    const earthquakeUrl = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`;

    fetch(earthquakeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Earthquake API response:', data);
            if (data.features && data.features.length > 0) {
                const sortedEarthquakes = data.features.sort((a, b) => {
                    const dateA = new Date(a.properties.time);
                    const dateB = new Date(b.properties.time);
                    return dateB - dateA;
                }).slice(0, 20); // Change to 20
                populateEarthquakeList(sortedEarthquakes);
            } else {
                alert('No earthquakes found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching earthquake data:', error);
            alert('An error occurred. Please try again.');
        });
});

function populateEarthquakeList(earthquakes) {
    const earthquakeList = document.getElementById('earthquake-list');
    earthquakeList.innerHTML = '';

    earthquakes.forEach((quake, index) => {
        const date = new Date(quake.properties.time).toLocaleString();
        const option = document.createElement('option');
        option.value = index;
        option.text = `Date: ${date}, Magnitude: ${quake.properties.mag}, Coordinates: (${quake.geometry.coordinates[1]}, ${quake.geometry.coordinates[0]})`;
        option.dataset.lat = quake.geometry.coordinates[1];
        option.dataset.lng = quake.geometry.coordinates[0];
        earthquakeList.add(option);
    });

    earthquakeList.addEventListener('change', function() {
        const selectedQuake = earthquakes[this.value];
        document.getElementById('latitude').value = selectedQuake.geometry.coordinates[1];
        document.getElementById('longitude').value = selectedQuake.geometry.coordinates[0];
    });

    // Select the first earthquake by default
    if (earthquakes.length > 0) {
        earthquakeList.selectedIndex = 0;
        const firstQuake = earthquakes[0];
        document.getElementById('latitude').value = firstQuake.geometry.coordinates[1];
        document.getElementById('longitude').value = firstQuake.geometry.coordinates[0];
    }
}

document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const lat = document.getElementById('latitude').value;
    const lng = document.getElementById('longitude').value;
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const geoNamesUrl = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=jimiliapis`;
    const fullUrl = `${proxyUrl}${encodeURIComponent(geoNamesUrl)}`;

    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const jsonData = JSON.parse(data.contents);
            console.log('GeoNames Location API response:', jsonData);
            if (jsonData.geonames && jsonData.geonames.length > 0) {
                const location = jsonData.geonames[0];
                document.getElementById('neighborhood-info').innerText = `Location: ${location.name}, ${location.countryName}`;
                localStorage.setItem('lastSearch', JSON.stringify(location));
                showModal(`Location: ${location.name}, ${location.countryName}`);
            } else {
                document.getElementById('neighborhood-info').innerText = 'No detailed location found for these coordinates.';
                showModal('No detailed location found for these coordinates.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('neighborhood-info').innerText = 'An error occurred. Please try again.';
            showModal('An error occurred. Please try again.');
        });
});

function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `<p>${content}</p>`;
    modal.style.display = "block";

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}