import Venue from './Venue.js';

const Venues = ({location, locations}) => {
  if (location && !locations.length) {
    return `<div class="Empty">There are no open places right now.</div>`
  }
  return `
    <ul class="List Venues-items">
      ${_renderLocations(locations)}
    </ul>
  `
};

export default Venues;

const _renderLocations = (locations) => {
  return locations.reduce((template, location) => {
    const { venue } = location;
    const { icon, name } = venue.categories[0];
    return template += Venue({venue, category: {icon, name}})
  }, "");
};
