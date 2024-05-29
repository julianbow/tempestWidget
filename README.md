# Tempest Map Widget
A Tempest map widget that displays temperature, wind, pressure, and humidity data for a specific lat and lon.

## Configuring the widget locally
First clone this repo and then run `npm install` to install the dependencies.

## Add Config file
In the root folder add a file called `config.json` and add your access token to the following format:
```
{
    wftoken: "YOUR_ACCESS_TOKEN"
}
```
## Start the server
From the root folder run `npm start` to start the server.

## How to view the widget
I have a simple html file (index.html) that has an embedded iframe with a sample request. Test out changing the lat / lon and other params.