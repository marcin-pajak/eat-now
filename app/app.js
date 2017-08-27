import AppReducer from './reducers/reducer.js';
import createStore from './core.js';
import * as actions from './actions/actions.js';

/**
 * Bootstrap apps core
 * @type {{getState: (()), dispatch: (())}}
 */
const store = createStore(AppReducer);

/**
 * Browser did not return geolocation
 * @private
 */
const _geolocationFail = () => {
  store.dispatch(actions.startWithoutLocation());
};

/**
 * Browser did return geolocation
 * @param geolocation
 * @private
 */
const _geolocationSuccess = (geolocation) => {
  store.dispatch(actions.setLocation(geolocation));
};

/**
 * Wait for geolocation result if browser supports it or init in manual mode
 * @constructor
 */
const Init = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      _geolocationSuccess,
      _geolocationFail
    );
  } else {
    _geolocationFail();
  }
};

export default Init;