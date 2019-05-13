const localStorageKeyPurch = 'myPurchaseList';
const jsonPurch = localStorage.getItem(localStorageKeyPurch);


function setLocalStorageObjectItem(array, localStorageKey) {
	localStorage.setItem(localStorageKey, JSON.stringify(array));
}

export {localStorageKeyPurch, jsonPurch, setLocalStorageObjectItem};