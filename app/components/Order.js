import * as orders from '../constants/orders.js';
import ButtonLink from './ButtonLink.js';

const Order = (currentOrder) => (`
  <div class="Filter">
    <h3 class="Subtitle">Order by:</h3>
    <ul class="List" id="js-order">
      <li>
        ${ButtonLink({
          isActive: currentOrder === orders.DISTANCE, 
          id: orders.DISTANCE, 
          children: 'Distance'
        })}
      </li>
      <li>
        ${ButtonLink({
          isActive: currentOrder === orders.RELEVANCE,
          id: orders.RELEVANCE,
          children: 'Relevance'
        })}
      </li>
    </ul>
  </div>
`);

export default Order;