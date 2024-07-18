# Group-Project-1

Seismic Locator

Description

Seismic Locator is an interactive front-end application designed to provide users with real-time information on recent earthquake activity. The application utilizes data from multiple server-side APIs to display the most recent earthquakes and detailed location information based on user input. This tool is especially useful for individuals living in or traveling to earthquake-prone areas, helping them stay informed about seismic activity.

Motivation

The primary motivation behind the development of Seismic Locator was to create an application that provides valuable, real-time data to users in a simple and interactive manner. By leveraging server-side APIs and presenting the data through a polished and responsive UI, Seismic Locator aims to enhance user awareness and preparedness for seismic events.

Features

	•	Real-Time Earthquake Data: Fetches and displays the top 10 most recent earthquakes with a magnitude of 2.0 or higher.
	•	Location Information: Provides detailed location information based on selected earthquake coordinates.
	•	Recent Searches: Stores and displays the user’s recent searches using client-side storage for easy access to previous queries.
	•	Interactive UI: Responsive design with interactive elements such as buttons, forms, and modals.
	•	Modal Display: Uses modals to present detailed information without relying on native browser alerts, confirms, or prompts.

Technologies Used

	•	HTML5
	•	CSS3 (Tailwind CSS)
	•	JavaScript (ES6)
	•	Server-Side APIs:
	•	USGS Earthquake API
	•	GeoNames API (with proxy for CORS handling)
	•	Client-Side Storage: Local Storage

Usage

	1.	Open the application.
	2.	Click the “Find Earthquakes” button to fetch and display the most recent earthquakes.
	3.	Select an earthquake from the dropdown list to view its coordinates.
	4.	Submit the coordinates to get detailed location information.
	5.	View recent searches at the bottom of the page.

Folder Structure :

Group-Project-1/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── index.html
└── README.md

SCREENSHOT

Future Development

	•	Additional Filters: Add options for users to filter earthquakes by date, magnitude, or region.
	•	Enhanced Mapping: Integrate a mapping service to visually plot earthquake locations.
	•	Notifications: Implement a notification system to alert users of significant seismic events.

Links

	•	Deployed Application URL - https://jimil555.github.io/Group-Project-1/
	•	GitHub Repository - https://github.com/JimiL555/Group-Project-1.git

Contributors

	•	Jimi Liapis - Developer
        Josh Levy -   Developer
        Daniel Soto - Developer
        Anu         - Developer
	•	

License

This project is licensed under the MIT License.