import * as orders from '../constants/orders.js';

/**
 * Return coords or near query
 * @param location
 * @returns {string}
 */
export const locationToQuery = (location) => {
  if (location && location.coords) {
    const {coords} = location;
    return `&ll=${coords.latitude},${coords.longitude}&llAcc=${coords.accuracy}`;
  } else {
    return `&near=${location.city}`
  }
};

export const orderToQuery = (order) => {
  return `&sortByDistance=${order === orders.DISTANCE ? '1' : '0'}`;
}