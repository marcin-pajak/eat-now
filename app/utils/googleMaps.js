const GOOGLE_API = "https://www.google.com/maps/dir";

/**
 * Create a link for direction tips
 * @param location
 * @returns {string}
 */
export const createGoogleLink = (location) => {
  return `${GOOGLE_API}/current+location/${location.lat},${location.lng}`;
};