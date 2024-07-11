document.getElementById('search-btn').addEventListener('click', function() {
    const postalCode = document.getElementById('postalcode').value;
    localStorage.setItem('lastSearchedPostalCode', postalCode); // Store the postal code
    const apiUrl = `http://api.geonames.org/postalCodeSearch?postalcode=${postalCode}&maxRows=10&username=jimiliapis`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const codes = xmlDoc.getElementsByTagName("code");
            displayResults(codes);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    const lastSearchedPostalCode = localStorage.getItem('lastSearchedPostalCode');
    if (lastSearchedPostalCode) {
        document.getElementById('postalcode').value = lastSearchedPostalCode;
    }
});

function displayResults(codes) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.innerHTML = ''; // Clear previous results

    if (codes.length === 0) {
        resultsSection.innerHTML = '<p>No results found.</p>';
        return;
    }

    for (let i = 0; i < codes.length; i++) {
        const postalcode = codes[i].getElementsByTagName("postalcode")[0].textContent;
        const name = codes[i].getElementsByTagName("name")[0].textContent;
        const countryCode = codes[i].getElementsByTagName("countryCode")[0].textContent;
        const adminName1 = codes[i].getElementsByTagName("adminName1")[0].textContent;
        const adminName2 = codes[i].getElementsByTagName("adminName2")[0].textContent;

        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        resultDiv.innerHTML = `
            <p><strong>Postal Code:</strong> ${postalcode}</p>
            <p><strong>Place Name:</strong> ${name}</p>
            <p><strong>Country Code:</strong> ${countryCode}</p>
            <p><strong>Admin Name 1:</strong> ${adminName1}</p>
            <p><strong>Admin Name 2:</strong> ${adminName2}</p>
        `;

        resultsSection.appendChild(resultDiv);
    }
}