import * as filters from '../constants/filters.js';
import ButtonLink from './ButtonLink.js';

const FilterLink = (current, off, text) => (`
  <span class="Price">
    <strong class="Price-current">${current}</strong><span class="Price-off">${off}</span>
  </span> ${text}
`);

const Filters = (currentFilter) =>  (`
  <div class="Filter">
    <h3 class="Subtitle">Price:</h3>
    <ul class="List" id="js-prices">
      <li>
        ${ButtonLink({
          isActive: currentFilter === filters.CHEAP,
          id: filters.CHEAP,
          children: FilterLink('$', '$$$', 'Cheap only')
        })}
      </li>
      <li>
        ${ButtonLink({
          isActive: currentFilter === filters.MODERATE,
          id: filters.MODERATE,
          children: FilterLink('$$', '$$', 'Up to moderate')
        })}
      </li>
      <li>
        ${ButtonLink({
          isActive: currentFilter === filters.EXPESIVE,
          id: filters.EXPESIVE,
          children: FilterLink('$$$', '$', 'Up to expensive')
        })}
      </li>
      <li>
        ${ButtonLink({
          isActive: currentFilter === filters.VERY_EXPESIVE,
          id: filters.VERY_EXPESIVE,
          children: FilterLink('$$$$', '', 'Show all')
        })}
      </li>
    </ul>
  </div>
`);

export default Filters;