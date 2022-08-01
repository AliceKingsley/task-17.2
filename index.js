let stopWords = ['viagra', 'XXX', 'drugs'];
const normalizeStopWords = stopWords.join().toLowerCase().split(',');

const textArea = document.querySelector('.comment');
const buttonSend = document.querySelector('.button-send');
const buttonClear = document.querySelector('.button-clear');
const divComments = document.querySelector('.comments');
const divError = document.querySelector('.error');

buttonSend.addEventListener("click", addComment);
buttonClear.addEventListener("click", clear);

function checkSpam(str) {
    let normalizeStr = str.trim().toLowerCase();
    let newStr;

    for (const word of normalizeStopWords) {
        newStr = normalizeStr.replaceAll(word, '***');
        normalizeStr = newStr;
    }

    return newStr;
}

function addComment() {
    divError.textContent = '';
    let text = textArea.value;

    if (text.trim()) {
        let item = document.createElement('div');
        item.innerText = checkSpam(text);

        divComments.appendChild(item);
        item.classList.add('item');
        text = '';
    } else {
        divError.textContent = `Пустые комментарии добавлять нельзя!`;
    }

    clear();
}

function clear() {
    textArea.value = '';
}