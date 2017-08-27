# eat-now
Foursquare API client in pure JavaScript

App shows open restaurants near by, so a user can have a proper meal wherever they are right now. It asks for geolocation and if the user doesn’t allow it or their browser doesn’t support it then app allows to type a city they are currently in.

## Start app locally
To run it locally, please run:
- `npm install`
- `npm start`

It uses `serve` package to run a static server that serves html, css and js files.
Server works on port 5000, so go to:
http://localhost:5000/

## Unit Tests
To run unit tests locally, simpy run:
- `npm test`

## Browsers support 
Please note, that app uses imports from ES6 to split code for modules and it’s not enabled yet in the browsers by default. To enable it, set a proper flag:
- Chrome 60 – the Experimental Web Platform flag in `chrome:flags`. 
- Firefox 54 – the dom.moduleScripts.enabled setting in `about:config`
