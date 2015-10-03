## NC Riot Hackathon Frontend Template

This template is meant to help you get started with creating a way to view your
sensor data.

### Setup

- Clone or download this repository.
- Download the [Allow-Control-Allow-Origin* plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) for Chrome. Delete the default matcher and add this one: `*://localhost*`.
- In `index.html`, replace the `USERNAME_HERE` and `PASSWORD_HERE` strings
- Use the `get_sensor` function to retrieve information from your sensor. If you have multuple sensors, you can add an index parameter to specify which one to do (i.e. `get_sensor(callback, index)`).

### Setting up a simple HTTP Server

You will need to set up a simple HTTP server in order to run this code. To do so:

- Install Python from `http://www.python.org`
- Using the command prompt (Windows) or terminal (Mac), navigate to the folder your code is in and run the command `python -m SimpleHTTPServer 8000`.
- Browse to `http://localhost:8000`. You should see the `index.html` of this repository.
