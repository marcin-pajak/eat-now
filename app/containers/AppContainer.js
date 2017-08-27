import App from '../components/App.js';

const AppContainer = (dispatch, store) => {
  const props = {
    isFetching: store.isFetching,
    header: store.header,
    location: store.location,
    locations: store.locations,
    error: store.error
  };
  return App(props, dispatch, store);
};

export default AppContainer;