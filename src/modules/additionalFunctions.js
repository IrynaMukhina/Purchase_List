function clearContainer(el) {
	if(el.hasChildNodes()) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	}
}

function sortArray(el) {
	const sortCondition = (a, b) => {
		return new Date(a.date) - new Date(b.date);
	};
	el.sort(sortCondition);
}

function createParagraph(classN, textP, el) {
	clearContainer(el);
	const text = document.createElement('p');
	text.className = classN;
	text.innerHTML = textP;
	el.appendChild(text);
}

function makeDisableBtn(el) {
	for(let key in el) {
		el[key].disabled = true;
	}
}

function makeAbleBtn(el) {
	for(let key in el) {
		el[key].disabled = false;
	}
}

export {clearContainer, sortArray, createParagraph, makeDisableBtn, makeAbleBtn};