import { createGoogleLink } from '../utils/googleMaps.js';
const VENUE_PHOTO_SIZE = "180x135";

const _renderVenuePhoto = (photos, name) => {
  if (photos.count) {
    const group = photos && photos.groups[0];
    const photo = group && group.items[0];
    return photo ? `<img class="Media-photo Venue-photo" src="${photo.prefix}${VENUE_PHOTO_SIZE}${photo.suffix}" alt="${name}" />` : `No photo`
  } else {
    return `No photo`
  }
};

const _renderRating = (rating) => {
  if (!rating) return '';
  return `<li class="Details-descItem">Rating: <span class="u-color--primary">${rating}</span></li>`
};

const _renderPrice = (price) => {
  if (!price || !price.message) return '';
  return `<li class="Details-descItem">Price: <span class="u-color--primary" itemprop="priceRange">${price.message}</span></li>`;
};

const _renderAddress = (location) => {
  if (!location || !location.address) return '';
  return `<p class="Venue-address">Address: <span class="u-color--primary">${location.address}</span></p>`
};

const _renderDirections = (location) => {
  if (!location) return '';
  return `
    <li class="Details-descItem">
      <a href="${createGoogleLink(location)}" target="_blank" rel="nofollow">Get directions</a>
    </li>
  `
};

const _renderWebsite = (url) => {
  if (!url) return '';
  return `
    <li class="Details-descItem">
      <a href="${url}" target="_blank" rel="nofollow" itemprop="url">Visit website</a>
    </li>
  `
};

const Venue = ({venue, category}) => (`
  <li class="Venues-item">
    <div class="Venue" itemscope itemtype="http://schema.org/Restaurant">
      <h3 class="Venue-name" itemprop="name">${venue.name}</h3>
      <div class="Media">
        <div class="Media-object">
          <div class="Venue-photoContainer">
            ${_renderVenuePhoto(venue.photos, venue.name)}
          </div>
        </div>
        <div class="Media-content">
          <p class="Venue-category">
            <span class="Venue-icon"><img class="Venue-iconPhoto" src="${category.icon.prefix}32${category.icon.suffix}" alt="${category.name}" title="${category.name}" /></span>
            <span class="Venue-categoryName" itemprop="servesCuisine">${category.name}</span>
          </p>
          <ul class="Details-desc">
            ${_renderRating(venue.rating)}
            ${_renderPrice(venue.price)}
          </ul>
          <p class="Venue-hours">${venue.hours ? venue.hours.status : ''}</p>
          ${_renderAddress(venue.location)}
           <ul class="Details-desc">
             ${_renderDirections(venue.location)}
             ${_renderWebsite(venue.url)}
          </ul>
        </div>
      </div>
    </div>
  </li>
`);

export default Venue;