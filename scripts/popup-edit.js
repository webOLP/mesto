const openEditProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('#popup-edit');
const closePopupButton = editProfilePopup.querySelector('.popup__close-button');
let nameEditProfilePopup = editProfilePopup.querySelectorAll('.form__input')[0];
let jobEditProfilePopup = editProfilePopup.querySelectorAll('.form__input')[1];
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');



function openPopup() {
    editProfilePopup.classList.add('popup_is-opened');
    nameEditProfilePopup.value = nameProfile.textContent
    jobEditProfilePopup.value = jobProfile.textContent;
}

function closePopup() {
    editProfilePopup.classList.remove('popup_is-opened');
}

function popupOverlayClick(evt) {
    if(evt.target === evt.currentTarget){
        editProfilePopup.classList.remove('popup_is-opened'); 
    }
}

function savePopup(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameEditProfilePopup.value;
    jobProfile.textContent = jobEditProfilePopup.value;
    closePopup();
}






openEditProfileButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
editProfilePopup.addEventListener('click',popupOverlayClick)
editProfilePopup.addEventListener('submit', savePopup)