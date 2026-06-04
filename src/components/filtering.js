import { createComparison, defaultRules } from '../lib/compare.js';

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((indexName) => {
    if (indexName === 'sellers') {
        const options = Object.values(indexes[indexName]).map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
        });

        const searchBySellerElement = elements.searchBySeller;
        options.forEach(option => searchBySellerElement.appendChild(option));
    }
  });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля

    if (action && action.name ==='clear') {
        action.parentElement.querySelector('input').value = '';
        state[action.dataset.field] = '';
    }
    
    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter(row => compare(row, {
        ...state,
        total: [state.totalFrom, state.totalTo],
      }));
  };
}
