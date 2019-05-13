import './scss/index.scss';
import {createPurchase} from './modules/createPurchase';
import {showAll} from './modules/showPurchase';
import {clear, clearAllPurchase} from './modules/clearPurchase';
import {reportTotalYear} from './modules/reportPurchase';

const addPurch = document.getElementById('add-btn');
const showPurch = document.getElementById('show-btn');
const clearPurch = document.getElementById('clear-btn');
const clearAllPurch = document.getElementById('clear-all-btn');
const reportPurch = document.getElementById('report-btn');

addPurch.addEventListener('click', createPurchase);
clearPurch.addEventListener('click', clear);
reportPurch.addEventListener('click', reportTotalYear);
showPurch.addEventListener('click', showAll);
clearAllPurch.addEventListener('click', clearAllPurchase);