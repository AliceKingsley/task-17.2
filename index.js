let stopWords = ['viagra', 'XXX', 'drugs'];
const normalizeStopWords = stopWords.join().toLowerCase().split(',');

const inputLogin = document.querySelector('.login');
const inputPhoto = document.querySelector('.photo');
const textArea = document.querySelector('.comment');
const buttonSend = document.querySelector('.button-send');
const buttonClear = document.querySelector('.button-clear');
const divComments = document.querySelector('.comments');
const divError = document.querySelector('.error');

const form = document.querySelector('.add-form');

form.addEventListener("submit", (e) => { e.preventDefault(); })

inputLogin.addEventListener("change", addLogin);
inputPhoto.addEventListener("change", addPhoto);
buttonSend.addEventListener("click", addComment);
buttonClear.addEventListener("click", clear);

document.addEventListener("DOMContentLoaded", function() {
    inputLogin.value = localStorage.getItem("login");
    inputPhoto.value = localStorage.getItem("photo");

    let dataLogin = JSON.parse(localStorage.getItem('logins'));
    let dataPhoto = JSON.parse(localStorage.getItem('photos'));
    let dataComment = JSON.parse(localStorage.getItem('comments'));

    for (let i = 0; i < dataLogin.logins.length; i++) {    
        drawList(dataLogin.logins[i], dataPhoto.photos[i], dataComment.comments[i]);
    }
});

function drawList(login, photo, comment) {
        let item = document.createElement('div');
        item.classList.add('item');

        let newComment = document.createElement('div');
        newComment.textContent = comment;

        let newLogin = document.createElement('label');
        newLogin.textContent = login;

        let newPhoto = document.createElement('img');
        newPhoto.src = photo;

        divComments.append(item);

        let divUser =document.createElement('div');
        divUser.classList.add('user');
        item.append(divUser);
        newPhoto.classList.add('user-photo');
        divUser.append(newPhoto);
        divUser.append(newLogin);
        newComment.classList.add('newComment');
        item.append(newComment);
}

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
        item.classList.add('item');

        let newComment = document.createElement('div');
        newComment.textContent = checkSpam(text);

        let login = document.createElement('label');
        login.textContent = localStorage.getItem("login");

        let photo = document.createElement('img');
        photo.src = localStorage.getItem("photo");

        divComments.append(item);

        let divUser =document.createElement('div');
        divUser.classList.add('user');
        item.append(divUser);
        photo.classList.add('user-photo');
        divUser.append(photo);
        divUser.append(login);
        newComment.classList.add('newComment');
        item.append(newComment);
        text = '';
    } else {
        divError.textContent = `Пустые комментарии добавлять нельзя!`;
    }
    saveLocalStorage();
    clear();
}

function clear() {
    textArea.value = '';
}

function addLogin() {
    localStorage.setItem("login", inputLogin.value);
}

function addPhoto() {
    localStorage.setItem('photo', inputPhoto.value);
}

function saveLocalStorage() {
    let commentsArr = [];
    let loginsArr = [];
    let photosArr = [];

    for (let i = 0; i < divComments.children.length; i++) {
        loginsArr.push(divComments.children[i].children[0].querySelector('label').textContent);
        photosArr.push(divComments.children[i].children[0].querySelector('.user-photo').src);
        commentsArr.push(divComments.children[i].querySelector('.newComment').textContent);
    }

    localStorage.removeItem('logins');
    localStorage.setItem('logins', JSON.stringify({logins: loginsArr}));

    localStorage.removeItem('photos');
    localStorage.setItem('photos', JSON.stringify({photos: photosArr}));

    localStorage.removeItem('comments');
    localStorage.setItem('comments', JSON.stringify({comments: commentsArr}));
}