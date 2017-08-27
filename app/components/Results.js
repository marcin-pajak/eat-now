import Venues from './Venues.js';

const errorPartial = (error) => (`
  <div class="Empty">${error}</div>
`);

const loadingPartial = () => (`
  <div class="Empty">
    <div class="Spinner">Loading...</div>
  </div>
`);

const Results = ({isFetching, location, locations, error}) => (`
  <div class="Results" id="results">
    <h3 class="Subtitle">Results:</h3>
    ${isFetching ? loadingPartial() : error ? errorPartial(error) : Venues({location, locations})}
  </div>
`);

export default Results;