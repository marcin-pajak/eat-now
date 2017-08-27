import * as filters from '../constants/filters.js';
import * as orders from '../constants/orders.js';
import * as types from '../constants/types.js';
import * as actions from '../actions/actions.js';

/**
 * Empty init state
 * @type {{location: null, locations: Array, header: string, order, filter, isFetching: boolean}}
 */
const storeInit = {
  location: null,
  locations: [],
  header: '',
  order: orders.DISTANCE,
  filter: filters.VERY_EXPESIVE,
  isFetching: false
};

/**
 * Format the reducers result for app dispatcher
 * @param newState
 * @param noRerender
 * @param postAction
 * @returns {{newState: *, noRerender: *, postAction: *}}
 */
const output = (newState, noRerender, postAction) => {
  return {
    newState,
    noRerender,
    postAction
  }
};

/**
 * Handle all actions possible in app
 * @param state
 * @param action
 * @returns {{newState: *, noRerender: *, postAction: *}}
 * @constructor
 */
const AppReducer = (state = storeInit, action) => {
  switch (action.type) {

    case types.DATA_FETCH_STARTED:
      return output({
        ...state,
        isFetching: true
      }, false);

    case types.SET_ORDER:
      return output({
        ...state,
        order: action.payload
      }, false, actions.fetchData);

    case types.SET_FILTER_PRICE:
      return output({
        ...state,
        filter: action.payload
      }, false, actions.fetchData);

    case types.LOCATION_RECEIVED:
      return output({
        ...state,
        location: action.payload
      }, true, actions.fetchData);

    case types.SET_MANUAL_LOCATION:
      return output({
        ...state,
        location: action.payload
      }, true, actions.fetchData);

    case types.DATA_RECEIVED:
      return output({
        ...state,
        isFetching: false,
        error: null,
        header: state.location.city ? null : action.header,
        locations: action.locations
      }, false);

    case types.DATA_FETCH_FAIL:
      return output({
        ...state,
        isFetching: false,
        error: action.error
      }, false);

    case types.START_WITHOUT_LOCATION:
      return output(state, false);

    default:
      return output(state, true);
  }
};

export default AppReducer;