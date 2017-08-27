import * as actions from '../actions/actions.js';
import Filters from '../components/Filters.js';

const FiltersContainer = (dispatch, store) => {

  // Dispatch change of filter
  function delegatePriceClick (event) {
    const { target } = event;
    const { id } = target && target.dataset;
    if (!id) return;
    dispatch(actions.setPriceFilter(id));
  }

  setTimeout(() => {
    const pricesNode = document.getElementById('js-prices');
    pricesNode.addEventListener("click", delegatePriceClick);
  }, 0);

  const currentFilter = store.filter;
  return Filters(currentFilter);
};

export default FiltersContainer;