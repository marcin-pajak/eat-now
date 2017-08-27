import * as actions from '../actions/actions.js';
import Order from '../components/Order.js';

const OrderContainer = (dispatch, store) => {

  // Dispatch change of order
  function delegateOrderClick (event) {
    const { target } = event;
    const { id } = target && target.dataset;
    if (!id) return;
    dispatch(actions.setOrder(id));
  }

  setTimeout(() => {
    const orderNode = document.getElementById('js-order');
    orderNode.addEventListener("click", delegateOrderClick);
  }, 0);

  const currentOrder = store.order;
  return Order(currentOrder);
};

export default OrderContainer;
