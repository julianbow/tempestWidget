Tempest Map Widget
Overview
WidgetMap is a weather mapping application that displays various weather parameters such as wind, pressure, temperature, and humidity on a Google Map. The application is built with Node.js for the backend and jQuery for the client-side interactivity.

Project Structure
arduino
Copy code
WidgetMap/
│
├── public/
│   ├── css/
│   │   └── index.css
│   ├── images/
│   │   └── tempest-logo.svg
│   ├── js/
│   │   └── widget.js
│   └── index.html
│
├── config.json
├── index.js
├── Map.js
└── README.md
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/WidgetMap.git
cd WidgetMap
Install the dependencies:

bash
Copy code
npm install
Configuration:

Create a config.json file in the root directory with the following structure:

json
Copy code
{
    "wftoken": "YOUR_WF_TOKEN"
}
Run the server:

bash
Copy code
node index.js
Access the application:

Open your browser and navigate to http://127.0.0.1:5502/tempestMap.

Project Files
index.js
This is the main server file. It sets up an Express server to serve static files and handle API requests.

Map.js
This file contains the Map class, which is responsible for generating the HTML content for the map widget.

public/js/widget.js
This file contains the MapController class, which manages the interactivity and display of the map and its various weather parameters.

public/index.html
The main HTML file that loads the necessary scripts and styles for the application.

public/css/index.css
The main CSS file for styling the application.

config.json
Contains the configuration settings such as the WeatherFlow API token.

Key Features
Dynamic Map Display: Displays a Google Map with various weather parameters.
Interactive Menu: Users can toggle between different weather parameters such as wind, pressure, temperature, and humidity.
Customizable Settings: Parameters such as map center, zoom level, and units can be customized.
Server-Side Rendering: Uses Node.js and Express to serve the map and handle API requests.
Usage
Set Widget Parameters:

The widget parameters such as width, height, center, zoom, unitsWind, unitsTemp, unitsPressure, and username are set in the HTML response from index.js.

Accessing Widget Parameters:

These parameters are accessed in widget.js through window.widgetParams.

WeatherFlow Token:

The WeatherFlow token is included in the HTML response from index.js and accessed in widget.js through window.config.wftoken.

Development
To contribute to this project:

Fork the repository.

Create a new branch:

bash
Copy code
git checkout -b feature-branch
Make your changes and commit them:

bash
Copy code
git commit -m "Description of changes"
Push to the branch:

bash
Copy code
git push origin feature-branch
Create a pull request.