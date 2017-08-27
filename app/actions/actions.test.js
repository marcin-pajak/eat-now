import createStore from '../core.js';
import AppReducer from '../reducers/reducer.js';
import * as types from '../constants/types';
import * as orders from '../constants/orders';
import * as filters from '../constants/filters';
import * as actions from './actions';
import { mockResolve, mockReject } from '../utils/testsHelper';

const store = createStore(AppReducer);
const state = {
  location: {city: "Krakow"},
  locations: [],
  header: '',
  order: orders.DISTANCE,
  filter: filters.VERY_EXPESIVE,
  isFetching: false
};

describe('actions', () => {

  it('should create an action to start in manual location mode', () => {
    const expectedAction = {
      type: types.START_WITHOUT_LOCATION
    };
    expect(actions.startWithoutLocation()).toEqual(expectedAction)
  });

  it('should create an action to set price filter', () => {
    const payload = filters.EXPESIVE;
    const expectedAction = {
      type: types.SET_FILTER_PRICE,
      payload
    };
    expect(actions.setPriceFilter(payload)).toEqual(expectedAction)
  });

  it('should create an action to set order filter', () => {
    const payload = orders.RELEVANCE;
    const expectedAction = {
      type: types.SET_ORDER,
      payload
    };
    expect(actions.setOrder(payload)).toEqual(expectedAction)
  });

  it('should create an action to set location', () => {
    const payload = {coords: {latitude: 21, longitude: 12}};
    const expectedAction = {
      type: types.LOCATION_RECEIVED,
      payload
    };
    expect(actions.setLocation(payload)).toEqual(expectedAction)
  });

  describe('async actions', () => {
    it('should create fetching actions', () => {
      // Given
      const dispatch = jest.fn().mockImplementation((action) => action.type);
      const response = `{
        "response": {
          "headerLocation": "Krakowek",
          "groups": [{
              "items": [
                {"id": "Restaurant1"}
              ]
            }]
          }
        }`;
      const expectedAction = {type: types.DATA_RECEIVED, header: "Krakowek", locations: [{"id": "Restaurant1"}]};
      global.fetch = mockResolve(response);

      // When
      return actions.fetchData(dispatch, state)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenLastCalledWith(expectedAction)
        });
    });

    it('should create fetching error actions', () => {
      const dispatch = jest.fn().mockImplementation((action) => action.type);
      const expectedAction = {type: types.DATA_FETCH_FAIL, error: "Some error"};
      const response = `{
        "meta": {
          "errorDetail": "Some error"
        }
      }`;
      global.fetch = mockReject(response);


      return actions.fetchData(dispatch, state)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenLastCalledWith(expectedAction)
        });
    });

  });
});