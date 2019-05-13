
import {localStorageKeyPurch, jsonPurch, setLocalStorageObjectItem} from './localStorage';
import {showMessage} from './showPurchase';
import {createParagraph, makeAbleBtn} from './additionalFunctions';
import {validDate, validCurrency, validAmount} from './vaidationFunctions';
import {purchButtons} from './purchaseBtn';

let purchaseList = JSON.parse(jsonPurch) || [];
const wrapper = document.getElementById('list-wrapper');

const NewUserPurchase = function() {
	return {
		date: this.dateP,
		items: [{
			amount: this.amountP,
			currency: this.currencyP,
			productName: this.productP
		}]
	}
}

function createPurchase(data) {
	data = document.getElementById('add').value;
	const dataArr = data.split(' ');
	if(data.length !== 0) {
		document.getElementById('add').value = '';
		const validationObject = {
			date: undefined,
			currency: undefined,
			amount: undefined,
			'product name': ''
		}
		dataArr.forEach(el => {
			if (validDate(el) && el.split('-').length === 3) {
				validationObject.date = el;
			} else if (validCurrency(el)) {
				validationObject.currency = el;
			} else if (validAmount(el)){
				validationObject.amount = el;
			} else {
				validationObject['product name'] += ` ${el}`;
			}
		});
		if(validationObject.date === undefined || validationObject.currency === undefined || validationObject.amount === undefined || validationObject['product name'] === '') {
			let undefinedReason = [];
			let undefinedMessage;
			for (let key in validationObject) {
				if(!validationObject[key]) {
					undefinedReason.push(key);
				}
			}
			switch(undefinedReason.length) {
				case 1:
					undefinedMessage = undefinedReason[0];
					break;
				case 2:
					undefinedMessage = undefinedReason.join(' and ');
					break;
				case 3:
					undefinedMessage = undefinedReason[0] + ', ' + undefinedReason[1] + ' and ' + undefinedReason[2];
          break;
        default:
          undefinedMessage = '';
			}
			createParagraph('error-message', `Please check ${undefinedMessage}`, wrapper);
		} else {
			const purchObject = {
				dateP: '' + validationObject.date,
				amountP: '' + validationObject.amount,
				currencyP: '' + validationObject.currency,
				productP: '' + validationObject['product name']
			}
			
			if (purchaseList.some(el => el.date === purchObject.dateP)) {
				for(let i = 0; i < purchaseList.length; i++) {
					if(purchObject.dateP === purchaseList[i].date) {
						purchaseList[i].items.push({
							amount: purchObject.amountP,
							currency: purchObject.currencyP,
							productName: purchObject.productP
						})
					}
				}
				makeAbleBtn(purchButtons());
				setLocalStorageObjectItem(purchaseList, localStorageKeyPurch);
				showMessage();
			} else {
				purchaseList.push(NewUserPurchase.call(purchObject));
				setLocalStorageObjectItem(purchaseList, localStorageKeyPurch);
				makeAbleBtn(purchButtons());
				showMessage();
			}
	} 
} else {
	createParagraph('empty-input', 'Please enter string in format "YYYY-MM-DD 0 USD Product"', wrapper);
}
}

export {purchaseList, NewUserPurchase, createPurchase, wrapper};