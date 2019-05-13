import {localStorageKeyPurch, setLocalStorageObjectItem} from './localStorage';
import {createParagraph} from './additionalFunctions';
import {showAll} from './showPurchase';
import {purchaseList, wrapper} from './createPurchase';
import{validDate} from './vaidationFunctions';

function clear(data) {
	if (purchaseList.length > 0) {
		data = document.getElementById('clear').value;
		document.getElementById('clear').value = '';
		if(data.length !== 0 && validDate(data) && data.split('-').length === 3) {
			if(purchaseList.every(el => new Date(el.date).getTime() !== new Date(data).getTime())) {
				createParagraph('error-message', 'There is no any purchaise for this date', wrapper);
			} else {
				for(let i = 0; i < purchaseList.length; i++) {
					if(new Date(purchaseList[i].date).getTime() === new Date(data).getTime()) {
						purchaseList.splice(i, 1);
						setLocalStorageObjectItem(purchaseList, localStorageKeyPurch);
						showAll();
					}
				}
			}
		} else {
			createParagraph('empty-input', 'Please enter string in format "YYYY-MM-DD"', wrapper);
		}
	} else {
		showAll();
	}
}

function clearAllPurchase() {
	if(purchaseList.length > 0) {
		//eslint-disable-next-line
		const approve = confirm('Do you really want to delete all purchases list?');
		if(approve) {
			purchaseList.splice(0, purchaseList.length);
			setLocalStorageObjectItem(purchaseList, localStorageKeyPurch);
			createParagraph('deleted-message', 'Purchase list is fully deleted', wrapper);
		}
	} else {
		showAll();
	}
}

export {clear, clearAllPurchase}