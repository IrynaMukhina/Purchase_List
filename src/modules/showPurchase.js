
import {clearContainer, sortArray, createParagraph, makeDisableBtn} from './additionalFunctions';
import {purchaseList, wrapper} from './createPurchase';
import {purchButtons} from './purchaseBtn';

function showAll() {
  if (purchaseList.length > 0) {
    showMessage();
  } else {
    showEmptyMessage();
  }
}
  
function showMessage() {
  sortArray(purchaseList);
  clearContainer(wrapper);
  purchaseList.forEach(el => {
    let purch = document.createElement('li');
    purch.className = 'purchase-list-el';
    let dateText = document.createElement('p');
    dateText.className = 'purchase-date';
    dateText.innerHTML = `${el.date}`;
    wrapper.appendChild(purch);
    purch.appendChild(dateText);
    el.items.map(el => {
      let itemText = document.createElement('p');
      itemText.className = 'purchase-item';
      itemText.innerHTML = `${el.productName} ${el.amount} ${el.currency}`;
      
      return purch.appendChild(itemText);
    });
  });
}

function showEmptyMessage() {
  createParagraph('empty-message', 'Purchase list is empty. Please add purchase to the list', wrapper);
  makeDisableBtn(purchButtons());
}

export {showAll, showMessage, showEmptyMessage}