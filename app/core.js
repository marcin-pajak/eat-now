import AppContainer from './containers/AppContainer.js';

/**
 * Render generated template in a DOM element
 * @param template
 * @param element
 */
export const render = (template, element) => {
  element.innerHTML = template;
};

/**
 * Render the whole app
 * @param template
 */
export const renderAll = (template) => {
  const root = document.getElementById('app');
  return render (template, root);
};

/**
 * Bootstrap application
 * Takes reducer that reacts to all interactions in the app and returns the new state
 * To simplify solution there is some logic to allow post actions and to allow avoiding re-rendering
 * @param reducer
 * @returns {{getState: (function()), dispatch: (function(*=))}}
 */
const createStore = (reducer) => {
  let state = undefined;

  //- Get current state
  const getState = () => {
    return state;
  };

  //- Handle action
  const dispatch = (action) => {
    const actionResult = reducer(state, action);
    const {newState, noRerender, postAction} = actionResult;
    state = newState;

    if (!noRerender) {
      renderAll(
        AppContainer(dispatch, state)
      )
    }

    if (postAction && typeof postAction === 'function') {
      postAction(dispatch, state)
    }
  };

  //- Dispatch empty action, to get an initial version of reducers state
  dispatch({type: null});

  return {
    getState,
    dispatch
  }
};

export default createStore;