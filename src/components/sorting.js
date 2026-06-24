import { sortMap } from '../lib/sort.js';

export function initSorting(columns) {
  return (query, state, action) => {


    if (action?.name !== 'sort') {
      return query;
    }

    action.dataset.value = sortMap[action.dataset.value];
    const field = action.dataset.field;
    const order = action.dataset.value;

    const sort = (field && order !== 'none') ? `${field}:${order}` : null;
    
    

    columns.forEach((column) => {
      if (column.dataset.field !== action.dataset.field) {
        column.dataset.value = 'none';
      }
    });


    return sort ? Object.assign({}, query, {sort}) : query;
 
  };
}
