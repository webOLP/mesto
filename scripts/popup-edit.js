const openEditProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup-edit');
const closeEditProfilPopupButton = editProfilePopup.querySelector('.popup-edit__close-button');
const saveEditProfileButton = editProfilePopup.querySelector('.form__save-button');
let nameEditProfilePopup = editProfilePopup.querySelectorAll('.form__input')[0];
let jobEditProfilePopup = editProfilePopup.querySelectorAll('.form__input')[1];
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');



function addEditPopup() {
    editProfilePopup.classList.add('popup-edit_is-opened');
    nameEditProfilePopup.value = nameProfile.textContent
    jobEditProfilePopup.value = jobProfile.textContent;
}

function removeEditPopup() {
    editProfilePopup.classList.remove('popup-edit_is-opened');
    
}

function popupOverlayClick(evt) {
    if(evt.target === evt.currentTarget){
        editProfilePopup.classList.remove('popup-edit_is-opened'); 
    }
}

function savePopup(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameEditProfilePopup.value;
    jobProfile.textContent = jobEditProfilePopup.value;
    removeEditPopup();
}






openEditProfileButton.addEventListener('click', addEditPopup);
closeEditProfilPopupButton.addEventListener('click', removeEditPopup);
editProfilePopup.addEventListener('click',popupOverlayClick)
editProfilePopup.addEventListener('submit', savePopup)