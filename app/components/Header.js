import { setManualLocation } from '../actions/actions.js';

const inputPartial = (location) => (`
  <input 
    class="Header-input" 
    type="text" 
    id="js-location" 
    placeholder="type your city"
    value="${location && location.city ? location.city : ''}" />
  `);

function HeaderDidMount (dispatch) {
  function onLocChange (event) {
    dispatch(setManualLocation(event));
  }
  setTimeout(() => {
    const inputNode = document.getElementById('js-location');
    if (inputNode) inputNode.onchange=onLocChange;
  },0);
  return '';
}

const Header = (header, location, dispatch) => {
  if (header) {
    return `<div><h1>Where can I eat now in ${header}?</h1></div>`;
  }
  return (`
    <div class="Header">
      <h1 class="Header-item">Where can I eat now</h1>
      <span class="Header-item">in</span>
      ${location && location.coords ? '<span class="Header-item">loading...</span>' : inputPartial(location)}
    </div>
    ${HeaderDidMount(dispatch)}
  `);
};

export default Header;