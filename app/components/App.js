import Header from './Header.js';
import Results from './Results.js';
import FiltersContainer from '../containers/FiltersContainer.js';
import OrderContainer from '../containers/OrderContainer.js';

const App = ({isFetching, header, location, locations, error}, dispatch, store) => {
  if (!location) return (`
    ${Header(header, null, dispatch)}
  `);
  return (`
    ${Header(header, location, dispatch)}
    <a href="#results" class="Skipping">Skip filters and go to restaurants list</a>
    <div class="Grid Grid--withGutter">
      <div class="Grid-cell Cell-2of7">
        ${FiltersContainer(dispatch, store)}
        ${OrderContainer(dispatch, store)}
      </div>
      <div class="Grid-cell Cell-5of7">
        ${Results({isFetching, location, locations, error})}
      </div>
    </div>
  `);
};

export default App;