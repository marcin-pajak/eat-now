import {API_DATE, API_ROOT, CLIENT_ID, CLIENT_SECRET} from '../constants/api.js';
import { locationToQuery, orderToQuery } from '../utils/queryBuilder.js';
import * as types from '../constants/types.js';

/**
 * Init in manual location mode
 * Means browsers did not return user's geolocation
 */
export const startWithoutLocation = () => ({
  type: types.START_WITHOUT_LOCATION
});

/**
 * Set order filter
 * @param payload
 */
export const setOrder = (payload) => ({
  type: types.SET_ORDER,
  payload
});

/**
 * Set price range filter
 * @param payload
 */
export const setPriceFilter = (payload) => ({
  type: types.SET_FILTER_PRICE,
  payload
});

/**
 * Set location received from the browser
 * @param payload
 */
export const setLocation = (payload) => ({
  type: types.LOCATION_RECEIVED,
  payload
});

/**
 * Set location received from the input
 * Entered by user
 * @param event
 */
export const setManualLocation = (event) => ({
  type: types.SET_MANUAL_LOCATION,
  payload: {city: event.target.value}
});

/**
 * Foursqare API call success callback
 * @param dispatch
 * @param data
 * @private
 */
const _onFetchSuccess = (dispatch, data) => {
  const { response } = data;
  const { meta } = data;
  const group = response && response.groups && response.groups[0];
  const locations =  group && group.items || [];

  if (meta && meta.errorDetail) {
    return _onFetchError(dispatch, meta.errorDetail);
  }

  dispatch({
    type: types.DATA_RECEIVED,
    header: response && response.headerLocation,
    locations: locations
  })

};

/**
 * Foursqare API call fail callback
 * @param dispatch
 * @param error
 * @private
 */
const _onFetchError = (dispatch, error) => {
  dispatch({
    type: types.DATA_FETCH_FAIL,
    error
  });
};

/**
 * Fetch data from Foursquare API
 * @param dispatch
 * @param state
 */
export const fetchData = (dispatch, state) => {

  // Set loader
  dispatch({
    type: types.DATA_FETCH_STARTED
  });

  //- Get data
  return fetch(`
    ${API_ROOT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${API_DATE}&openNow=1&venuePhotos=1&section=food&price=${state.filter}${orderToQuery(state.order)}${locationToQuery(state.location)}
  `)
    .then(response => response.json())
    .then(
      response => _onFetchSuccess(dispatch, response),
      error => _onFetchError(dispatch, error))
    .catch(error => _onFetchError(dispatch, error));
};


