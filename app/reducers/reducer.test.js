import reducer from './reducer'
import * as types from '../constants/types';
import * as orders from '../constants/orders';
import * as filters from '../constants/filters';
import * as actions from '../actions/actions';

const output = (newState, noRerender, postAction) => {
  return {
    newState,
    noRerender,
    postAction
  }
};

const stateInit = {
  location: null,
  locations: [],
  header: '',
  order: orders.DISTANCE,
  filter: filters.VERY_EXPESIVE,
  isFetching: false
};

describe('app reducer', () => {

  it('should return the initial state without rendering', () => {
    expect(reducer(undefined, {})).toEqual(output(stateInit, true))
  });

  it('should return the initial state with rendering', () => {
    expect(reducer(undefined, {type: types.START_WITHOUT_LOCATION})).toEqual(output(stateInit, false))
  });

  it('should handle DATA_FETCH_FAIL', () => {
    const storeData = Object.assign({}, stateInit, {
      error: "Error message"
    });
    expect(reducer(undefined, {
      type: types.DATA_FETCH_FAIL,
      error: "Error message"
    })).toEqual(output(storeData, false))
  });

  it('should handle SET_MANUAL_LOCATION', () => {
    const storeData = Object.assign({}, stateInit, {
      location: {city: "Krakow"}
    });
    expect(reducer(undefined, {
      type: types.SET_MANUAL_LOCATION,
      payload: {city: "Krakow"}
    })).toEqual(output(storeData, true, actions.fetchData))
  });

  it('should handle LOCATION_RECEIVED', () => {
    const storeData = Object.assign({}, stateInit, {
      location: {coords: {latitude: 21, longitude: 12}}
    });
    expect(reducer(undefined, {
      type: types.LOCATION_RECEIVED,
      payload: {coords: {latitude: 21, longitude: 12}}
    })).toEqual(output(storeData, true, actions.fetchData))
  });

  it('should handle SET_ORDER', () => {
    const storeData = Object.assign({}, stateInit, {
      order: orders.RELEVANCE
    });
    expect(reducer(undefined, {
      type: types.SET_ORDER,
      payload: orders.RELEVANCE
    })).toEqual(output(storeData, false, actions.fetchData))
  });

  it('should handle SET_FILTER_PRICE', () => {
    const storeData = Object.assign({}, stateInit, {
      filter: filters.MODERATE
    });
    expect(reducer(undefined, {
      type: types.SET_FILTER_PRICE,
      payload: filters.MODERATE
    })).toEqual(output(storeData, false, actions.fetchData))
  });

  it('should handle SET_FILTER_PRICE', () => {
    const storeData = Object.assign({}, stateInit, {
      isFetching: true
    });
    expect(reducer(undefined, {
      type: types.DATA_FETCH_STARTED
    })).toEqual(output(storeData, false))
  });

  it('should handle DATA_RECEIVED', () => {
    const stateBefore = Object.assign({}, stateInit, {
      location: {coords: {latitude: 21, longitude: 12}}
    });
    const stateAfter= Object.assign({}, stateBefore, {
      header: "Krakowek",
      locations: [{"id": "Restaurant1"}],
      error: null
    });
    expect(reducer(stateBefore, {
      type: types.DATA_RECEIVED,
      header: "Krakowek",
      locations: [{"id": "Restaurant1"}]
    })).toEqual(output(stateAfter, false))
  });
});