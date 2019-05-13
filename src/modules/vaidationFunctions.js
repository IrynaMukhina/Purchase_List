
import {currencyArr} from './currencyList'

function validDate(data) {
	return new Date(data).toLocaleString() === 'Invalid Date' ? false : true;
}

function validCurrency(data) {
	return currencyArr.indexOf(data) >= 0;
}

function validAmount(data) {
	return Number(data);
}

export {validDate, validCurrency, validAmount};