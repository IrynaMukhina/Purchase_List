
import $ from "jquery";
import {createParagraph} from './additionalFunctions';
import {showAll} from './showPurchase';
import{validDate} from './vaidationFunctions';
import {purchaseList, wrapper} from './createPurchase';

const receiveRate = function(curr) {
	const url = 'http://data.fixer.io/api/latest?access_key=c2cb5609f200c8bff6e7bb47db4dbf5d&symbols=' + curr;
	
	$.ajaxSetup({
		async: false
	});
	let rate;
	$.getJSON(url, function(data) {
		for(let key in data.rates) {
			rate = data.rates[key];
		}
	})
	
	return rate;
};

function reportTotalYear(data) {
	if (purchaseList.length > 0) {
		data = document.getElementById('report').value;
		document.getElementById('report').value = '';
		const dataArr = data.split(' ');
		if(data.length !== 0 && dataArr.length === 2) {
			const year = dataArr[0];
			const currency = dataArr[1];
			let yearEl = purchaseList.filter(el => {
				return el.date.split('-')[0] === year;
			});
			if (yearEl.length > 0) {
				let totalInEuro = yearEl.reduce((sum, el) => {
				
					return sum + el.items.reduce((sum, el) => {
						let elRate = receiveRate(el.currency);
	
						return sum + Number(el.amount) / elRate;
					}, 0)
				}, 0);
				let totalInCurrency = parseFloat((totalInEuro * receiveRate(currency)).toFixed(2));
				if (isNaN(totalInCurrency)) {
					createParagraph('error-message', 'Currency which you enter does not exist. Please try again', wrapper);
				} else {
					createParagraph('total-year-message', `Total for ${year} in ${currency} currency is ${totalInCurrency}`, wrapper);
				}
			} else {
				if(validDate(year)) {
					createParagraph('error-message', 'There is no any purchaise in this year', wrapper);
				} else {
					createParagraph('error-message', 'Year which you enter is not correct. Please try again', wrapper);
				}
			}
		} else {
			createParagraph('empty-message', 'Please enter string in format "YYYY USD"', wrapper);
		}
	} else {
		showAll();
	}
}

export {receiveRate, reportTotalYear};